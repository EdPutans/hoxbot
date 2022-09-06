import { Message } from "discord.js";
import client from "../../utils/discordClient";
import { envVariables } from "../../utils/getEnvVariables";
import {
  botStarterMessage,
  getRespondedUserName,
  getUnrespondedUserName,
} from "./handleStandupCreate";

function getIsStandupThread(botMessage: Message) {
  return botMessage?.content.includes(botStarterMessage);
}

function getIsClosedStandupThread(botMessage: Message) {
  if (!getIsStandupThread(botMessage)) return;
  return !botMessage?.content.includes("⏰");
}

export const getBotFirstMessageByMessageInChannel = async (
  message: Message
): Promise<Message | undefined> => {
  const channel = await client.channels.cache.get(message.channelId);
  if (!channel?.isTextBased()) return;

  const channelMessages: Map<any, Message> = await channel.messages.fetch({
    limit: 100,
  });

  const botMessages = Array.from(channelMessages.values()).filter((msg) => {
    const isBot = msg.author.id === envVariables.clientId;
    const hasContent = !!msg.content;
    return isBot && hasContent;
  });
  // for some reason last = first?
  return botMessages.at(-1);
};

export const handleStandupReply = async (message: Message) => {
  if (!message.channel) return;
  if (!message.channel.isThread()) return;
  if (!message.channel.parentId) return;

  // prevents Collection type errors
  const replies = message.channel.messages.cache.map(
    ({ id, content, author }) => ({ id, content, userId: author.id })
  );
  const lastMessage = replies[replies.length - 1];

  const botMessage = await getBotFirstMessageByMessageInChannel(message);
  if (!botMessage?.content) return;

  if (getIsClosedStandupThread(botMessage)) return;

  const doesStudentNeedToReply = botMessage
    .toString()
    .includes(getUnrespondedUserName(lastMessage.userId));
  if (!doesStudentNeedToReply) return;

  // ⏰ => ✅
  const updatedBotMessage = await botMessage?.edit({
    content: botMessage.content.replace(
      getUnrespondedUserName(lastMessage.userId),
      getRespondedUserName(lastMessage.userId)
    ),
  });

  // if all done -> "close"
  if (getIsClosedStandupThread(updatedBotMessage)) {
    await message.channel.send(`Nice work! Everybody replied!`);
  }
};
