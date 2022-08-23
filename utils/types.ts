export type UserID = '815288587662000159' | '811540425835020309'

export type ZoomLinks = {
  [K in UserID]: {
    link: string | undefined;
    name: string;
  }
}
// slash commands supported by hoxbot:
export enum HOXCommand {
  solved = 'solved',
  unsolve = 'unsolve',
  zoom = 'zoom',
  event = 'event',
  standup = 'standup',
  dangerous__clear_voice_channel = 'dangerous__clear_voice_channel',
  fixThread = 'fix-thread'
}