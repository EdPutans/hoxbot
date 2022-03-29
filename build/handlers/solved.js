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
exports.handleSolved = void 0;
const consts_1 = require("../utils/consts");
const helpers_1 = require("../utils/helpers");
const handleSolved = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.isThread()))
        return;
    if (!interaction.channel.parentId)
        return;
    if (!(0, helpers_1.getIsSupportThread)(interaction.channel.parentId))
        return;
    if (interaction.channel.name.startsWith(consts_1.solvedThreadPrefix))
        return (0, helpers_1.createEphemeral)(interaction, 'Yo, the channel is already "solved"!');
    yield interaction.channel.setName(consts_1.solvedThreadPrefix + interaction.channel.name);
});
exports.handleSolved = handleSolved;
