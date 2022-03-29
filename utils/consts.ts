import { ZoomLinks } from "./types";
require('dotenv').config();

export const solvedThreadPrefix = '💚'

export const supportChannelIds = [
  "955465593191018547", // ed's channel
  "895957476606898176"  // hoxton -> #support
];

export const zoomLinks: ZoomLinks = {
  "815288587662000159": {
    link: process.env.ED_ZOOM,
    name: "Ed"
  },
  "811540425835020309": {
    link: process.env.NICO_ZOOM,
    name: "Nico"
  }
}
