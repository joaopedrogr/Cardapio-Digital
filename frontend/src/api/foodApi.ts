import type { Food } from "../types/Food";

const envApiUrl =
  (typeof process !== "undefined" && (process as any)?.env?.REACT_APP_API_URL) || "";
const envResource =
  (typeof process !== "undefined" && (process as any)?.env?.REACT_APP_API_RESOURCE) || "";
const runtimeApiUrl =
  (typeof window !== "undefined" && (window as any)?.__API_URL__) || "";
const runtimeResource =
  (typeof window !== "undefined" && (window as any)?.__API_RESOURCE__) || "";

const API_BASE = (envApiUrl || runtimeApiUrl || "").replace(/\/$/, "");
const RESOURCE = (envResource || runtimeResource || "/api/foods").startsWith("/")
  ? (envResource || runtimeResource || "/api/foods")
  : `/${envResource || runtimeResource || "api/foods"}`;

async function fetchJSON<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  const ct = res.headers.get("content-type") || "";
  if (res.ok && ct.includes("application/json")) return (await res.json()) as T;
  if (res.ok && !ct.includes("application/json")) {
    const text = await res.text();
    try {
      return JSON.parse(text) as T;
    } catch {
      return undefined as unknown as T;
    }
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
  const id = obj?.id ?? obj?._id;
  const priceRaw = obj?.price;
  const name = obj?.name ?? "";
  const imageUrl = obj?.imageUrl ?? undefined;
  const price = typeof priceRaw === "number" ? priceRaw : Number(priceRaw ?? 0);

  return {
    id: typeof id === "string" ? id : undefined,
    name,
    price,
    imageUrl,
    createdAt: obj?.createdAt ?? obj?.created_at,
  };
}

export async function getFoods(): Promise<Food[]> {
  const raw = await fetchJSON<any>(`${API_BASE}${RESOURCE}`);
  const arr = Array.isArray(raw)
    ? raw
    : raw?.products ?? raw?.items ?? raw?.data ?? raw?.result ?? [];
  return Array.isArray(arr) ? arr.map(normalizeFood) : [];
}

export type CreateFoodDTO = {
  name: string;
  price: number;
  imageUrl?: string;
};

export async function addFood(body: CreateFoodDTO): Promise<Food | null> {
  const created = await fetchJSON<any>(`${API_BASE}${RESOURCE}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return created ? normalizeFood(created) : null;
}

export async function updateFood(id: string, body: Partial<CreateFoodDTO>): Promise<Food> {
  const updated = await fetchJSON<any>(`${API_BASE}${RESOURCE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return normalizeFood(updated);
}

export async function deleteFood(id: string): Promise<{ ok: boolean }> {
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
