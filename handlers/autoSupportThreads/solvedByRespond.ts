import {
  Interaction,
  Message,
  SelectMenuInteraction,
  Snowflake,
} from "discord.js";
import { nullValue, starChannelId } from "../../utils/consts";
import client from "../../utils/discordClient";
import { createEphemeral } from "../../utils/helpers";
import { stringAsADatabase } from "../../utils/stringAsADatabase";

type NBStars = string;
type UserRow = [Snowflake, NBStars];

export const initialTitle = "Heyo, here's the particiapation stars!!\n";

export async function handleSelectHelpedOutStudents(interaction: Interaction) {
  if (!interaction.isSelectMenu())
    return await createEphemeral(interaction, "Not a select command what?");

  // need Channel type so must fetch, no cache.
  const starChan = await client.channels.fetch(starChannelId);
  if (!starChan)
    return await createEphemeral(
      interaction,
      "Something went wrong with handling the /solved command - star channel is broken 1"
    );
  if (!starChan.isTextBased())
    return await createEphemeral(
      interaction,
      "Something went wrong with handling the /solved command - star channel is broken 2"
    );
  if (starChan.isDMBased())
    return await createEphemeral(
      interaction,
      "Something went wrong with handling the /solved command - star channel is broken 3"
    );

  // need full Message type so must fetch, no cache.
  // check for existing star track message. if it exists - use it. Otherwise, create a fresh one.
  const allStarChannelMessages: Map<any, Message> =
    await starChan.messages.fetch();

  const messages = Array.from(allStarChannelMessages.values());

  let targetBotMessage;

  if (messages?.length) {
    targetBotMessage = messages.at(0);
  }

  let message = targetBotMessage ? targetBotMessage.content : initialTitle;

  // help.
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
    // for all of the selected people...
    const userDataInMessage = messageAsADB.getItemBy(0, `<@${userId}>`);

    // if they aren't on the list - add them with 1 star
    if (!userDataInMessage) {
      message = messageAsADB.addItem([`<@${userId}>`, "1"]);
    } else {
      // otherwise, increase their score by 1
      const [userId, nbStars] = userDataInMessage;

      const updatedUserRow: UserRow = [
        userId,
        (Number(nbStars) + 1).toString(),
      ];
      const updatedMsg = messageAsADB.updateItemBy(0, userId, updatedUserRow);

      if (updatedMsg) message = updatedMsg;
    }
  });

  // either send the message
  if (!targetBotMessage) {
    await starChan.send({ content: message });
  } else {
    // or update
    await targetBotMessage.edit({
      content: message,
    });
  }
  return;
}
