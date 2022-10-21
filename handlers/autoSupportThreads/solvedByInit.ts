import {
  ActionRowBuilder,
  SelectMenuBuilder,
  Interaction,
  GuildMember,
  SelectMenuInteraction,
} from "discord.js";
import { nullValue } from "../../utils/consts";
import client from "../../utils/discordClient";
import {
  createEphemeral,
  getIsSolvedThread,
  getIsStudent,
  getIsSupportThread,
  getIsTeacher,
  getThreadAuthorId,
} from "../../utils/helpers";
import { Value } from "../../utils/types";

import { handleSolved } from "./solved";
import { handleSelectHelpedOutStudents } from "./solvedByRespond";

export const customSelectId = "SELECT_USER_WHO_HELPED";

function getIsNobodySelected(vals: SelectMenuInteraction["values"]): boolean {
  if (vals.length === 0) return true; // potentially impossible
  if (vals.length === 1 && vals[0] === nullValue.value) return true;

  return false;
}

function userToSelectValue(std: GuildMember): Value {
  return { label: std.user.username, value: std.user.id };
}

export async function handleSolvedBy(interaction: Interaction) {
  if (!interaction.isChatInputCommand())
    return await createEphemeral(interaction, "Not a chat input command");
  if (!interaction.channel?.isThread())
    return await createEphemeral(interaction, "Not in a thread? ");

  if (!interaction.channel.parent)
    return await createEphemeral(interaction, "Wrong place my dude");
  if (getIsSolvedThread(interaction.channel))
    return await createEphemeral(interaction, "Already solved");

  if (!getIsSupportThread(interaction.channel.parent.id))
    return await createEphemeral(interaction, "Not a support thread? ");

  const messages = await interaction.channel.messages.fetch();
  const originalThreadAuthorId = getThreadAuthorId(messages);

  // only allow triggering by author or staff
  if (!interaction.member?.user.id)
    return await createEphemeral(
      interaction,
      "Oy, are you sure you're the original post creator? "
    );

  const triggeredByUserId = interaction.member?.user.id;
  const isTriggeredByNonOriginalCreator =
    triggeredByUserId === originalThreadAuthorId;
  const isTriggeredByTeacher = getIsTeacher(triggeredByUserId);

  if (!isTriggeredByNonOriginalCreator && !isTriggeredByTeacher) {
    return await createEphemeral(
      interaction,
      "Only the author or staff member can trigger this command"
    );
  }

  // get a list of all students in the channel...
  const participatedPeople = interaction.channel.messages.cache.map(
    (msg) => msg.author.id
  );

  // ...but keep only the ones that are:
  const starableStudents = interaction.channel?.parent.members.filter(
    (user) => {
      // are a student
      const roleIds = user.roles.cache.map((role) => role.id);
      const isStudent = getIsStudent(roleIds);
      if (!isStudent) return false;

      // // participants in the thread
      if (!participatedPeople.includes(user.id)) return false;

      // are NOT the original author
      if (originalThreadAuthorId === user.id) return false;

      return true;
    }
  );

  if (!starableStudents.size) {
    // no need to go further. mark the thread solved if no students helped.
    await createEphemeral(
      interaction,
      "Looks like other students didn't participate 🤷🏻‍♀️. Marking solved anyway."
    );

    handleSolved(interaction);
    return;
  }

  // NOTE: yes, this logic is required since User !== Member
  const starableStudentsAsValues = [
    nullValue,
    ...starableStudents.map(userToSelectValue),
  ];

  const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
    new SelectMenuBuilder()
      .setCustomId(customSelectId)
      .setPlaceholder("Noone Selected")
      .addOptions(starableStudentsAsValues)
      .setMinValues(1)
      .setMaxValues(starableStudentsAsValues.length)
  );

  await interaction.reply({
    content: "Select the people who helped you!",
    ephemeral: true,
    components: [row],
  });

  await handleSolved(interaction);

  // I hate to place it here, but makes it much easier to maintain as it requires some deps from the parent func
  client.on("interactionCreate", async (response: Interaction) => {
    if (!response.isSelectMenu())
      return await createEphemeral(interaction, "Not a select command what?");

    const nobodyWasSelected = getIsNobodySelected(response.values);

    let content = nobodyWasSelected
      ? "Nobody gets a star. Thats fine by me"
      : `Thanks for the response! *Trying to* add stars to these "values": ${response.values
          .map((userId) => (userId === nullValue.value ? "" : `<@${userId}>`))
          .join(", ")}`;

    await interaction.editReply({
      content,
      components: [],
      embeds: [],
    });

    if (!nobodyWasSelected) await handleSelectHelpedOutStudents(response);

    return;
  });
  return;
}
