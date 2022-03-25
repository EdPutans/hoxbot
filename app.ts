import { Interaction, Message, Client, Intents, Channel } from "discord.js";
import { handleAutoSupportThread } from "./handlers/autoSupportThread";
import { handleSolved } from "./handlers/solved";
import { handleUnsolve } from "./handlers/unsolve";

require('dotenv').config()

export const client = new Client({
  intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS']
});

client.once('ready', () => {
  console.log('Ready yo yo!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  await handleSolved(interaction)
  await handleUnsolve(interaction)
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.id === process.env.CLIENT_ID) return; // dont reply to bot messages
  if (message.system) return;
  handleAutoSupportThread(message);
});

client.login(process.env.BOT_TOKEN);