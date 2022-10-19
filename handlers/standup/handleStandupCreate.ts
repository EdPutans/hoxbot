import { GuildMember, Interaction } from "discord.js";
import {
  createEphemeral,
  getIsStudent,
  getIsTeacher,
} from "../../utils/helpers";

export const initialMessage = "Hey @everyone! Time for the daily!";
export const defaultThreadName = `Daily standup time!!!!`;

// WARNING: Do not edit the spacing. Will break other functionality.
export const botStarterMessage = `- How did yesterday go?
- What's the plan for today?
- Any blockers?

Waiting for answers from the following people:`;

export const getUnrespondedUserName = (userId: string) => `<@${userId}>⏰`;
export const getRespondedUserName = (userId: string) => `<@${userId}>✅`;

export const handleStandupCreate = async (interaction: Interaction) => {
  if (!interaction.isCommand())
    return await createEphemeral(interaction, `Not a command?`);
  if (!interaction.channel)
    return await createEphemeral(interaction, `Not in a channel lol what`);
  if (interaction.channel.isThread())
    return await createEphemeral(
      interaction,
      `Can't use this command in a thread`
    );

  // LEGACY EQUIV: interaction.channel?.type !== 'GUILD_TEXT'
  if (interaction.channel?.type !== 0)
    return await createEphemeral(
      interaction,
      `This command is only available in a classroom channel`
    );
  if (!getIsTeacher(interaction.user.id))
    return await createEphemeral(
      interaction,
      `This command isn't available to you :P`
    );

  const usersToPing = interaction.channel.members.filter(
    (user: GuildMember) => {
      const roleIds = user.roles.cache.map((role) => role.id);
      return getIsStudent(roleIds);
    }
  );

  console.log(usersToPing);
  const pingPeople: string = usersToPing
    .map((user) => getUnrespondedUserName(user.id) + "\n")
    .join("");

  const message = `
${botStarterMessage}
${pingPeople}
`;

  const msg = await interaction.channel.send(initialMessage);
  const thread = await msg.startThread({ name: defaultThreadName });

  await thread.send(message);
  return;
};
