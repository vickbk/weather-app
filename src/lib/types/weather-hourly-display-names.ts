const weatherHourlyDisplayName = {
  temperature_2m: "temp",
  wind_speed_10m: "wind",
  relative_humidity_2m: "humidity",
  apparent_temperature: "ambientTemp",
  precipitation_probability: "precipitationProb",
  precipitation: "precipitation",
  rain: "rain",
  wind_speed_80m: "wind80",
  wind_speed_120m: "wind120",
  wind_speed_180m: "wind180",
  get(name: string): string {
    return name in this && name !== "get"
      ? this[name as Exclude<keyof typeof weatherHourlyDisplayName, "get">]
      : name;
  },
};

export default weatherHourlyDisplayName;
