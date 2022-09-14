import isValid from "date-fns/isValid";

export function epochToDiscordRelativeEpoch(epoch: number) {
  return `<t:${epoch}:R>`;
}

//TODO: move to eds helpers
export function isValidTimeString(
  value: string
): { hours: number; minutes: number } | null {
  // handle dots too
  let time = value.replace(".", ":");

  if (!/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
    return null;
  }

  const [hs, mins] = time.split(":");

  const hours = Number(hs);
  const minutes = Number(mins);

  if (Number.isNaN(hours)) return null;
  if (Number.isNaN(minutes)) return null;

  return {
    hours,
    minutes,
  };
}

export function validDateToEpoch(dateString: DateConstructor["arguments"]) {
  return Number(new Date(dateString).valueOf().toString().slice(0, -3));
}

type Options = {
  hourOffset: number;
};

//TODO: timezones... 🤮
export function getEpochFromString(
  string: string,
  options?: Options
): number | null {
  const validTime = isValidTimeString(string);
  const offset = options?.hourOffset ?? 0;

  if (validTime) {
    let date = new Date();

    // FIXME: hardcoded to Albania as per Nico's current request.
    date.setHours(validTime.hours + offset);
    date.setMinutes(validTime.minutes);

    return validDateToEpoch(date);
  }

  let date = new Date(new Date(string).toUTCString());
  const isValidDate = isValid(date);

  if (!isValidDate) return null;
  date.setHours(date.getHours() + offset);

  return validDateToEpoch(date);
}
