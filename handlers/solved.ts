import { Interaction } from "discord.js";
import {
  solvedClassroomThreadPrefix,
  solvedSupportThreadPrefix,
} from "../utils/consts";
import {
  getIsSupportThread,
  createEphemeral,
  getIsClassroomThread,
} from "../utils/helpers";

export const handleSolved = async (interaction: Interaction) => {
  if (!interaction.channel?.isThread())
    return await createEphemeral(interaction, `You're not inside a thread!`);
  if (!interaction.channel.parentId)
    return await createEphemeral(interaction, `No parent ID? what?`);

  const isClassroomChannel = getIsClassroomThread(interaction.channel.parentId);
  const isSupportChannel = getIsSupportThread(interaction.channel.parentId);

  const solvedPrefix = isClassroomChannel
    ? solvedClassroomThreadPrefix
    : solvedSupportThreadPrefix;

  if (interaction.channel.name.startsWith(solvedPrefix))
    return await createEphemeral(
      interaction,
      `Umm.. the channel is already solved?`
    );

  if (!isSupportChannel && !isClassroomChannel)
    return await createEphemeral(
      interaction,
      `You're not inside a #support or #classroom thread!`
    );
  if (interaction.channel.name.startsWith(solvedPrefix))
    return await createEphemeral(
      interaction,
      'Yo, the channel is already "solved"!'
    );

  await interaction.channel.setName(solvedPrefix + interaction.channel.name);

  return;
};
