import { Message } from "discord.js";
import { getIsSupportThread } from "../utils/helpers";

export const handleAutoSupportThread = (message: Message) => {
  if (!message.channel) return;
  if (!getIsSupportThread(message.channel.id)) return;

  message.startThread({
    name: message.content,
  })
}

