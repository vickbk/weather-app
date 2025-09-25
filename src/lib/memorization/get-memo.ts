import CustomGlobals from "../globals/globals";

export default function getMemo() {
  const item = CustomGlobals.get("localStorage")?.getItem("weather-app-memo");
  if (!item)
    return (
      CustomGlobals.get("localStorage").setItem(
        "weather-app-memo",
        JSON.stringify({})
      ),
      {}
    );
  return JSON.parse(item) as Record<string, any>;
}
