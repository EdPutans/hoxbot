import {
  Interaction,
  Message,
  Snowflake,
  ChatInputCommandInteraction,
} from "discord.js";
import { starChannelId, starSymbol } from "../../utils/consts";
import client from "../../utils/discordClient";

function createUserStarMessage(userId: Snowflake, nbStars: number) {
  return `<@${userId}> ${nbStars} ${starSymbol}`;
}

export async function handleSelectHelpedOutStudents(
  response: Interaction,
  parentInteraction: ChatInputCommandInteraction
) {
  if (!response.isSelectMenu()) return;

  parentInteraction.editReply({
    content: "Thanks for the response!",
    components: [],
    embeds: [],
  });

  // need Channel type so must fetch, no cache.
  const starChan = await client.channels.fetch(starChannelId);
  // const starChan = await client.channels.fetch("1016324894658658357");

  if (!starChan) return;
  if (!starChan.isTextBased()) return;
  if (starChan.isDMBased()) return;

  // need full Message type so must fetch, no cache.
  const allStarChannelMessages: Map<any, Message> =
    await starChan.messages.fetch();

  const messages = Array.from(allStarChannelMessages.values());

  // for each of the selected people:
  response.values.forEach((userId) => {
    // find the bot message in star channel
    const targetBotMessage = messages.find((message) =>
      message.content.includes(userId)
    );

    // if user was never there add them with 1 new star
    if (!targetBotMessage) {
      const addedUserMessage = createUserStarMessage(userId, 1);

      starChan.send(addedUserMessage);
    } else {
      // if they're present: find the message and increase the stars
      const [_, nbStars] = targetBotMessage.content.split(" ");

      targetBotMessage.edit({
        content: createUserStarMessage(userId, Number(nbStars) + 1),
      });
    }
  });

  await response.reply({
    content: `Your selection was received successfully with interaction ID: ${response.id}`,
    ephemeral: true,
  });
  return;
}
