import {
  Interaction,
  Message,
  Snowflake,
  ChatInputCommandInteraction,
} from "discord.js";
import { starChannelId } from "../../utils/consts";
import client from "../../utils/discordClient";
import { stringAsADatabase } from "../../utils/stringAsADatabase";
import { handleSolved } from "./solved";

type NBStars = string;
type UserRow = [Snowflake, NBStars];

export const initialTitle = "Heyo, here's the particiapation stars!!\n";

export async function handleSelectHelpedOutStudents(
  interaction: Interaction,
  parentInteraction: ChatInputCommandInteraction
) {
  if (!interaction.isSelectMenu()) return;

  await parentInteraction.editReply({
    content: "Thanks for the response!",
    components: [],
    embeds: [],
  });

  // need Channel type so must fetch, no cache.
  const starChan = await client.channels.fetch(starChannelId);

  if (!starChan) return;
  if (!starChan.isTextBased()) return;
  if (starChan.isDMBased()) return;

  // need full Message type so must fetch, no cache.
  const allStarChannelMessages: Map<any, Message> =
    await starChan.messages.fetch();

  const messages = Array.from(allStarChannelMessages.values());

  let targetBotMessage;

  if (messages?.length) {
    targetBotMessage = messages.at(0);
  }

  let message = targetBotMessage ? targetBotMessage.content : initialTitle;

  const messageAsADB = stringAsADatabase<UserRow>(
    `${message}`,
    initialTitle,
    ([name, nbStars]) => `${name} ${nbStars} ⭐ \n`,
    (string) => {
      const [name, nbStars] = string.split(" ");
      return [name, nbStars];
    }
  );

  interaction.values.forEach((userId) => {
    const userDataInMessage = messageAsADB.getItemBy(0, `<@${userId}>`);

    if (!userDataInMessage) {
      message = messageAsADB.addItem([`<@${userId}>`, "1"]);
    } else {
      const [userId, nbStars] = userDataInMessage;

      const updatedUserRow: UserRow = [
        userId,
        (Number(nbStars) + 1).toString(),
      ];
      const updatedMsg = messageAsADB.updateItemBy(0, userId, updatedUserRow);

      if (updatedMsg) message = updatedMsg;
    }
  });

  if (!targetBotMessage) {
    await starChan.send({ content: message });
  } else {
    await targetBotMessage.edit({
      content: message,
    });
  }
  //FIXME:
  await handleSolved(interaction);
  return;
}
