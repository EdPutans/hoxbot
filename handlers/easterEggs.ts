import { Message } from "discord.js"

export const handleEasterEgg = async (message: Message) => {
  if (message.content.toLowerCase().includes('yeet')) {
    return await message.reply('Bruh')
  }
  return;
}