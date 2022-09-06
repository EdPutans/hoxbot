import { envVariables } from "./getEnvVariables";
import { ZoomLinks } from "./types";
export const solvedSupportThreadPrefix = "💚";
export const solvedClassroomThreadPrefix = "💜";
export const starSymbol = "⭐";

export const starChannelId = "1016324894658658357";

export const studentRoleIds = ["955781997857480764", "866609200015867914"];

export const classRoomIds = [
  "866611696293117962", // hoxton => #classroom cohort1
  "969302671121072128", // hoxton => #classroom cohort2
  "960927348419600425", // ed-> #general
  "1011563992512213022", // hoxton - #test-classroom
];

export const supportChannelIds = [
  "955465593191018547", // ed's channel
  "895957476606898176", // hoxton -> #support cohort1
  "969302750271787018", // hoxton => #support cohort2
  "973495933612490772", // hoxton - #test-support
];

// Note: if a user is a teacher, it's worth adding them here.
export const zoomLinks: ZoomLinks = {
  "815288587662000159": {
    link: envVariables.EdZoom,
    name: "Ed",
  },
  "811540425835020309": {
    link: envVariables.NicoZoom,
    name: "Nico",
  },
};
