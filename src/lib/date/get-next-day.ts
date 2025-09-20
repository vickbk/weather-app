export default function getNextDay(date: Date = new Date()) {
  return new Date(date.getTime() + 24 * 60 * 60 * 1000);
}
