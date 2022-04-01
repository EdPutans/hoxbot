require('dotenv').config()

export const envVariables = {
  token: process.env.BOT_TOKEN as string,
  clientId: process.env.CLIENT_ID as string,
  guildId: process.env.SERVER_ID as string,
  NicoZoom: process.env.NICO_ZOOM as string,
  EdZoom: process.env.ED_ZOOM as string,
  port: process.env.PORT || 80,
}