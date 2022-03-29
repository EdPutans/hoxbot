"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVariables = void 0;
require('dotenv').config();
exports.envVariables = {
    token: process.env.BOT_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.SERVER_ID,
    NicoZoom: process.env.NICO_ZOOM,
    EdZoom: process.env.ED_ZOOM,
};
