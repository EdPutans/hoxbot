import { Interaction } from "discord.js";
import { zoomLinks } from "../utils/consts";
import { createEphemeral } from "../utils/helpers";
import { ZoomLinks } from "../utils/types";

const defaultMessage = " The session is starting!";

export const handleZoom = async (interaction: Interaction) => {
  const userId = `${interaction.user.id}` as keyof ZoomLinks;

  const defaultZoomLink = zoomLinks[userId]?.link;
  console.log(userId, defaultZoomLink);

  if (!interaction.isCommand()) return;
  if (!defaultZoomLink) return createEphemeral(interaction, "You don't have access to this feature!")

  const zoomLink = interaction.options.get("zoom-link")?.value || defaultZoomLink;
  const message = interaction.options.get("message")?.value || defaultMessage;

  const newMessage = `@everyone ${message} ${zoomLink}`;

  await interaction.reply(newMessage)
}




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
