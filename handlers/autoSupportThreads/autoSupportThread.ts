import { Message, Snowflake } from "discord.js";
import client from "../../utils/discordClient";
import {
  getIsSupportThread,
  getIsTeacher,
  getUserIdsFromString,
} from "../../utils/helpers";

const createStarterMessage = (userId: Snowflake) => `
Hey <@${userId}>! Thanks for the question! Please make sure you:
- added as much RELEVANT information as you can;
- mentioned the things you tried and what was the result
- post screenshots, if applicable.

Cheers! 🎩`;

export const getSupportQuestionAuthorId = (botStarterMessage: string) => {
  const match = getUserIdsFromString(botStarterMessage);

  if (!match?.length) return null;

  return match[1];
};

export const handleAutoSupportThread = async (message: Message) => {
  if (!message.channel) return;
  if (!getIsSupportThread(message.channel.id)) return;

  // don't autothread the staff
  // FIXME:
  // if (getIsTeacher(message.author.id)) return;

  // the bot crashes if the message is longer than ~~100~~ 80 chars - so we slice it.
  // UPD: 80, not 100 - handleSolve and handleUnsolve take up some characters and can break this.
  const threadStart =
    message.content.length > 80
      ? `${message.content.slice(0, 80)}...`
      : message.content.slice(0, 80);

  const thread = await message.startThread({
    name: threadStart,
  });

  const channel = await client.channels.cache.get(thread.id);

  if (!channel) return;
  if (!("send" in channel)) return;

  channel.send(createStarterMessage(message.author.id));
};
