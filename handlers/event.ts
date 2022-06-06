import { Interaction } from "discord.js";
import { createEphemeral, getIsTeacher } from "../utils/helpers";

const createMessageTemplate = ({ when, where, what }: { when: string, where: string, what: string }) =>
  `
Hey @everyone!

**What?** ${what}
**When?** ${when}
**Where?** ${where}
`

export const handleEvent = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;
  const userId = interaction.user.id;
  if (!getIsTeacher(userId)) return await createEphemeral(interaction, "Only the staff currently have access to this feature!")

  const what: string = `${interaction.options.get("what")?.value}`;
  const where: string = `${interaction.options.get("where")?.value}`;
  const when: string = `${interaction.options.get("when")?.value}`;

  await interaction.reply(createMessageTemplate({ what, where, when }));

  return;
}