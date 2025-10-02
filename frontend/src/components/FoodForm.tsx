import { useState } from "react";
import "./FoodForm.css";

type FormData = { name: string; price: number; imageUrl?: string };

type Props = {
  onAdd: (data: FormData) => void | Promise<void>;
  loading?: boolean; // <-- ADICIONADO
};

export default function FoodForm({ onAdd, loading = false }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [imageUrl, setImageUrl] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || price === "" || Number(price) < 0) return;
    onAdd({ name, price: Number(price), imageUrl: imageUrl || undefined });
    setName("");
    setPrice("");
    setImageUrl("");
  }

  return (
    <form className="food-form" onSubmit={handleSubmit}>
      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Preço"
        inputMode="decimal"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value === "" ? "" : Number(e.target.value))
        }
      />
      <input
        placeholder="URL da imagem"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button className="btn-primary" disabled={loading}>
        {loading ? "Adicionando…" : "Adicionar"}
      </button>
    </form>
  );
}
