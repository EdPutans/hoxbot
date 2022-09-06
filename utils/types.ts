export type UserID = "815288587662000159" | "811540425835020309";

export type StaffConfig = {
  [K in UserID]: {
    zoomLink: string | undefined;
    name: string;

    // Nico likes to post in alb time. Ed uses UK. This will do for now. Fuck  timezones.
    offsetToMatchPreferredPostingTimeToAlbaniaTime: number;
  };
};

// slash commands supported by hoxbot:
export enum HOXCommand {
  solved = "solved",
  unsolve = "unsolve",
  zoom = "zoom",
  event = "event",
  standup = "standup",
}
