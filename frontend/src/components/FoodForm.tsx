import React, { useState } from "react";
import { Food } from "../types/Food";
import "./FoodForm.css";

interface Props {
  onAdd: (food: Omit<Food, "id">) => void;
}

const FoodForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !imageUrl) return;
    onAdd({ name, price: Number(price), imageUrl });
    setName("");
    setPrice("");
    setImageUrl("");
  };

  return (
    <form className="food-form" onSubmit={handleSubmit}>
      <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Preço" type="number" value={price} onChange={e => setPrice(e.target.value)} />
      <input placeholder="URL da imagem" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default FoodForm;
