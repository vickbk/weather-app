import drizzle from "@images/icon-drizzle.webp";
import fog from "@images/icon-fog.webp";
import overcast from "@images/icon-overcast.webp";
import partlyCloudy from "@images/icon-partly-cloudy.webp";
import rain from "@images/icon-rain.webp";
import snow from "@images/icon-snow.webp";
import storm from "@images/icon-storm.webp";
import sunny from "@images/icon-sunny.webp";
import mainlyClearNight from "@images/google/mostly_clear_dark.svg";
import mainLyClearDay from "@images/google/mostly_sunny_dark.svg";
import clear from "@images/google/clear_dark.svg";
import partlyCloudyNight from "@images/google/partly_clear_dark.svg";
import drizzleModerate from "@images/google/scattered_showers_dark.svg";
import lightRain from "@images/google/drizzle_dark.svg";
import { dayNightTime } from "@/lib/date/get-day-time-slot";

const weatherIcons = {
  0: [sunny, "clear sky", clear],
  1: [mainLyClearDay, "Mainly clear", mainlyClearNight],
  2: [partlyCloudy, "partly cloudy", partlyCloudyNight],
  3: [overcast, "overcast"],
  45: [fog, "Fog"],
  48: [fog, "depositing rime fog"],
  51: [drizzle, "Drizzle Light"],
  53: [drizzleModerate, "Drizzle moderate"],
  55: [rain, "Drizzle dense intensity"],
  56: [drizzle, "Freezing Drizzle Light"],
  57: [drizzle, "Freezing Drizzle dense intensity"],
  61: [lightRain, "Rain Slight"],
  63: [drizzleModerate, "Rain moderate"],
  65: [rain, "Rain heavy intensity"],
  66: [lightRain, "Freezing Rain Light"],
  67: [rain, "Freezing Rain heavy intensity"],
  71: [snow, "Snow fall Slight"],
  73: [snow, "Snow fall moderate"],
  75: [snow, "Snow fall heavy intensity"],
  77: [snow, "Snow grains"],
  80: [rain, "Rain showers Slight"],
  81: [rain, "Rain showers moderate"],
  82: [rain, "Rain showers violent"],
  85: [snow, "Snow showers slight"],
  86: [snow, "heavy"],
  95: [storm, "	Thunderstorm: Slight or moderate"],
  96: [storm, "Thunderstorm with slight"],
  99: [storm, "heavy hail"],
  get(code: number, time?: Date) {
    const [dayIcon, desc, nightIcon] = this[code as WeatherCode];
    const image =
      !!nightIcon && time && dayNightTime(time) === "night"
        ? nightIcon
        : dayIcon;
    return { image, desc };
  },
} as const;

export type WeatherCode = Exclude<keyof typeof weatherIcons, "get">;
export default weatherIcons;
