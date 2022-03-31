import { Interaction, Message, Client, Intents, Channel } from "discord.js";
import { handleAutoSupportThread } from "./handlers/autoSupportThread";
import { handleEasterEgg } from "./handlers/easterEggs";
import { handleEvent } from "./handlers/event";
import { handleClearVoiceChat } from "./handlers/handleClearVoiceChat";
import { handleSolved } from "./handlers/solved";
import { handleUnsolve } from "./handlers/unsolve";
import { handleZoom } from "./handlers/zoom";
import client from "./utils/discordClient";
import { envVariables } from "./utils/getEnvVariables";
import { createEphemeral } from "./utils/helpers";
import { HOXCommand } from "./utils/types";


client.once('ready', () => {
  console.log('Ready to go go go!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return createEphemeral(interaction, 'its not a command what')
  if (!interaction.commandName) return createEphemeral(interaction, 'Something wrong with this command')

  switch (interaction.commandName as HOXCommand) {
    case 'zoom':
      return await handleZoom(interaction);
    case 'solved':
      return await handleSolved(interaction);
    case 'unsolve':
      return await handleUnsolve(interaction);
    case 'event':
      return await handleEvent(interaction)
    case 'dangerous__clear_voice_channel':
      return await handleClearVoiceChat(interaction);
    default:
      return;
  }
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.id === envVariables.clientId) return; // dont reply to bot messages
  if (message.system) return;

  await handleAutoSupportThread(message);
  await handleEasterEgg(message)
});

client.login(envVariables.token);

process.on("exit", () => {
  console.log("CYA LOSERS!")
})