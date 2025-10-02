import { Request, Response } from "express";
import { foods, Food } from "../models/food";

export const getFoods = (req: Request, res: Response) => {
  res.json(foods);
};

export const getFoodById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const food = foods.find(f => f.id === id);
  if (!food) return res.status(404).json({ message: "Alimento não encontrado" });
  res.json(food);
};

export const addFood = (req: Request, res: Response) => {
  const { name, price, imageUrl } = req.body;
  if (!name || price === undefined || !imageUrl) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  const newFood: Food = {
    id: foods.length + 1,
    name,
    price: Number(price),
    imageUrl
  };

  foods.push(newFood);
  res.status(201).json(newFood);
};

export const updateFood = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, price, imageUrl } = req.body;
  const foodIndex = foods.findIndex(f => f.id === id);

  if (foodIndex === -1) {
    return res.status(404).json({ message: "Alimento não encontrado" });
  }

  const updatedFood: Food = {
    ...foods[foodIndex],
    name: name ?? foods[foodIndex].name,
    price: price !== undefined ? Number(price) : foods[foodIndex].price,
    imageUrl: imageUrl ?? foods[foodIndex].imageUrl
  };

  foods[foodIndex] = updatedFood;
  res.json(updatedFood);
};

export const deleteFood = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const foodIndex = foods.findIndex(f => f.id === id);

  if (foodIndex === -1) {
    return res.status(404).json({ message: "Alimento não encontrado" });
  }

  foods.splice(foodIndex, 1);
  res.status(204).send();
};
