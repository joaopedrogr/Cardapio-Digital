import axios from "axios";
import { Food } from "../types/Food";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getFoods = () => api.get<Food[]>("/");
export const addFood = (food: Omit<Food, "id">) => api.post("/", food);
export const updateFood = (id: number, food: Omit<Food, "id">) => api.put(`/${id}`, food);
export const deleteFood = (id: number) => api.delete(`/${id}`);

