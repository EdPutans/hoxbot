import { Interaction } from "discord.js";
import { solvedClassroomThreadPrefix, solvedSupportThreadPrefix } from "../utils/consts";
import { createEphemeral, getIsClassroomThread, getIsSupportThread } from "../utils/helpers";

export const handleUnsolve = async (interaction: Interaction) => {
  if (!interaction.channel?.isThread()) return await createEphemeral(interaction, `You're not inside a #support or #classroom thread!`)
  if (!interaction.channel.parentId) return await createEphemeral(interaction, `Something went wrong - no parent_id`)

  const isClassroomChannel = getIsClassroomThread(interaction.channel.parentId);
  const isSupportChannel = getIsSupportThread(interaction.channel.parentId);

  const solvedPrefix = isClassroomChannel ? solvedClassroomThreadPrefix : solvedSupportThreadPrefix;

  if (!isClassroomChannel && !isSupportChannel) return createEphemeral(interaction, `You're not inside a #support or #classroom thread!`)
  if (!interaction.channel.name.startsWith(solvedPrefix)) return createEphemeral(interaction, `Umm.. the channel isn't solved? :what:`)

  const newName = interaction.channel.name.slice(solvedPrefix.length)
  await interaction.channel.setName(newName);
  return;
}