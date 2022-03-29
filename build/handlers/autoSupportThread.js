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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAutoSupportThread = void 0;
const discordClient_1 = __importDefault(require("../utils/discordClient"));
const helpers_1 = require("../utils/helpers");
const starterMessage = `
Hey! Thanks for the question! Please make sure you:
- added as much RELEVANT information as you can;
- mentioned the things you tried and what was the result
- post screenshots, if applicable.

Cheers! 🎩`;
const handleAutoSupportThread = (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.channel)
        return;
    if (!(0, helpers_1.getIsSupportThread)(message.channel.id))
        return;
    const thread = yield message.startThread({
        name: message.content,
    });
    const channel = yield discordClient_1.default.channels.cache.get(thread.id);
    if (!channel)
        return;
    if (!('send' in channel))
        return;
    channel.send(starterMessage);
});
exports.handleAutoSupportThread = handleAutoSupportThread;
