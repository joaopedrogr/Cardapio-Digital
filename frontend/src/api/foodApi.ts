import type { Food } from "../types/Food";

const API_BASE = process.env.REACT_APP_API_BASE!;
const RESOURCE = "/api/foods";

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (res.ok) {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return (await res.json()) as T;
    return undefined as unknown as T;
  } else {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} — ${text}`);
  }
}

function normalizeFood(obj: any): Food {
  return {
    id: obj?.id,
    name: obj?.name ?? "",
    price: Number(obj?.price ?? 0),
    imageUrl: obj?.imageUrl,
    createdAt: obj?.createdAt ?? obj?.created_at,
  };
}

export async function getFoods(): Promise<Food[]> {
  const raw = await fetchJSON<any>(`${API_BASE}${RESOURCE}`);
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeFood);
}

export type CreateFoodDTO = {
  name: string;
  price: number;
  imageUrl?: string;
};

export async function addFood(body: CreateFoodDTO): Promise<Food> {
  const created = await fetchJSON<any>(`${API_BASE}${RESOURCE}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return normalizeFood(created);
}

export async function updateFood(id: number | string, body: Partial<CreateFoodDTO>): Promise<Food> {
  const updated = await fetchJSON<any>(`${API_BASE}${RESOURCE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return normalizeFood(updated);
}

export async function deleteFood(id: number | string): Promise<{ ok: boolean }> {
  await fetchJSON<void>(`${API_BASE}${RESOURCE}/${id}`, { method: "DELETE" });
  return { ok: true };
}

export const foodApi = {
  list: getFoods,
  create: addFood,
  update: updateFood,
  remove: deleteFood,
};

export default foodApi;
