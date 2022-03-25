const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

require('dotenv').config()

// let TOKEN = process.env.BOT_TOKEN
let clientId = process.env.CLIENT_ID
let guildId = process.env.EDS_TEST_SERVER_ID

console.log({ guildId, clientId })


const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('solved').setDescription('Marks thread as solved'),
  new SlashCommandBuilder().setName('unsolve').setDescription('Marked as solved by accident? No worries Im here for ya'),
]
  .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);