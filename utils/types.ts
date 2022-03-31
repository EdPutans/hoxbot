export type UserID = '815288587662000159' | '811540425835020309'

export type ZoomLinks = {
  [K in UserID]: {
    link: string | undefined;
    name: string;
  }
}
// slash commands supported by hoxbot:
export type HoxCommand = 'solved' | 'unsolve' | 'zoom' | 'event';
