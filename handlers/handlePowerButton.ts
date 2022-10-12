import { Interaction } from "discord.js";
import client from "../utils/discordClient";
import { envVariables } from "../utils/getEnvVariables";
import { createEphemeral, getIsTeacher } from "../utils/helpers";

type Action = "launch" | "kill" | "restart";

export const handlePowerButton = async (
  interaction: Interaction,
  action: Action
) => {
  if (!interaction.member)
    return await createEphemeral(
      interaction,
      "Weirdness in handlePowerButton, case 1"
    );

  if (!getIsTeacher(interaction.member.user.id))
    return await createEphemeral(
      interaction,
      "You need to level up to defeat the all-mighty Hoxbot https://c.tenor.com/TjXiqhPiZZsAAAAM/ru-havin-a-giggle-ther-m8-doggo.gif"
    );

  switch (action) {
    case "kill": {
      client.destroy();
      return await createEphemeral(
        interaction,
        "Murdered the god damn bot https://media.tenor.com/cjQBQCbyr2EAAAAM/killed-em-hold-this.gif"
      );
    }
    case "launch": {
      await client.login(envVariables.token);
      return await createEphemeral(
        interaction,
        "Giving birth to Hoxbot. Again."
      );
    }
    case "restart": {
      client.destroy();
      setTimeout(async () => {
        await client.login(envVariables.token);
        return await interaction.channel?.send({
          content:
            "Bot has been restarted! https://c.tenor.com/vxj4__Pl7soAAAAC/restart-press.gif",
        });
      }, 3000);
    }
  }
};
