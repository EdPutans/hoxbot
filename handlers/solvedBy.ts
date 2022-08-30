import { ActionRow, SelectMenuComponent, SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Interaction, MessageActionRow, MessageSelectMenu, SelectMenuInteraction } from "discord.js";
import { solvedClassroomThreadPrefix, solvedSupportThreadPrefix } from "../utils/consts";
import { getIsSupportThread, createEphemeral, getIsClassroomThread } from "../utils/helpers";

export const handleSolvedBy = async (interaction: CommandInteraction) => {
  if (!interaction.channel?.isThread()) return await createEphemeral(interaction, `You're not inside a thread!`)
  if (!interaction.channel.parentId) return await createEphemeral(interaction, `No parent ID? what?`)

  // const isClassroomChannel = getIsClassroomThread(interaction.channel.parentId);
  // const isSupportChannel = getIsSupportThread(interaction.channel.parentId);

  // const solvedPrefix = isClassroomChannel ? solvedClassroomThreadPrefix : solvedSupportThreadPrefix;

  // if (interaction.channel.name.startsWith(solvedPrefix)) return await createEphemeral(interaction, `Umm.. the channel is already solved?`)

  // if (!isSupportChannel && !isClassroomChannel) return await createEphemeral(interaction, `You're not inside a #support or #classroom thread!`)
  // if (interaction.channel.name.startsWith(solvedPrefix)) return await createEphemeral(interaction, 'Yo, the channel is already "solved"!')

  const row = new MessageActionRow()
    .addComponents(

      new MessageSelectMenu()
        .setCustomId('select')
        .setPlaceholder('Nothing selected')
        .addOptions(
          {
            label: 'Select me',
            description: 'This is a description',
            value: 'first_option',
          },
          {
            label: 'You can select me too',
            description: 'This is also a description',
            value: 'second_option',
          },
        ),
    );

  await interaction.reply({ content: 'Pong!', components: [row] });
}