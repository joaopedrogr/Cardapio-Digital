import "./App.css";
import { useEffect, useState } from "react";
import FoodForm from "./components/FoodForm";
import FoodCard from "./components/FoodCard";
import type { Food } from "./types/Food";
import { getFoods, addFood, deleteFood } from "./api/foodApi";
import logo from "./assets/logo-tri-fratelli.png";
import "./components/FoodCard.css";
import "./components/FoodForm.css";

function App() {
  const [items, setItems] = useState<Food[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  async function refreshList() {
    try {
      setLoadingList(true);
      setError(null);
      const data = await getFoods();
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message ?? "Falha ao carregar itens");
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    refreshList();
  }, []);

  async function handleAdd(data: { name: string; price: number; imageUrl?: string }) {
    setAdding(true);
    try {
      const created = await addFood(data);
      if (created) {
        setItems(prev => [created, ...prev]);
        setFlash("Item adicionado!");
        setTimeout(() => setFlash(null), 1800);
      }
    } catch (e: any) {
      setError(e?.message ?? "Falha ao adicionar");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Remover este item?")) return;
    const prev = items;
    setItems(items.filter(i => i.id !== id));
    try {
      await deleteFood(id);
      setFlash("Item removido.");
      setTimeout(() => setFlash(null), 1500);
    } catch {
      setError("Falha ao remover, desfazendo.");
      setItems(prev);
    }
  }

  return (
    <div className="page">
      <header className="hero hero-center">
        <img src={logo} alt="Tri Fratelli Pizza" className="brand-logo" />
        <h1 className="hero-title">Cardápio</h1>
        <p className="hero-subtitle">Cadastre itens de forma simples e rápida</p>
      </header>

      {error && <div className="banner banner-error"><strong>Erro:</strong> {error}</div>}
      {flash && <div className="banner banner-ok">{flash}</div>}

      <section className="panel">
        <div className="panel-inner menu-inner">
          <h2 className="panel-title">Novo item</h2>
          <FoodForm onAdd={handleAdd} loading={adding} />
        </div>
      </section>

      <section className="panel">
        <div className="panel-inner menu-inner">
          <h2 className="panel-title">Itens</h2>
          {loadingList ? (
            <p>Carregando...</p>
          ) : items.length === 0 ? (
            <p className="muted">Nenhum item encontrado.</p>
          ) : (
            <div className="grid">
              {items.map(it => it.id && (
                <FoodCard
                  key={it.id}
                  food={it}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
