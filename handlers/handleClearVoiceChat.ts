import { Interaction } from "discord.js";

export const handleClearVoiceChat = async (interaction: Interaction) => {
  if (interaction.isCommand()) return await interaction.reply("Not implemented yet ")

  return;
}