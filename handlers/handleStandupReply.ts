import { Message } from "discord.js";
import { off } from "process";
import { classRoomIds } from "../utils/consts";
import client from "../utils/discordClient";
import { getDoesStudentNeedToReply, getActiveStandupThread, removeStudentFromActiveStandup } from "../utils/fs-write";
import { envVariables } from "../utils/getEnvVariables";
import { splitMentions } from "./handleStandupCreate";

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
  console.log('1')
  if (!message.channel) return;
  if (!message.channel.isThread()) return;
  if (!message.channel.parentId) return;
  console.log('2')
  if (!classRoomIds.includes(message.channel.parentId)) return;
  console.log('3')
  const replies = message.channel.messages.cache.map(({ id, content, author }) => ({ id, content, userId: author.id }))
  const lastMessage = replies[replies.length - 1];

  const doesStudentNeedToReply = getDoesStudentNeedToReply(message.channel.id, lastMessage.userId)

  // TODO: BRING THESE BACK
  if (!doesStudentNeedToReply) return;
  console.log({ doesStudentNeedToReply })
  removeStudentFromActiveStandup(message.channel.id, lastMessage.userId);
  console.log('4')
  // const studentsToReply = getActiveStandupThread(message.channel.id)
  // if (!studentsToReply.includes(lastMessage.userId)) return;

  // await message.reply('students that remain to reply:' +

  const botMessage = await getBotFirstMessage(message);
  if (!botMessage?.content) return;
  //  return message.channel.send({ content: 'Something went wrong, 7' });
  console.log('5')
  console.log(botMessage.content, botMessage.content.includes(`<@${lastMessage.userId}>⏰`))
  await botMessage?.edit({
    content:
      botMessage.content.replace(
        `<@${lastMessage.userId}>⏰`,
        `<@${lastMessage.userId}>✅ \n`
      )
  })

  if (!botMessage?.content.includes('⏰')) await message.channel.send("All good now!")

  // check message - parentId is classroom ✅
  // check the thread is a standup thread ✅
  // check there is a bot message with @people. ✅
  //   - if the message is there, but all resolved - return;
  // check the person creating the message is tagged there ✅
  // if they are - replace alarm clock with checkbox: ✅

  //   - find the index of the person in the original message
  //   - remove the @
  //   - replace the ⏰ with ✅
  //   - if last one - archyve and add "All good to original message"
}
