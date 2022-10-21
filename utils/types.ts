import { Snowflake } from "discord.js";

export type UserID = "815288587662000159" | "811540425835020309";

export type Value = { label: string; value: Snowflake };

export type StaffConfig = {
  [K in UserID]: {
    zoomLink: string | undefined;
    name: string;
    offsetToMatchPreferredPostingTimeToAlbaniaTime: number;
  };
};
// slash commands supported by hoxbot:
export enum HOXCommand {
  solved = "solved",
  zoom = "zoom",
  event = "event",
  standup = "standup",
  dangerous__clear_voice_channel = "dangerous__clear_voice_channel",
  beta_fixed_by = "beta_fixed_by",
  test = "test",
  kill = "kill",
  restart = "restart",
}
