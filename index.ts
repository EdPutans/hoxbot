import { Interaction, Message, Client, Intents, Channel } from "discord.js";
import { handleAutoSupportThread } from "./handlers/autoSupportThread";
import { handleEasterEgg, handleNoice } from "./handlers/easterEggs";
import { handleEvent } from "./handlers/event";
import { handleClearVoiceChat } from "./handlers/handleClearVoiceChat";
import { handleSolved } from "./handlers/solved";
import { handleUnsolve } from "./handlers/unsolve";
import { handleZoom } from "./handlers/zoom";
import client from "./utils/discordClient";
import { envVariables } from "./utils/getEnvVariables";
import { createEphemeral } from "./utils/helpers";
import { HOXCommand } from "./utils/types";
import express from 'express'
import { handleStandupCreate } from "./handlers/handleStandupCreate";
import { handleStandupReply } from "./handlers/handleStandupReply";
import { TEMP_handleStandupFix } from "./handlers/handleFix";


const api = express();
api.get('/', (req, res) => {
  res.status(200).send("henlo!")
})

api.listen(envVariables.port, () => {
  console.log('using port', envVariables.port)
})

client.once('ready', () => {
  console.log('Ready to go go go!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
  try {
    if (!interaction.isCommand()) return await createEphemeral(interaction, 'its not a command what')
    if (!interaction.commandName) return await createEphemeral(interaction, 'Something wrong with this command')

    switch (interaction.commandName as HOXCommand) {
      case 'zoom':
        return await handleZoom(interaction);
      case 'standup':
        return await handleStandupCreate(interaction);
      case 'solved':
        return await handleSolved(interaction);
      case 'unsolve':
        return await handleUnsolve(interaction);
      case 'event':
        return await handleEvent(interaction);
      case 'fix-thread':
        return await TEMP_handleStandupFix(interaction);
      case 'dangerous__clear_voice_channel':
        return await handleClearVoiceChat(interaction);
      default:
        return await createEphemeral(interaction, "Oh man I'm not feeling OSHUM right now")
    }
  } catch (e) {
    console.error("Something died. ", e)
  }
});

client.on('messageCreate', async (message: Message) => {
  try {
    if (message.author.id === envVariables.clientId) return; // dont reply to bot messages
    if (message.system) return;

    await handleStandupReply(message)
    await handleAutoSupportThread(message);
    await handleEasterEgg(message)
    await handleNoice(message)
    return;
  } catch (e) {
    console.error("Something died. ", e)
  }
});

client.login(envVariables.token);

process.on("exit", () => {
  console.log("CYA LOSERS!")
})