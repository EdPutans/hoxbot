"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const getEnvVariables_1 = require("./utils/getEnvVariables");
const commands = [
    new builders_1.SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new builders_1.SlashCommandBuilder().setName('solved').setDescription('Marks thread as solved'),
    new builders_1.SlashCommandBuilder().setName('unsolve').setDescription('Marked as solved by accident? No worries Im here for ya'),
    new builders_1.SlashCommandBuilder().setName('zoom').addStringOption(option => option.setName('zoom-link')
        .setDescription('Custom zoom link')
        .setRequired(false))
        .addStringOption(option => option.setName('message')
        .setDescription('Set a custom message')
        .setRequired(false))
        .setDescription('Post zoom link!'),
]
    .map(command => command.toJSON());
const rest = new rest_1.REST({ version: '9' }).setToken(getEnvVariables_1.envVariables.token);
rest.put(v9_1.Routes.applicationGuildCommands(getEnvVariables_1.envVariables.clientId, getEnvVariables_1.envVariables.guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
