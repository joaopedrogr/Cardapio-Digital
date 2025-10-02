import "./App.css";
import { useEffect, useMemo, useState } from "react";
import FoodForm from "./components/FoodForm";
import type { Food } from "./types/Food";
import { getFoods, addFood, deleteFood } from "./api/foodApi";

function App() {
  const [items, setItems] = useState<Food[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [adding, setAdding] = useState(false);
  const [q, setQ] = useState("");
  const [error, setError] = useState<string | null>(null);

  const getId = (it: Food) => it._id ?? it.id ?? "";

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  async function handleAdd(data: { name: string; price: number; imageUrl?: string }) {
    setAdding(true);
    try {
      const created = await addFood(data);
      setItems(prev => [created, ...prev]);
    } catch (e: any) {
      alert(e?.message ?? "Falha ao adicionar");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Remover este item?")) return;
    const prev = items;
    setItems(items.filter(i => getId(i) !== id));
    try {
      await deleteFood(id);
    } catch {
      alert("Falha ao remover, desfazendo.");
      setItems(prev);
    }
  }

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(i => i.name?.toLowerCase().includes(s));
  }, [q, items]);

  const subtotal = useMemo(
    () => filtered.reduce((acc, it) => acc + (Number(it.price) || 0), 0),
    [filtered]
  );

  return (
    <div className="page">
      <header className="hero hero-center">
        <h1 className="hero-title">Cardápio</h1>
        <p className="hero-subtitle">Cadastre itens de forma simples e rápida</p>
      </header>

      {error && (
        <div className="banner banner-error">
          <strong>Erro:</strong> {error}
        </div>
      )}

      <section className="panel">
        <div className="panel-inner menu-inner">
          <h2 className="panel-title">Novo item</h2>
          <FoodForm onAdd={handleAdd} loading={adding} />
        </div>
      </section>

      <section className="panel">
        <div className="panel-inner menu-inner">
          <div className="panel-row">
            <h2 className="panel-title">Itens</h2>
            <input
              className="search"
              placeholder="Buscar item…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <span className="muted">
              {filtered.length} itens •{" "}
              {subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>

          {loadingList ? (
            <div className="skeleton-list">
              <div className="skeleton-card" />
              <div className="skeleton-card" />
              <div className="skeleton-card" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="muted">Nenhum item encontrado.</p>
          ) : (
            <div className="grid">
              {filtered.map((it) => {
                const id = getId(it);
                const priceText = Number(it.price || 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });
                return (
                  <article key={id || it.name} className="card">
                    <div className="thumb">
                      <img
                        src={
                          it.imageUrl ||
                          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop"
                        }
                        alt={it.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="body">
                      <strong>{it.name}</strong>
                      <span>{priceText}</span>
                    </div>
                    {id && (
                      <button className="btn-ghost" onClick={() => handleDelete(id)}>
                        Remover
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
