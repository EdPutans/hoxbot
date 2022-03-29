export type UserID = '815288587662000159' | '811540425835020309'

export type ZoomLinks = {
  [K in UserID]: {
    link: string | undefined;
    name: string;
  }
}
