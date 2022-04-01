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

// TODO: transform it to use interaction / message -> user -> roles instead
export const getIsTeacher = (userId: string | number) => {
  const userIdString = `${userId}`
  return Object.keys(zoomLinks).includes(userIdString)
}

export const getIsStudent = (roleIds: string[]) => {
  const studentRoleIds = [
    '955781997857480764', // ed's server - Plebian role
    '955781997857480764' // Hoxton - student role
  ];

  return !!roleIds.find(roleId => studentRoleIds.includes(`${roleId}`))
}
