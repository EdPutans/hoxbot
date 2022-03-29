import { Interaction } from "discord.js";
import { solvedThreadPrefix } from "../utils/consts";
import { getIsSupportThread, createEphemeral } from "../utils/helpers";

export const handleSolved = async (interaction: Interaction) => {
  if (!interaction.channel?.isThread()) return await createEphemeral(interaction, `You're not inside a thread!`)
  if (!interaction.channel.parentId) return await createEphemeral(interaction, `No parent ID? what?`)
  if (interaction.channel.name.startsWith(solvedThreadPrefix)) return await createEphemeral(interaction, `Umm.. the channel is already solved?`)

  if (!getIsSupportThread(interaction.channel.parentId)) return await createEphemeral(interaction, `You're not inside a support channels thread!`)
  if (interaction.channel.name.startsWith(solvedThreadPrefix)) return await createEphemeral(interaction, 'Yo, the channel is already "solved"!')

  await interaction.channel.setName(solvedThreadPrefix + interaction.channel.name)
  await createEphemeral(interaction, 'Marked as "solved"!')
  return;
}