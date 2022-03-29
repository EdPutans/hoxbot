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
exports.handleUnsolve = void 0;
const consts_1 = require("../utils/consts");
const helpers_1 = require("../utils/helpers");
const handleUnsolve = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.isThread()))
        return (0, helpers_1.createEphemeral)(interaction, `You're not inside a support thread!`);
    if (!interaction.channel.parentId)
        return (0, helpers_1.createEphemeral)(interaction, `Something went wrong - no parent_id`);
    if (!(0, helpers_1.getIsSupportThread)(interaction.channel.parentId))
        return (0, helpers_1.createEphemeral)(interaction, `You're not inside a support thread!`);
    if (!interaction.channel.name.startsWith(consts_1.solvedThreadPrefix))
        return (0, helpers_1.createEphemeral)(interaction, `Umm.. the channel isn't solved? :what:`);
    const newName = interaction.channel.name.slice(consts_1.solvedThreadPrefix.length);
    yield interaction.channel.setName(newName);
    return;
});
exports.handleUnsolve = handleUnsolve;
