import { Interaction, Message, Client, Intents, Channel } from "discord.js";
import { handleAutoSupportThread } from "./handlers/autoSupportThread";
import { handleEasterEgg } from "./handlers/easterEggs";
import { handleSolved } from "./handlers/solved";
import { handleUnsolve } from "./handlers/unsolve";
import { handleZoom } from "./handlers/zoom";
import { envVariables } from "./utils/getEnvVariables";
import { createEphemeral } from "./utils/helpers";

const allIntents = new Intents(8);
export const client = new Client({ intents: [allIntents, 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS'] });

client.once('ready', () => {
  console.log('Ready to go go go!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return createEphemeral(interaction, 'its not a command what')
  if (!interaction.commandName) return createEphemeral(interaction, 'Something wrong with this command')
  if (interaction.commandName === 'zoom') await handleZoom(interaction);
  else if (interaction.commandName === 'solved') await handleSolved(interaction);
  else if (interaction.commandName === 'unsolve') await handleUnsolve(interaction);

  return;
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.id === envVariables.clientId) return; // dont reply to bot messages
  if (message.system) return;

  await handleAutoSupportThread(message);
  await handleEasterEgg(message)
});

client.login(envVariables.token);