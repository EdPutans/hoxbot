import { Interaction } from "discord.js";
import { supportChannelIds } from "./consts";

export const getIsSupportThread = (channelId: string) => {
  return supportChannelIds.includes(channelId);
}

export const createEphemeral = (interaction: Interaction, content: string) => {
  if (!interaction.isCommand()) return;
  interaction.reply({
    content,
    ephemeral: true
  })
}