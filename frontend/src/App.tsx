import "./App.css";
import { useEffect, useMemo, useState } from "react";
import FoodForm from "./components/FoodForm";
import type { Food } from "./types/Food";
import { getFoods, addFood, deleteFood } from "./api/foodApi";
import logo from "./assets/logo-tri-fratelli.png";

function App() {
  const [items, setItems] = useState<Food[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [adding, setAdding] = useState(false);
  const [q, setQ] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<"name_asc" | "price_asc" | "price_desc">("name_asc");
  const [cat, setCat] = useState<string>("__all__");
  const [flash, setFlash] = useState<string | null>(null);

  const getId = (it: Food) => it._id ?? it.id ?? "";

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

  useEffect(() => { refreshList(); }, []);

  async function handleAdd(data: { name: string; price: number; imageUrl?: string }) {
    setAdding(true);
    try {
      const created = await addFood(data);
      if (created && created.name) {
        setItems(prev => [created, ...prev]);
      } else {
        await refreshList();
      }
      setFlash("Item adicionado!");
      setTimeout(() => setFlash(null), 1800);
    } catch (e: any) {
      setError(e?.message ?? "Falha ao adicionar");
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
      setFlash("Item removido.");
      setTimeout(() => setFlash(null), 1500);
    } catch {
      setError("Falha ao remover, desfazendo.");
      setItems(prev);
    }
  }

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach(i => i.type && set.add(i.type));
    return Array.from(set).sort((a,b)=>a.localeCompare(b));
  }, [items]);

  const filtered = useMemo(() => {
    let list = items;
    if (cat !== "__all__") list = list.filter(i => (i.type ?? "") === cat);
    const s = q.trim().toLowerCase();
    if (s) list = list.filter(i => i.name?.toLowerCase().includes(s));
    switch (sort) {
      case "price_asc":  list = [...list].sort((a,b)=>(Number(a.price)||0)-(Number(b.price)||0)); break;
      case "price_desc": list = [...list].sort((a,b)=>(Number(b.price)||0)-(Number(a.price)||0)); break;
      default:           list = [...list].sort((a,b)=> (a.name||"").localeCompare(b.name||""));
    }
    return list;
  }, [items, q, cat, sort]);

  const subtotal = useMemo(
    () => filtered.reduce((acc, it) => acc + (Number(it.price) || 0), 0),
    [filtered]
  );

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
          <div className="toolbar">
            <h2 className="panel-title">Itens</h2>
            <div className="toolbar-row">
              <select className="select" value={cat} onChange={(e)=>setCat(e.target.value)}>
                <option value="__all__">Todas as categorias</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className="select" value={sort} onChange={(e)=>setSort(e.target.value as any)}>
                <option value="name_asc">Nome A–Z</option>
                <option value="price_asc">Preço ↑</option>
                <option value="price_desc">Preço ↓</option>
              </select>
              <input className="search" placeholder="Buscar item…" value={q} onChange={(e)=>setQ(e.target.value)} />
            </div>
            <span className="muted">
              {filtered.length} itens • {subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>

          {loadingList ? (
            <div className="skeleton-list"><div className="skeleton-card"/><div className="skeleton-card"/><div className="skeleton-card"/></div>
          ) : filtered.length === 0 ? (
            <p className="muted">Nenhum item encontrado.</p>
          ) : (
            <div className="grid">
              {filtered.map(it => {
                const id = getId(it);
                const priceText = Number(it.price || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                return (
                  <article key={id || it.name} className="card">
                    <div className="thumb">
                      <img src={it.imageUrl || "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop"} alt={it.name} loading="lazy" />
                    </div>
                    <div className="body">
                      <strong>{it.name}</strong>
                      <span>{priceText}</span>
                    </div>
                    {id && <button className="btn-ghost" onClick={()=>handleDelete(id)}>Remover</button>}
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
