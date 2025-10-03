import type { Food } from "../types/Food";

const envApiUrl = (typeof process !== "undefined" && (process as any)?.env?.REACT_APP_API_URL) || "";
const envResource = (typeof process !== "undefined" && (process as any)?.env?.REACT_APP_API_RESOURCE) || "";
const runtimeApiUrl = (typeof window !== "undefined" && (window as any)?.__API_URL__) || "";
const runtimeResource = (typeof window !== "undefined" && (window as any)?.__API_RESOURCE__) || "";
const API_BASE = (envApiUrl || runtimeApiUrl || "").replace(/\/$/, "");
const RESOURCE = (envResource || runtimeResource || "/api/products").startsWith("/")
  ? (envResource || runtimeResource || "/api/products")
  : `/${envResource || runtimeResource || "api/products"}`;

async function fetchJSON<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, { headers: { "Content-Type": "application/json" }, ...init });
  const ct = res.headers.get("content-type") || "";
  if (res.ok && ct.includes("application/json")) return (await res.json()) as T;
  if (res.ok && !ct.includes("application/json")) {
    const text = await res.text();
    try { return JSON.parse(text) as T; } catch { return undefined as unknown as T; }
  }
  let message = `${res.status} ${res.statusText}`;
  try {
    if (ct.includes("application/json")) {
      const j = await res.json();
      message += ` — ${j?.message ?? JSON.stringify(j).slice(0, 200)}`;
    } else {
      const txt = await res.text();
      message += ` — ${txt.slice(0, 200)}`;
    }
  } catch {}
  throw new Error(message);
}

function normalizeFood(obj: any): Food {
  const id = obj?._id ?? obj?.id ?? undefined;
  const rawPrice = obj?.price;
  const priceNum = typeof rawPrice === "number" ? rawPrice : rawPrice != null ? Number(rawPrice) : 0;
  return {
    _id: typeof id === "string" ? id : undefined,
    id: typeof id === "string" ? id : undefined,
    name: obj?.name ?? "",
    price: isNaN(priceNum) ? 0 : priceNum,
    imageUrl: obj?.imageUrl ?? obj?.image_url ?? obj?.image ?? undefined,
    description: obj?.description ?? undefined,
    color: obj?.color ?? undefined,
    weight: obj?.weight ?? undefined,
    type: obj?.type ?? undefined,
    createdAt: obj?.createdAt ?? obj?.created_at ?? undefined,
    updatedAt: obj?.updatedAt ?? obj?.updated_at ?? undefined,
  };
}

export async function getFoods(): Promise<Food[]> {
  const data = await fetchJSON<any[]>(`${API_BASE}${RESOURCE}`);
  return Array.isArray(data) ? data.map(normalizeFood) : [];
}

export type CreateFoodDTO = {
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  color?: string;
  weight?: number;
  type?: string;
};

export async function addFood(body: CreateFoodDTO): Promise<Food> {
  const created = await fetchJSON<any>(`${API_BASE}${RESOURCE}`, { method: "POST", body: JSON.stringify(body) });
  return normalizeFood(created);
}

export async function updateFood(id: string, body: Partial<CreateFoodDTO>): Promise<Food> {
  const updated = await fetchJSON<any>(`${API_BASE}${RESOURCE}/${id}`, { method: "PUT", body: JSON.stringify(body) });
  return normalizeFood(updated);
}

export async function deleteFood(id: string): Promise<{ ok: boolean }> {
  await fetchJSON<void>(`${API_BASE}${RESOURCE}/${id}`, { method: "DELETE" });
  return { ok: true };
}

export const foodApi = { list: getFoods, create: addFood, update: updateFood, remove: deleteFood };
export default foodApi;
