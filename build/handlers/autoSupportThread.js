"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAutoSupportThread = void 0;
const helpers_1 = require("../utils/helpers");
const handleAutoSupportThread = (message) => {
    if (!message.channel)
        return;
    if (!(0, helpers_1.getIsSupportThread)(message.channel.id))
        return;
    message.startThread({
        name: message.content,
    });
};
exports.handleAutoSupportThread = handleAutoSupportThread;
