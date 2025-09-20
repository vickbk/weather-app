export default function getDateOnly(date: Date = new Date()) {
  return date.toISOString().substring(0, 10);
}
