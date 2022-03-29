import { Client } from "discord.js";

const client = new Client({
  intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS']
});

export default client;