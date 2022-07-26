import { Message } from "discord.js";
import client from "../utils/discordClient";
import { getIsSupportThread, getIsTeacher } from "../utils/helpers";

const starterMessage = `
Hey! Thanks for the question! Please make sure you:
- added as much RELEVANT information as you can;
- mentioned the things you tried and what was the result
- post screenshots, if applicable.

Cheers! 🎩`

export const handleAutoSupportThread = async (message: Message) => {
  if (!message.channel) return;
  if (!getIsSupportThread(message.channel.id)) return;

  // don't autothread the staff
  if (getIsTeacher(message.author.id)) return;

  // the bot crashes if the message is longer than 100 chars - so we slice it
  const thread = await message.startThread({
    name: message.content.slice(0, 100),
  })

  const channel = await client.channels.cache.get(thread.id);

  if (!channel) return;
  if (!('send' in channel)) return;

  channel.send(starterMessage);
}


