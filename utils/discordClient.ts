import { Client, Partials } from "discord.js";

export const client = new Client({
  intents: [
    "MessageContent",
    "GuildMessageTyping",
    "Guilds", // working with threads
    "GuildMembers", // get offline + online users
    "GuildPresences", // get offline + online users
    "GuildMessages", // posting messages / interactions
    "GuildMessageReactions", // working with threads
  ],
  partials: [Partials.Channel, Partials.Message, Partials.ThreadMember],
});

export default client;
