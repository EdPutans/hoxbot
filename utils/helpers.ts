import { Interaction } from "discord.js";
import { supportChannelIds, zoomLinks } from "./consts";

export const getIsSupportThread = (channelId: string) => {
  return supportChannelIds.includes(channelId);
}

export const createEphemeral = (interaction: Interaction, content: string) => {
  if (!interaction.isCommand()) return;
  return interaction.reply({
    content,
    ephemeral: true
  })
}

export const getIsTeacher = (userId: string | number) => {
  const userIdString = `${userId}`
  return Object.keys(zoomLinks).includes(userIdString)
}