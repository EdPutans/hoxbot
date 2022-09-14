import { Interaction } from "discord.js";
import { staffConfig } from "../utils/consts";
import { createEphemeral } from "../utils/helpers";
import { UserID } from "../utils/types";

const defaultMessage = " The session is starting!";

export const handleZoom = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const userId = `${interaction.user.id}`;
  // @ts-ignore silly typescript, its literally the same key
  const defaultZoomLink = staffConfig[userId]?.zoomLink as UserID;

  if (!defaultZoomLink)
    return await createEphemeral(
      interaction,
      "You don't have access to this feature!"
    );

  const zoomLink =
    interaction.options.get("zoom-link")?.value || defaultZoomLink;
  const message = interaction.options.get("message")?.value || defaultMessage;

  const newMessage = `@everyone ${message} ${zoomLink}`;

  await interaction.reply(newMessage);
  return;
};
