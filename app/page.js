
"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import { CONFIG, PRODUCTS, CATEGORIES } from "@/lib/data";
import { Filter, CheckCircle2 } from "lucide-react";

export default function HomePage(){
  const [cartOpen, setCartOpen] = React.useState(false);
  const [checkoutOpen, setCheckoutOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [cat, setCat] = React.useState("all");
  const [sort, setSort] = React.useState("popularity");

  React.useEffect(()=>{
    const saved = localStorage.getItem("apnabaazar_cart");
    if(saved) setItems(JSON.parse(saved));
  },[]);
  React.useEffect(()=>{
    localStorage.setItem("apnabaazar_cart", JSON.stringify(items));
  },[items]);

  const onAdd = (p)=>{
    setItems(prev=>{
      const ex = prev.find(i=>i.id===p.id);
      if(ex) return prev.map(i=>i.id===p.id?{...i, qty:i.qty+1}:i);
      return [...prev, {id:p.id, title:p.title, price:p.price, img:p.img, qty:1}];
    });
    setCartOpen(true);
  };
  const onQty = (id, qty)=> setItems(prev => prev.map(i=>i.id===id?{...i, qty}:i));
  const onRemove = (id)=> setItems(prev => prev.filter(i=>i.id!==id));

  let list = PRODUCTS.filter(p => (cat==="all" || p.category===cat) && (search.trim()==="" || p.title.toLowerCase().includes(search.toLowerCase())));
  switch (sort){
    case "price-asc": list=[...list].sort((a,b)=>a.price-b.price); break;
    case "price-desc": list=[...list].sort((a,b)=>b.price-a.price); break;
    case "rating": list=[...list].sort((a,b)=>b.rating-a.rating); break;
    default: break;
  }

  return (
    <div>
      <Header cartCount={items.reduce((s,i)=>s+i.qty,0)} onCartClick={()=>setCartOpen(v=>!v)} />

      <section className="relative overflow-hidden bg-[var(--darkbg)]">
        <div className="container py-14 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              Your one‑stop store for <span className="text-emerald-400">trending</span> gadgets & Islamic essentials.
            </h1>
            <p className="mt-3 text-white/70 max-w-prose">
              Cash on Delivery across Pakistan. Curated from trusted Markaz suppliers. Easy returns and responsive WhatsApp support.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#shop"><button className="rounded-xl bg-brand px-3 py-2 text-white">Shop Now</button></a>
              <a href={`https://wa.me/${CONFIG.whatsappNumber.replace(/[^\d]/g,"")}`} target="_blank" rel="noreferrer"><button className="rounded-xl border border-brand px-3 py-2 text-emerald-300 hover:bg-emerald-500/10">WhatsApp</button></a>
            </div>
            <div className="mt-6 flex gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/> COD Available</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/> 3–5 Day Delivery</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/> 7‑Day Return</div>
            </div>
          </div>
          <div className="md:justify-self-end">
            <div className="aspect-[4/3] w-full max-w-md rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-400 p-1">
              <div className="h-full w-full rounded-2xl bg-[url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>

      <div id="shop" className="container">
        <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-white font-bold text-2xl flex items-center gap-2"><Filter className="h-5 w-5 text-emerald-400" /> Shop Products</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/50" placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)} />
            <select value={cat} onChange={e=>setCat(e.target.value)} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white">
              <option value="all" className="bg-slate-900">All</option>
              {CATEGORIES.map(c => <option key={c.slug} value={c.slug} className="bg-slate-900">{c.name}</option>)}
            </select>
            <select value={sort} onChange={e=>setSort(e.target.value)} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white">
              <option value="popularity" className="bg-slate-900">Sort: Popularity</option>
              <option value="price-asc" className="bg-slate-900">Sort: Price Low → High</option>
              <option value="price-desc" className="bg-slate-900">Sort: Price High → Low</option>
              <option value="rating" className="bg-slate-900">Sort: Rating</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {list.map(p => <ProductCard key={p.id} p={p} onAdd={onAdd} />)}
        </div>
      </div>

      <Footer />

      <CartDrawer
        open={cartOpen}
        items={items}
        onClose={()=>setCartOpen(false)}
        onQty={onQty}
        onRemove={onRemove}
        onCheckout={()=>{ setCartOpen(false); window.location.href='/cart'; }}
      />
    </div>
  )
}
