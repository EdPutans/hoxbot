import { Interaction } from "discord.js";
import { staffConfig } from "../utils/consts";
import {
  epochToDiscordRelativeEpoch,
  getEpochFromString,
} from "../utils/datesAreABaneOfEveryDevsExistence";
import { createEphemeral, getIsTeacher } from "../utils/helpers";
import { UserID } from "../utils/types";

const createMessageTemplate = (when: string, where: string, what: string) =>
  `
Hey @everyone!

**What?** ${what}
**When?** ${when}
**Where?** ${where}
`;

export const handleEvent = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;
  const userId = interaction.user.id as UserID;

  if (!getIsTeacher(userId))
    return await createEphemeral(
      interaction,
      "Only the staff currently have access to this feature!"
    );

  const what: string = `${interaction.options.get("what")?.value}`;
  const where: string = `${interaction.options.get("where")?.value}`;
  const when: string = `${interaction.options.get("when")?.value}`;

  const time = getEpochFromString(when, {
    hourOffset:
      staffConfig[userId].offsetToMatchPreferredPostingTimeToAlbaniaTime,
  });

  if (!time)
    return await createEphemeral(
      interaction,
      "Wrong time argument. Try again!"
    );

  const whenEpoch = epochToDiscordRelativeEpoch(time);
  await interaction.reply(createMessageTemplate(what, where, whenEpoch));

  return;
};
