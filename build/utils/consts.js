"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoomLinks = exports.supportChannelIds = exports.solvedThreadPrefix = void 0;
const getEnvVariables_1 = require("./getEnvVariables");
exports.solvedThreadPrefix = '💚';
exports.supportChannelIds = [
    "955465593191018547",
    "895957476606898176" // hoxton -> #support
];
exports.zoomLinks = {
    "815288587662000159": {
        link: getEnvVariables_1.envVariables.EdZoom,
        name: "Ed"
    },
    "811540425835020309": {
        link: getEnvVariables_1.envVariables.NicoZoom,
        name: "Nico"
    }
};
