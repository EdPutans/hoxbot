
import { ActionRowBuilder, AutocompleteInteraction, CommandInteraction, Interaction, SelectMenuBuilder, SelectMenuInteraction } from "discord.js";
import { solvedClassroomThreadPrefix, solvedSupportThreadPrefix } from "../utils/consts";
import { getIsSupportThread, createEphemeral, getIsClassroomThread } from "../utils/helpers";

//TODO: fix
export const handleSolvedBy = async (interaction: any) => {
  if (!interaction.isAutocomplete) return;
  if (!interaction.channel?.isThread()) return await createEphemeral(interaction, `You're not inside a thread!`)
  if (!interaction.channel.parentId) return await createEphemeral(interaction, `No parent ID? what?`)

  const focusedOption = interaction.options.getFocused(true);
  let choices: string[] = [];

  if (focusedOption.name === 'query') {
    choices = ['Popular Topics: Threads', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview'];
  }

  if (focusedOption.name === 'version') {
    choices = ['v9', 'v11', 'v12', 'v13', 'v14'];
  }

  const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
  await interaction.respond(
    filtered.map(choice => ({ name: choice, value: choice })),
  );
  return;
}