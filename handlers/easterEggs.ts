import { Message } from "discord.js"

export const handleEasterEgg = async (message: Message) => {
  if (message.content.toLowerCase().includes('yeet')) {
    return await message.reply('Bruh')
  }
  return;
}

export const handleNoice = async (message: Message) => {
  if (message.content.toLowerCase().includes(' 69')) {
    return await message.react('990896048929136710')
  }
  return;
}