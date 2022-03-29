import { Interaction } from "discord.js";
import { solvedThreadPrefix } from "../utils/consts";
import { createEphemeral, getIsSupportThread } from "../utils/helpers";

export const handleUnsolve = async (interaction: Interaction) => {
  if (!interaction.channel?.isThread()) return createEphemeral(interaction, `You're not inside a support thread!`)
  if (!interaction.channel.parentId) return createEphemeral(interaction, `Something went wrong - no parent_id`)

  if (!getIsSupportThread(interaction.channel.parentId)) return createEphemeral(interaction, `You're not inside a support thread!`)
  if (!interaction.channel.name.startsWith(solvedThreadPrefix)) return createEphemeral(interaction, `Umm.. the channel isn't solved? :what:`)

  const newName = interaction.channel.name.slice(solvedThreadPrefix.length)
  await interaction.channel.setName(newName);
  return;
}