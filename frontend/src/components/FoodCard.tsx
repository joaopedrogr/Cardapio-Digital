import React from "react";
import { Food } from "../types/Food";

type Props = {
  food: Food;
  onDelete: (id: string) => void;
};

const FoodCard: React.FC<Props> = ({ food, onDelete }) => {
  const id = food.id ?? "";
  const priceNum = typeof food.price === "number" ? food.price : Number(food.price ?? 0);

  return (
    <div className="food-card">
      <div className="food-body">
        <strong>{food.name}</strong>
        <p>R$ {priceNum.toFixed(2)}</p>
      </div>
      {id && (
        <button onClick={() => onDelete(id)}>Deletar</button>
      )}
    </div>
  );
};

export default FoodCard;
