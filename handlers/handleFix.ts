import { Interaction, Message } from "discord.js";
import client from "../utils/discordClient";
import { envVariables } from "../utils/getEnvVariables";
import { getRespondedUserName, getUnrespondedUserName } from "./handleStandupCreate";

// TODO: remove when no longer needed.
// TODO: also unregister command
export const TEMP_handleStandupFix = async (interaction: Interaction) => {

  if (!interaction.channel) return;

  const channel = await client.channels.cache.get(interaction.channel.id);
  if (!channel?.isText()) return;

  const channelMessages = await channel.messages.fetch({ limit: 100 })

  const firstBotMessage = channelMessages
    .filter(msg => {
      const isBot = msg.author.id === envVariables.clientId;
      const hasContent = !!msg.content;
      return isBot && hasContent;
    }).last();

  if (!firstBotMessage) return;

  let firstBotMessageContentCopy = firstBotMessage?.content;

  interaction.channel.messages.cache.forEach(({ author }) => {
    console.log('trying to replace ', getUnrespondedUserName(author.id), ' with ', getRespondedUserName(author.id))
    firstBotMessageContentCopy = firstBotMessageContentCopy.replace(getUnrespondedUserName(author.id), getRespondedUserName(author.id))
  });

  // ⏰ => ✅
  await firstBotMessage?.edit({
    content: firstBotMessageContentCopy
  })

  return;
}
