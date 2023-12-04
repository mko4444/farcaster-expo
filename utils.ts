import dayjs from "./lib/day";

export const fetcher = (url: string, options?: any) => fetch(url, options).then((res) => res.json());

/**
 * Returns a relative time string for UI like in the Warpcast client
 * @param {number} ms - timestamp in milliseconds
 * @returns {string} - relative time string
 */
export function getRelativeTime(ms: number | string) {
  const t = dayjs(ms);

  const minutesAgo = dayjs().diff(t, "minute");
  const hoursAgo = dayjs().diff(t, "hour");
  const daysAgo = dayjs().diff(t, "day");
  const weeksAgo = dayjs().diff(t, "week");
  const monthsAgo = dayjs().diff(t, "month");
  const yearsAgo = dayjs().diff(t, "year");

  if (yearsAgo > 0) return `${yearsAgo}y`;
  if (monthsAgo > 0) return `${monthsAgo}mo`;
  if (weeksAgo > 0) return `${weeksAgo}w`;
  if (daysAgo > 0) return `${daysAgo}d`;
  if (hoursAgo > 0) return `${hoursAgo}h`;
  if (minutesAgo > 0) return `${minutesAgo}m`;

  return "Now";
}
