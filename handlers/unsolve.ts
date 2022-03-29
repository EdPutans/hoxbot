import { Interaction } from "discord.js";
import { createEphemeral, getIsSupportThread } from "../utils/helpers";

export const handleUnsolve = async (interaction: Interaction) => {
  if (!interaction.channel?.isThread()) return;
  if (!interaction.channel.parentId) return;

  if (!getIsSupportThread(interaction.channel.parentId)) return;
  if (!interaction.channel.archived) return createEphemeral(interaction, 'Yo, the channel is already "solved"!')
  if (!interaction.channel.name.startsWith('💚')) return createEphemeral(interaction, `Umm.. the channel isn't solved? :what:`)

  await interaction.channel.setName('💚' + interaction.channel.name)
  await interaction.channel.setArchived(false, 'Unsolve command by ' + interaction.user.username)
}