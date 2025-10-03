import { Request, Response } from "express";
import prisma from "../prismaClient"; 

export const getFoods = async (req: Request, res: Response) => {
  try {
    const foods = await prisma.food.findMany();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar alimentos", error });
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const food = await prisma.food.findUnique({ where: { id } });
    if (!food) return res.status(404).json({ message: "Alimento não encontrado" });
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar alimento", error });
  }
};

export const addFood = async (req: Request, res: Response) => {
  const { name, price, imageUrl } = req.body;
  if (!name || price === undefined || !imageUrl) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const newFood = await prisma.food.create({
      data: {
        name,
        price: Number(price),
        imageUrl
      }
    });
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar alimento", error });
  }
};

export const updateFood = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, price, imageUrl } = req.body;

  try {
    const food = await prisma.food.findUnique({ where: { id } });
    if (!food) return res.status(404).json({ message: "Alimento não encontrado" });

    const updatedFood = await prisma.food.update({
      where: { id },
      data: {
        name: name ?? food.name,
        price: price !== undefined ? Number(price) : food.price,
        imageUrl: imageUrl ?? food.imageUrl
      }
    });

    res.json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar alimento", error });
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const food = await prisma.food.findUnique({ where: { id } });
    if (!food) return res.status(404).json({ message: "Alimento não encontrado" });

    await prisma.food.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar alimento", error });
  }
};
