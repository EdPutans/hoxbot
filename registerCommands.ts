import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { envVariables } from './utils/getEnvVariables';

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('solved').setDescription('Marks thread as solved'),
  new SlashCommandBuilder().setName('unsolve').setDescription('Marked as solved by accident? No worries Im here for ya'),
  new SlashCommandBuilder().setName('zoom').addStringOption(option =>
    option.setName('zoom-link')
      .setDescription('Custom zoom link')
      .setRequired(false))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Set a custom message')
        .setRequired(false))
    .setDescription('Post zoom link!'),
]
  .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(envVariables.token);

rest.put(Routes.applicationGuildCommands(envVariables.clientId, envVariables.guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error); 