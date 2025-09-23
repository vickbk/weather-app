export default function getDateOnly(date: Date = new Date()) {
  return date.toISOString().substring(0, 10);
}

export function getDayShort(date: Date = new Date()) {
  return date.toLocaleDateString(undefined, { weekday: "short" });
}
