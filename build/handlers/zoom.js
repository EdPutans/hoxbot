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
exports.handleZoom = void 0;
const consts_1 = require("../utils/consts");
const helpers_1 = require("../utils/helpers");
const defaultMessage = " The session is starting!";
const handleZoom = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (!interaction.isCommand())
        return;
    const userId = `${interaction.user.id}`;
    const defaultZoomLink = (_a = consts_1.zoomLinks[userId]) === null || _a === void 0 ? void 0 : _a.link;
    if (!defaultZoomLink)
        return (0, helpers_1.createEphemeral)(interaction, "You don't have access to this feature!");
    const zoomLink = ((_b = interaction.options.get("zoom-link")) === null || _b === void 0 ? void 0 : _b.value) || defaultZoomLink;
    const message = ((_c = interaction.options.get("message")) === null || _c === void 0 ? void 0 : _c.value) || defaultMessage;
    const newMessage = `@everyone ${message} ${zoomLink}`;
    yield interaction.reply(newMessage);
    return;
});
exports.handleZoom = handleZoom;
// // if its not an admin - can't use it
// if(!defaultZoomLink){
//    await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
//      token: context.params.event.token,
//       content: "Uh oh, you can't share a zoom link",
//      response_type: 'CHANNEL_MESSAGE_WITH_SOURCE'
//    });
//   return;
// }
// const defaultMessage = " The session is starting!";
// const message = context.params.event?.data?.options.find(item =>
//     item.name === 'custom-message')?.value || defaultMessage;
// const zoomLink = context.params.event?.data?.options.find(item =>
//     item.name === 'zoom-link')?.value || defaultZoomLink;
// if(!zoomLink) {
//   return;
// }
// const newMessage = `@everyone ${message} ${zoomLink}`;
// await lib.discord.channels['@0.3.0'].messages.create({
//   channel_id: context.params.event.channel_id,
//   content: newMessage
// });
