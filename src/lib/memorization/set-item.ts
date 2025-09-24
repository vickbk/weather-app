import getMemo from "./get-memo";

export default function setMemoItem(params: string, value: any) {
  const path = params.split(".");
  const memo = getMemo();
  setNested(memo, path, value);
  localStorage.setItem("weather-app-memo", JSON.stringify(memo));
}

function setNested(memo: Record<string, any>, path: string[], value: any) {
  let current = memo;
  for (let i = 0; i < path.length - 1; i++) {
    if (typeof current[path[i]] !== "object" || current[path[i]] === null) {
      current[path[i]] = {};
    }
    current = current[path[i]];
  }
  current[path[path.length - 1]] = value;
}
