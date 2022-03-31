import { Interaction } from "discord.js";
import { zoomLinks } from "../utils/consts";
import { createEphemeral } from "../utils/helpers";
import { ZoomLinks } from "../utils/types";

const defaultMessage = " The session is starting!";

export const handleZoom = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const userId = `${interaction.user.id}` as keyof ZoomLinks;
  const defaultZoomLink = zoomLinks[userId]?.link;

  if (!defaultZoomLink) return createEphemeral(interaction, "You don't have access to this feature!")

  const zoomLink = interaction.options.get("zoom-link")?.value || defaultZoomLink;
  const message = interaction.options.get("message")?.value || defaultMessage;

  const newMessage = `@everyone ${message} ${zoomLink}`;

  await interaction.reply(newMessage)
  return;
}

