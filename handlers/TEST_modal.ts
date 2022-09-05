import { ActionRowBuilder, SelectMenuBuilder, Interaction } from "discord.js";
import client from "../utils/discordClient";
import { getIsStudent } from "../utils/helpers";

const customSelectId = "SELECT_USER_WHO_HELPED";

export async function testModal(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;
  if (!interaction.channel?.isThread()) return;
  if (!interaction.channel.parent) return;

  const studentsCollection = interaction.channel?.parent.members;

  const students = studentsCollection.filter((user) => {
    const roleIds = user.roles.cache.map((role) => role.id);
    return getIsStudent(roleIds);
  });

  const values = students
    .map((std) => ({
      label: std.user.username,
      value: `${std.user.id} ${std.user.username}`,
    }))
    .sort((a, b) => (a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1));

  const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
    new SelectMenuBuilder()
      .setCustomId(customSelectId)
      .setPlaceholder("Noone Selected")
      .addOptions([...values])
      .setMinValues(0)
      .setMaxValues(values.length)
  );

  await interaction.reply({
    content: "Select the person who helped you to up their score!",
    embeds: [],
    ephemeral: true,
    components: [row],
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isSelectMenu()) return;
    if (interaction.customId !== customSelectId) return;
    if (!interaction.channel?.isThread()) return;

    // console.log(interaction.message.content = '-');
    interaction.message.content = "-";
    const starChan = await client.channels.fetch("1016324894658658357");

    if (!starChan) return;
    if (!starChan?.isTextBased()) return;

    const mainMsg = (await starChan.messages.fetch()).last();
    await mainMsg?.edit({
      content:
        mainMsg.content +
        `
      ${interaction.id} ${interaction.channel.name}:
      ${interaction.values.join(", ")}`,
    });

    await interaction.reply({
      content: `Your selection was received successfully with interaction ID: ${interaction.id}`,
      ephemeral: true,
    });
  });
  return;
}
