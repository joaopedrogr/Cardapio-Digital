import React from "react";
import { Food } from "../types/Food";

type Props = {
  food: Food;
  onDelete: (id: string) => void; // <-- string
};

const FoodCard: React.FC<Props> = ({ food, onDelete }) => {
  // aceita _id ou id; se nenhum existir, não renderiza botão
  const id = food._id ?? food.id ?? "";

  // garante número para toFixed
  const priceNum = typeof food.price === "number" ? food.price : Number(food.price ?? 0);

  return (
    <div className="food-card">
      <div className="food-body">
        <strong>{food.name}</strong>
        <p>R$ {priceNum.toFixed(2)}</p>
      </div>

      {id && (
        <button onClick={() => onDelete(id)}>
          Deletar
        </button>
      )}
    </div>
  );
};

export default FoodCard;
