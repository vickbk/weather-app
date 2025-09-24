import getMemo from "./get-memo";

export default function getMemoItem(params: string) {
  const path = params.split(".");
  return getNested(getMemo(), path);
}

function getNested(obj: Record<string, any>, path: string[]) {
  return path.reduce((o, p) => (o ? o[p] : undefined), obj);
}
