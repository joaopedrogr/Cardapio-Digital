import { useState } from "react";
import "./FoodForm.css";

type Props = { 
  onAdd: (data: { name: string; price: number; imageUrl?: string }) => void;
  loading?: boolean;
};

export default function FoodForm({ onAdd, loading }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !price) return;
    onAdd({ name, price, imageUrl: imageUrl || undefined });
    setName(""); setPrice(0); setImageUrl("");
  }

  return (
    <form onSubmit={handleSubmit} className="food-form">
      <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required />
      <input type="number" placeholder="Preço" value={price} onChange={e => setPrice(Number(e.target.value))} required />
      <input placeholder="URL da imagem" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
      <button type="submit" disabled={loading}>Adicionar</button>
    </form>
  );
}
