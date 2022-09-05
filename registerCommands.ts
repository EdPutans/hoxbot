import {
  SlashCommandBuilder,
  Routes,
  REST,
  SlashCommandStringOption,
} from "discord.js";
import { envVariables } from "./utils/getEnvVariables";
import { HOXCommand } from "./utils/types";

const commands = [
  new SlashCommandBuilder()
    .setName(HOXCommand.solved)
    .setDescription("Marks thread as solved"),
  new SlashCommandBuilder()
    .setName(HOXCommand.standup)
    .setDescription("Post a standup message"),

  // still an experimental feature. No API support.
  // new SlashCommandBuilder().setName(HOXCommand.dangerous__clear_voice_channel).setDescription('Clear voice channel chat'),
  new SlashCommandBuilder()
    .setName(HOXCommand.zoom)
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("zoom-link")
        .setDescription("Custom zoom link")
        .setRequired(false)
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("message")
        .setDescription("Set a custom message")
        .setRequired(false)
    )
    .setDescription("Post zoom link!"),

  new SlashCommandBuilder()
    .setName(HOXCommand.event)
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("when")
        .setDescription("when is the event taking place>")
        .setRequired(true)
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("what")
        .setDescription("What's going on?")
        .setRequired(true)
    )
    .addStringOption((option: SlashCommandStringOption) =>
      option
        .setName("where")
        .setDescription("Where is the event happening (Zoom, channel, IRL etc)")
        .setRequired(true)
    )
    .setDescription("Create a new event in this channel"),

  new SlashCommandBuilder()
    .setName(HOXCommand.fixed_by)
    .setDescription("Search discordjs.guide!")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Phrase to search for")
        .setRequired(true)
        .setChoices(
          { name: "Ed", value: "Ed" },
          { name: "Nico", value: "Nico" }
        )
    ),
  new SlashCommandBuilder().setName("test").setDescription("Testing a modal"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(envVariables.token);

rest
  .put(
    Routes.applicationGuildCommands(
      envVariables.clientId,
      envVariables.guildId
    ),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
