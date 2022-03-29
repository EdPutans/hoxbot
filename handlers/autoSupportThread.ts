import { Message } from "discord.js";
import client from "../utils/discordClient";
import { getIsSupportThread } from "../utils/helpers";

const starterMessage = `
Hey! Thanks for the question! Please make sure you:
- added as much RELEVANT information as you can;
- mentioned the things you tried and what was the result
- post screenshots, if applicable.

Cheers! 🎩`

export const handleAutoSupportThread = async (message: Message) => {
  if (!message.channel) return;
  if (!getIsSupportThread(message.channel.id)) return;

  const thread = await message.startThread({
    name: message.content,
  })
  const channel = await client.channels.cache.get(thread.id);
  if (!channel) return;
  if (!('send' in channel)) return;

  channel.send(starterMessage);
}


