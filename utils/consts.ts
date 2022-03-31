import { envVariables } from "./getEnvVariables";
import { ZoomLinks } from "./types";
export const solvedThreadPrefix = '💚'

export const supportChannelIds = [
  "955465593191018547", // ed's channel
  "895957476606898176"  // hoxton -> #support
];

// Note: if a user is a teacher, it's worth adding them here.
export const zoomLinks: ZoomLinks = {
  "815288587662000159": {
    link: envVariables.EdZoom,
    name: "Ed"
  },
  "811540425835020309": {
    link: envVariables.NicoZoom,
    name: "Nico"
  }
}
