import { Message } from "discord.js"

export const handleEasterEgg = (message: Message) => {
  if (message.content.toLowerCase().includes('yeet')) {
    message.reply('Bruh')
  }
}