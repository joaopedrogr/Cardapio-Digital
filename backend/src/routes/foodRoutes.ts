import { Router, Request, Response } from "express";
import { foods, Food } from "../models/food";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json(foods);
});

router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const food = foods.find((f: Food) => f.id === id);
  if (!food) return res.status(404).json({ message: "Alimento não encontrado" });
  res.json(food);
});

router.post("/", (req: Request, res: Response) => {
  const { name, price, imageUrl } = req.body;
  if (!name || price === undefined || !imageUrl) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  const newFood: Food = {
    id: foods.length + 1,
    name,
    price: Number(price),
    imageUrl,
  };
  foods.push(newFood);
  res.status(201).json(newFood);
});

router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, price, imageUrl } = req.body;
  const foodIndex = foods.findIndex((f: Food) => f.id === id);

  if (foodIndex === -1) return res.status(404).json({ message: "Alimento não encontrado" });

  const updatedFood: Food = {
    ...foods[foodIndex],
    name: name ?? foods[foodIndex].name,
    price: price !== undefined ? Number(price) : foods[foodIndex].price,
    imageUrl: imageUrl ?? foods[foodIndex].imageUrl,
  };

  foods[foodIndex] = updatedFood;
  res.json(updatedFood);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const foodIndex = foods.findIndex((f: Food) => f.id === id);

  if (foodIndex === -1) return res.status(404).json({ message: "Alimento não encontrado" });

  foods.splice(foodIndex, 1);
  res.status(204).send();
});

export default router;
