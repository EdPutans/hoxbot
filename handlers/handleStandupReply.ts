import { Message } from "discord.js";
import { classRoomIds } from "../utils/consts";
import client from "../utils/discordClient";
import { getActiveStandupThread, removeActiveStandupThread } from "../utils/fs-write";
import { envVariables } from "../utils/getEnvVariables";
import { getRespondedUserName, getUnrespondedUserName } from "./handleStandupCreate";

const getBotFirstMessage = async (message: Message): Promise<Message | undefined> => {
  const channel = await client.channels.cache.get(message.channelId);
  if (!channel?.isText()) return;

  const channelMessages = await channel.messages.fetch({ limit: 100 })

  const botMessages = channelMessages
    .filter(msg => {
      const isBot = msg.author.id === envVariables.clientId;
      const hasContent = !!msg.content;
      return isBot && hasContent;
    })
  // for some reason last = first?
  return botMessages.last();
};

export const handleStandupReply = async (message: Message) => {
  if (!message.channel) return;
  if (!getActiveStandupThread(message.channel.id)) return;
  if (!message.channel.isThread()) return;
  if (!message.channel.parentId) return;
  if (!classRoomIds.includes(message.channel.parentId)) return;

  const replies = message.channel.messages.cache.map(({ id, content, author }) => ({ id, content, userId: author.id }))
  const lastMessage = replies[replies.length - 1];

  const botMessage = await getBotFirstMessage(message);
  if (!botMessage?.content) return;

  const doesStudentNeedToReply = botMessage.toString().includes(getUnrespondedUserName(lastMessage.userId))
  if (!doesStudentNeedToReply) return;

  await botMessage?.edit({
    content:
      botMessage.content.replace(
        getUnrespondedUserName(lastMessage.userId),
        getRespondedUserName(lastMessage.userId)
      )
  })

  if (!botMessage?.content.includes('⏰')) {


    await message.channel.send(`Nice work! Everybody replied!`)
    removeActiveStandupThread(message.channel.id);
  }

}
