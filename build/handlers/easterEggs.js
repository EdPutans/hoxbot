"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEasterEgg = void 0;
const handleEasterEgg = (message) => {
    if (message.content.toLowerCase().includes('yeet')) {
        message.reply('Bruh');
    }
};
exports.handleEasterEgg = handleEasterEgg;
