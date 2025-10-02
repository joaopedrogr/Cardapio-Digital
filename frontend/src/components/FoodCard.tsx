import React from "react";
import { Food } from "../types/Food";
import "./FoodCard.css";

interface Props {
  food: Food;
  onDelete: (id: number) => void;
}

const FoodCard: React.FC<Props> = ({ food, onDelete }) => {
  return (
    <div className="food-card">
      <img src={food.imageUrl} alt={food.name} />
      <div>
        <h3>{food.name}</h3>
        <p>R$ {food.price.toFixed(2)}</p>
      </div>
      <button onClick={() => onDelete(food.id)}>Deletar</button>
    </div>
  );
};

export default FoodCard;
