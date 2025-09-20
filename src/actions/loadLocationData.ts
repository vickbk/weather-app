"use server";

import loadData from "@/lib/load-data";

export default async function loadLocationData() {
  const data = await loadData();
  return data;
}
