import "./App.css";
import { useState } from "react";
import FoodForm from "./components/FoodForm";

export default function App() {
  const [adding, setAdding] = useState(false);

  async function handleAdd(data: { name: string; price: number; imageUrl?: string }) {
    try {
      setAdding(true);
      console.log("Novo item:", data);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <h1 className="hero-title">Cardápio</h1>
        <p className="hero-subtitle">Cadastre itens de forma simples e rápida</p>
      </header>

      <section className="panel">
        <h2 className="panel-title">Novo item</h2>
        <FoodForm onAdd={handleAdd} loading={adding} />
      </section>
    </div>
  );
}
