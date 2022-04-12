import { GuildMember, Interaction, Message, Snowflake } from "discord.js";
import { createEphemeral, getIsStudent, getIsTeacher } from "../utils/helpers";
import { writeFileSync } from "fs";
import { addActiveStandupThread } from "../utils/fs-write";

const initialMessage = "Hey @everyone! Time for the daily!";
const defaultThreadName = `Daily standup time!!!!`;

export const getUnrespondedUserName = (userId: string) => `<@${userId}>⏰`;
export const getRespondedUserName = (userId: string) => `<@${userId}>✅`;

export const handleStandupCreate = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return await createEphemeral(interaction, `Not a command?`);
  if (!interaction.channel) return await createEphemeral(interaction, `Not in a channel lol what`);
  if (interaction.channel.isThread()) return await createEphemeral(interaction, `Can't use this command in a thread`);

  if (interaction.channel?.type !== 'GUILD_TEXT') return await createEphemeral(interaction, `This command is only available in a classroom channel`);
  if (!getIsTeacher(interaction.user.id)) return await createEphemeral(interaction, `This command isn't available to you :P`);

  const usersToPing = interaction.channel.members.filter((user: GuildMember) => {
    const roleIds = user.roles.cache.map(role => role.id)
    return getIsStudent(roleIds);
  })

  const pingPeople: string = usersToPing.map(user => getUnrespondedUserName(user.id) + '\n').join('');

  const message =
    `
  - How did yesterday go?
  - What's the plan for today?
  - Any ~~cock~~ blockers?

Waiting for answers:
${pingPeople}
`;

  const msg = await interaction.channel.send(initialMessage);
  const thread = await msg.startThread({ name: defaultThreadName });

  thread.send(message)
  addActiveStandupThread(msg.id)

  return;
}

