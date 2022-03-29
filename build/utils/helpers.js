"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEphemeral = exports.getIsSupportThread = void 0;
const consts_1 = require("./consts");
const getIsSupportThread = (channelId) => {
    return consts_1.supportChannelIds.includes(channelId);
};
exports.getIsSupportThread = getIsSupportThread;
const createEphemeral = (interaction, content) => {
    if (!interaction.isCommand())
        return;
    interaction.reply({
        content,
        ephemeral: true
    });
};
exports.createEphemeral = createEphemeral;
