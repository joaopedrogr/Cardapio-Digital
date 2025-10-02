import React, { useEffect, useState } from "react";
import { Food } from "./types/Food";
import { getFoods, addFood, deleteFood } from "./api/foodApi";
import FoodCard from "./components/FoodCard";
import FoodForm from "./components/FoodForm";
import "./App.css";

const App: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  const fetchFoods = async () => {
    const res = await getFoods();
    setFoods(res.data);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleAdd = async (food: Omit<Food, "id">) => {
    await addFood(food);
    fetchFoods();
  };

  const handleDelete = async (id: number) => {
    await deleteFood(id);
    fetchFoods();
  };

  return (
    <div className="App">
      <h1>Cardápio</h1>
      <FoodForm onAdd={handleAdd} />
      {foods.map(food => (
        <FoodCard key={food.id} food={food} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default App;
