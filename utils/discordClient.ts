import { Client, Channel } from "discord.js";

export const client = new Client({
  intents: [
    // 'DIRECT_MESSAGES',
    // 'DIRECT_MESSAGE_REACTIONS',
    'GUILD_MESSAGES', // posting messages / interactions
    'GUILD_MESSAGE_REACTIONS',// working with threads
    'GUILDS', // working with threads
    'GUILD_MEMBERS', // get offline + online users
    'GUILD_PRESENCES', // get offline + online users
    'GUILD_INTEGRATIONS',
  ]
});

export default client;
