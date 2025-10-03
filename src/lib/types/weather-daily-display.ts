export const WeatherDailyDisplay = {
  sunrise: "sunrise",
  sunset: "sunset",
  get(name: string): string {
    return name in this && name !== "get"
      ? this[name as WeatherDailyDisplayKeys]
      : name;
  },
} as const;

export type WeatherDailyDisplayKeys = Exclude<
  keyof typeof WeatherDailyDisplay,
  "get"
>;
export type WeatherDailyDisplayValues =
  (typeof WeatherDailyDisplay)[WeatherDailyDisplayKeys];
export default WeatherDailyDisplay;

export type WeatherDailiData = {
  [key in WeatherDailyDisplayValues]?: Date[];
};
