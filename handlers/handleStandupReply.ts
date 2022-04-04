import { Message } from "discord.js";
import { classRoomIds } from "../utils/consts";
import client from "../utils/discordClient";
import { envVariables } from "../utils/getEnvVariables";

export const handleStandupReply = async (message: Message) => {
  if (!message.channel) return;
  if (!message.channel.isThread()) return;
  if (!message.channel.parentId) return;


  if (!classRoomIds.includes(message.channel.parentId)) return;
  const msgs = message.channel.messages.cache
  console.log(msgs)
  // check message - parentId is classroom ✅
  // check the thread is a standup thread ✅
  // check there is a bot message with @people.
  //   - if the message is there, but all resolved - return;
  // check the person creating the message is tagged there
  // if they are - replace alarm clock with checkbox:
  //   - find the index of the person in the original message
  //   - remove the @
  //   - replace the ⏰ with ✅
  //   - if last one - archyve and add "All good to original message"
}
