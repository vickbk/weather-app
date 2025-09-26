export default function getMemo() {
  const item = localStorage.getItem("weather-app-memo");
  if (!item)
    return localStorage.setItem("weather-app-memo", JSON.stringify({})), {};
  return JSON.parse(item) as Record<string, any>;
}
