import {
  ActionRowBuilder,
  SelectMenuBuilder,
  Interaction,
  Message,
  GuildMember,
} from "discord.js";
import client from "../utils/discordClient";
import {
  createEphemeral,
  getIsClassroomThread,
  getIsStudent,
} from "../utils/helpers";
import { handleSolved } from "./solved";

const customSelectId = "SELECT_USER_WHO_HELPED";

export async function testModal(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;
  if (!interaction.channel?.isThread()) return;
  if (!interaction.channel.parent)
    return await createEphemeral(interaction, "Wrong place my dude");

  // rename channel to solved
  await handleSolved(interaction);

  // if its a classroom channel - DON'T propose to starify
  if (getIsClassroomThread(interaction.channel.parent.id)) return;

  // get a list of all students in the channel...
  const participatedPeople = interaction.channel.messages.cache.map(
    (msg) => msg.author.id
  );

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

  client.on("interactionCreate", async (response) => {
    if (!response.isSelectMenu()) return;

    interaction.editReply({
      content: "Thanks for the response!",
      components: [],
      embeds: [],
    });

    const starChan = await client.channels.fetch("1016324894658658357");

    if (!starChan) return;
    if (!starChan?.isTextBased()) return;

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
        starChan.send(`<@${userId}> 1 🌟`);
      } else {
        // if they're present: find the message and increase the stars
        const [user, nbStars, starSymbol] = targetBotMessage.content.split(" ");

        targetBotMessage.edit({
          content: `${user} ${Number(nbStars) + 1} ${starSymbol}`,
        });
      }
    });

    await response.reply({
      content: `Your selection was received successfully with interaction ID: ${response.id}`,
      ephemeral: true,
    });
  });
  return;
}
