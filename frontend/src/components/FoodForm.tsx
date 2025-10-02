import { useMemo, useState } from "react";
import "./FoodForm.css";

type FormData = { name: string; price: number; imageUrl?: string };

type Props = {
  onAdd: (data: FormData) => void | Promise<void>;
  loading?: boolean;
};

const isValidUrl = (s: string) => {
  if (!s) return true; // url é opcional
  try { new URL(s); return true; } catch { return false; }
};

export default function FoodForm({ onAdd, loading = false }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [imageUrl, setImageUrl] = useState("");

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Informe o nome.";
    if (price === "" || Number(price) <= 0) e.price = "Preço deve ser maior que 0.";
    if (!isValidUrl(imageUrl)) e.imageUrl = "URL inválida.";
    return e;
  }, [name, price, imageUrl]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (Object.keys(errors).length) return;
    onAdd({ name: name.trim(), price: Number(price), imageUrl: imageUrl || undefined });
    setName("");
    setPrice("");
    setImageUrl("");
  }

  return (
    <form className="food-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="hint">{errors.name}</span>}
      </div>

      <div className="field">
        <input
          placeholder="Preço"
          inputMode="decimal"
          value={price}
          onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          aria-invalid={!!errors.price}
        />
        {errors.price && <span className="hint">{errors.price}</span>}
      </div>

      <div className="field with-preview">
        <input
          placeholder="URL da imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          aria-invalid={!!errors.imageUrl}
        />
        {imageUrl && isValidUrl(imageUrl) && (
          <img className="preview" src={imageUrl} alt="Pré-visualização" />
        )}
        {errors.imageUrl && <span className="hint">{errors.imageUrl}</span>}
      </div>

      <button className="btn-primary" disabled={loading || Object.keys(errors).length > 0}>
        {loading ? "Adicionando…" : "Adicionar"}
      </button>
    </form>
  );
}
