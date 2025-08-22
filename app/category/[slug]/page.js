
"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import { PRODUCTS, CATEGORIES } from "@/lib/data";

export default function CategoryPage({ params }){
  const [cartOpen, setCartOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [sort, setSort] = React.useState("popularity");
  const slug = params.slug;
  const cat = CATEGORIES.find(c=>c.slug===slug);

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

  let list = PRODUCTS.filter(p => p.category===slug);
  switch (sort){
    case "price-asc": list=[...list].sort((a,b)=>a.price-b.price); break;
    case "price-desc": list=[...list].sort((a,b)=>b.price-a.price); break;
    case "rating": list=[...list].sort((a,b)=>b.rating-a.rating); break;
    default: break;
  }

  return (
    <div>
      <Header cartCount={items.reduce((s,i)=>s+i.qty,0)} onCartClick={()=>setCartOpen(v=>!v)} />
      <div className="container py-10">
        <h1 className="text-white text-2xl font-bold">{cat?.name || 'Category'}</h1>
        <div className="mt-4">
          <select value={sort} onChange={e=>setSort(e.target.value)} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white">
            <option value="popularity" className="bg-slate-900">Sort: Popularity</option>
            <option value="price-asc" className="bg-slate-900">Sort: Price Low → High</option>
            <option value="price-desc" className="bg-slate-900">Sort: Price High → Low</option>
            <option value="rating" className="bg-slate-900">Sort: Rating</option>
          </select>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {list.map(p => <ProductCard key={p.id} p={p} onAdd={onAdd} />)}
        </div>
      </div>
      <Footer />
      <CartDrawer open={cartOpen} items={items} onClose={()=>setCartOpen(false)} onQty={onQty} onRemove={onRemove} onCheckout={()=>{ setCartOpen(false); window.location.href='/cart'; }} />
    </div>
  )
}
