import { Interaction } from "discord.js";

export const handleClearVoiceChat = async (interaction: Interaction): Promise<void> => {
  if (interaction.isCommand()) await interaction.reply("Not implemented yet ")

  return;
}