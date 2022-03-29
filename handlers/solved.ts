import { Interaction } from "discord.js";
import { solvedThreadPrefix } from "../utils/consts";
import { getIsSupportThread, createEphemeral } from "../utils/helpers";

export const handleSolved = async (interaction: Interaction) => {
  if (!interaction.channel?.isThread()) return;
  if (!interaction.channel.parentId) return;

  if (!getIsSupportThread(interaction.channel.parentId)) return;
  if (interaction.channel.name.startsWith(solvedThreadPrefix)) return createEphemeral(interaction, 'Yo, the channel is already "solved"!')

  await interaction.channel.setName(solvedThreadPrefix + interaction.channel.name)
}