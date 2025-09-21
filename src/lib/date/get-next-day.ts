export default function getNextDay(date: Date = new Date(), jump = 1) {
  return new Date(date.getTime() + jump * 24 * 60 * 60 * 1000);
}
