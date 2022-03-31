import { Client, Intents, Channel } from "discord.js";

const allIntents = new Intents(8);
export const client = new Client({ intents: [allIntents, 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS'] });


export default client;