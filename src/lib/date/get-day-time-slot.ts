export default function getDayTimeSlot() {
  const currentTime = new Date().getHours();
  const timeSlots = [
    [22, 24, "night"],
    [0, 4, "night"],
    [4, 10, "morning"],
    [10, 16, "day"],
    [16, 22, "evening"],
  ] as const;
  return (
    timeSlots.find(
      ([min, max]) => min <= currentTime && max > currentTime
    )?.[2] ?? "day"
  );
}

export function dayNightTime(time: Date) {
  const hours = time.getHours();
  return hours >= 6 && hours < 18 ? "day" : "night";
}
