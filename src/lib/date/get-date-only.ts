export default function getDateOnly(date: Date = new Date()) {
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

export function getDayShort(date: Date = new Date()) {
  return date.toLocaleDateString(undefined, { weekday: "short" });
}
