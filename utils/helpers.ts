import { Interaction } from "discord.js";
import { supportChannelIds, classRoomIds, staffConfig } from "./consts";
import { UserID } from "./types";

export const getIsSupportThread = (channelId: string) => {
  const isSupportThread = supportChannelIds.includes(channelId);
  return isSupportThread;
};
export const getIsClassroomThread = (channelId: string) => {
  return classRoomIds.includes(channelId);
};

export const createEphemeral = async (
  interaction: Interaction,
  content: string
) => {
  if (!interaction.isCommand()) return;
  await interaction.reply({
    content,
    ephemeral: true,
  });
  return;
};

// TODO: transform it to use interaction / message -> user -> roles instead
export const getIsTeacher = (userId: string) => {
  return !!staffConfig[userId as UserID];
};

export const getIsStudent = (roleIds: string[]) => {
  const studentRoleIds = [
    "955781997857480764", // ed's server - Plebian role
    "866609200015867914", // Hoxton - student role
  ];

  return !!roleIds.find((roleId) => studentRoleIds.includes(`${roleId}`));
};
