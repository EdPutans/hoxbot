import { Channel } from "diagnostics_channel";
import {
  ActionRowBuilder,
  SelectMenuBuilder,
  Interaction,
  Message,
  GuildMember,
  Snowflake,
  ChatInputCommandInteraction,
} from "discord.js";
import { starChannelId } from "../utils/consts";
import client from "../utils/discordClient";
import {
  createEphemeral,
  getIsClassroomThread,
  getIsStudent,
} from "../utils/helpers";
import { handleSolved } from "./solved";

function createUserStarMessage(userId: Snowflake, nbStars: number) {
  return `<@${userId}> ${nbStars} ${starSymbol}`;
}

const starSymbol = "🌟";
const customSelectId = "SELECT_USER_WHO_HELPED";

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

  const owner = await interaction.channel.fetchOwner();

  console.log({ owner });

  // ...but keep only the ones that are:
  const students = interaction.channel?.parent.members.filter((user) => {
    const roleIds = user.roles.cache.map((role) => role.id);
    // participants in the thread
    if (!participatedPeople.includes(user.id)) return false;

    // are a student
    if (!getIsStudent(roleIds)) return false;

    // TODO: are NOT the original author

    return true;
  });

  // NOTE: yes, this logic is required since User !== Member

  if (students.size < 2) return;

  const values = students
    .map((std) => ({ label: std.user.username, value: std.user.id }))
    .sort((a, b) => (a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1));

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

async function handleSelectHelpedOutStudents(
  response: Interaction,
  parentInteraction: ChatInputCommandInteraction
) {
  if (!response.isSelectMenu()) return;

  parentInteraction.editReply({
    content: "Thanks for the response!",
    components: [],
    embeds: [],
  });

  // need Channel type so must fetch, no cache.
  const starChan = await client.channels.fetch(starChannelId);
  // const starChan = await client.channels.fetch("1016324894658658357");

  if (!starChan) return;
  if (!starChan.isTextBased()) return;
  if (starChan.isDMBased()) return;

  // need full Message type so must fetch, no cache.
  const allStarChannelMessages: Map<any, Message> =
    await starChan.messages.fetch();

  const messages = Array.from(allStarChannelMessages.values());

  // for each of the selected people:
  response.values.forEach((userId) => {
    // find the bot message in star channel
    const targetBotMessage = messages.find((message) =>
      message.content.includes(userId)
    );

    // if user was never there add them with 1 new star
    if (!targetBotMessage) {
      const addedUserMessage = createUserStarMessage(userId, 1);

      starChan.send(addedUserMessage);
    } else {
      // if they're present: find the message and increase the stars
      const [_, nbStars] = targetBotMessage.content.split(" ");

      targetBotMessage.edit({
        content: createUserStarMessage(userId, Number(nbStars) + 1),
      });
    }
  });

  await response.reply({
    content: `Your selection was received successfully with interaction ID: ${response.id}`,
    ephemeral: true,
  });
  return;
}
