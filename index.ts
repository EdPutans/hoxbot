import { Interaction, Message } from "discord.js";
import { handleAutoSupportThread } from "./handlers/autoSupportThreads/autoSupportThread";
import { handleEasterEgg, handleNoice } from "./handlers/easterEggs";
import { handleEvent } from "./handlers/event";
import { handleZoom } from "./handlers/zoom";
import client from "./utils/discordClient";
import { envVariables } from "./utils/getEnvVariables";
import { createEphemeral } from "./utils/helpers";
import { HOXCommand } from "./utils/types";
import express from "express";
import { handleStandupCreate } from "./handlers/standup/handleStandupCreate";
import { handleStandupReply } from "./handlers/standup/handleStandupReply";
import { handleSolvedBy } from "./handlers/autoSupportThreads/solvedByInit";
import { handlePowerButton } from "./handlers/handlePowerButton";

const api = express();
api.get("/", (req, res) => {
  res.status(200).send("henlo!");
});

api.listen(envVariables.port, () => {
  console.log("using port", envVariables.port);
});

client.once("ready", () => {
  console.log("Ready to go go go!");
});

client.on(
  "interactionCreate",
  async (interaction: Interaction): Promise<void> => {
    try {
      if (!interaction.isCommand())
        return await createEphemeral(interaction, "its not a command what");
      if (!interaction.commandName)
        return await createEphemeral(
          interaction,
          "Something wrong with this command"
        );

      console.info(
        `${interaction?.user?.username} ran ${
          interaction?.commandName
        } on ${new Date()}`
      );

      switch (interaction.commandName as HOXCommand) {
        case "zoom":
          return await handleZoom(interaction);
        case "standup":
          return await handleStandupCreate(interaction);

        case "solved":
        case "beta_fixed_by":
          return await handleSolvedBy(interaction);
        case "event":
          return await handleEvent(interaction);
        // restar/start/kill switches:
        case "kill":
          return await handlePowerButton(interaction, "kill");
        case "restart":
          return await handlePowerButton(interaction, "restart");
        default:
          return await createEphemeral(
            interaction,
            "Oh man I'm not feeling OSHUM right now"
          );
      }
    } catch (e) {
      if (!interaction.isCommand())
        return console.error("command -> err -> case 1");

      return console.error(
        `Something died when ${interaction.user.username} ran /${interaction.commandName}`,
        e
      );
    }
  }
);

client.on("messageCreate", async (message: Message): Promise<void> => {
  try {
    if (message.author.id === envVariables.clientId) return; // dont reply to bot messages
    if (message.system) return;

    // console.info(`${message?.author?.username} posted ${message?.content} on ${new Date()}`)
    // TODO: think of a better way to log messages that trigger these funcs

    await handleStandupReply(message);
    await handleAutoSupportThread(message);
    await handleEasterEgg(message);
    await handleNoice(message);
    return;
  } catch (e) {
    console.error(
      `Something died after this message was posted, ${message.author.username}: ${message.content}`,
      e
    );
  }
});

client.login(envVariables.token);

process.on("exit", () => {
  console.log("CYA LOSERS!");
});
