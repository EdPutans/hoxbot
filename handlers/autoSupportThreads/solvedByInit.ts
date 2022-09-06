import {
  ActionRowBuilder,
  SelectMenuBuilder,
  Interaction,
  Message,
  Snowflake,
  ChatInputCommandInteraction,
  Collection,
  GuildMember,
} from "discord.js";
import { starChannelId, starSymbol } from "../../utils/consts";
import client from "../../utils/discordClient";
import {
  createEphemeral,
  getIsClassroomThread,
  getIsStudent,
} from "../../utils/helpers";
import { getSupportQuestionAuthorId } from "./autoSupportThread";
import { handleSolved } from "./solved";
import { handleSelectHelpedOutStudents } from "./solvedByRespond";

const customSelectId = "SELECT_USER_WHO_HELPED";

function userToSelectValue(std: GuildMember) {
  return { label: std.user.username, value: std.user.id };
}

function getThreadAuthorId(
  messages: Collection<string, Message<true>>
): Snowflake | null {
  const botMsgContent = messages.at(1)?.content;

  if (!botMsgContent) return null;
  return getSupportQuestionAuthorId(botMsgContent);
}

export async function handleSolvedBy(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;
  if (!interaction.channel?.isThread()) return;
  if (!interaction.channel.parent)
    return await createEphemeral(interaction, "Wrong place my dude");

  // run the original handleSolved to rename channel rename channel to solved
  await handleSolved(interaction);

  // if its a classroom channel - DON'T propose to starify
  if (getIsClassroomThread(interaction.channel.parent.id)) return;

  // get a list of all students in the channel...
  const participatedPeople = interaction.channel.messages.cache.map(
    (msg) => msg.author.id
  );

  const originalThreadAuthorId = getThreadAuthorId(
    interaction.channel.messages.cache
  );

  // ...but keep only the ones that are:
  const starableStudents = interaction.channel?.parent.members.filter(
    (user) => {
      // are NOT the original author
      if (originalThreadAuthorId !== user.id) return false;

      // participants in the thread
      if (!participatedPeople.includes(user.id)) return false;

      // are a student
      const roleIds = user.roles.cache.map((role) => role.id);
      if (!getIsStudent(roleIds)) return false;

      return true;
    }
  );

  if (!starableStudents.size) return;

  // NOTE: yes, this logic is required since User !== Member
  const values = starableStudents.map(userToSelectValue);

  const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
    new SelectMenuBuilder()
      .setCustomId(customSelectId)
      .setPlaceholder("Noone Selected")
      .addOptions(values)
      .setMinValues(0)
      .setMaxValues(values.length)
  );

  await interaction.reply({
    content: "Select the person who helped you to up their score!",
    ephemeral: true,
    components: [row],
  });

  // I hate to place it here, but makes it much easier to maintain as it requires some deps from the parent func
  client.on(
    "interactionCreate",
    async (response) =>
      await handleSelectHelpedOutStudents(response, interaction)
  );

  return;
}
