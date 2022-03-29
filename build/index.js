"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const index_1 = require("discord.js/typings/index");
const autoSupportThread_1 = require("./handlers/autoSupportThread");
const easterEggs_1 = require("./handlers/easterEggs");
const solved_1 = require("./handlers/solved");
const unsolve_1 = require("./handlers/unsolve");
const zoom_1 = require("./handlers/zoom");
const getEnvVariables_1 = require("./utils/getEnvVariables");
exports.client = new index_1.Client({
    intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS']
});
exports.client.once('ready', () => {
    console.log('Ready to go go go!');
});
exports.client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    yield (0, zoom_1.handleZoom)(interaction);
    yield (0, solved_1.handleSolved)(interaction);
    yield (0, unsolve_1.handleUnsolve)(interaction);
}));
exports.client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.id === getEnvVariables_1.envVariables.clientId)
        return; // dont reply to bot messages
    if (message.system)
        return;
    yield (0, autoSupportThread_1.handleAutoSupportThread)(message);
    yield (0, easterEggs_1.handleEasterEgg)(message);
}));
exports.client.login(getEnvVariables_1.envVariables.token);
