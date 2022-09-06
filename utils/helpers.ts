import { Interaction, Snowflake } from "discord.js";
import {
  supportChannelIds,
  classRoomIds,
  zoomLinks,
  studentRoleIds,
} from "./consts";

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
export const getIsTeacher = (userId: Snowflake) => {
  const userIdString = userId;
  return Object.keys(zoomLinks).includes(userIdString);
};

export const getIsStudent = (roleIds: string[]) =>
  !!roleIds.find((roleId) => studentRoleIds.includes(roleId));

export function getUserIdsFromString(string: string): RegExpMatchArray | null {
  return string.match(/<?@?!?(\d{17,19})>?/);
}
