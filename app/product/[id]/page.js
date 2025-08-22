
"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { PRODUCTS, formatPKR } from "@/lib/data";
import { Star } from "lucide-react";

export default function ProductPage({ params }){
  const [cartOpen, setCartOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const p = PRODUCTS.find(x => x.id === params.id);

  React.useEffect(()=>{
    const saved = localStorage.getItem("apnabaazar_cart");
    if(saved) setItems(JSON.parse(saved));
  },[]);
  React.useEffect(()=>{
    localStorage.setItem("apnabaazar_cart", JSON.stringify(items));
  },[items]);

  const add = (p)=>{
    setItems(prev=>{
      const ex = prev.find(i=>i.id===p.id);
      if(ex) return prev.map(i=>i.id===p.id?{...i, qty:i.qty+1}:i);
      return [...prev, {id:p.id, title:p.title, price:p.price, img:p.img, qty:1}];
    });
    setCartOpen(true);
  };
  const onQty = (id, qty)=> setItems(prev => prev.map(i=>i.id===id?{...i, qty}:i));
  const onRemove = (id)=> setItems(prev => prev.filter(i=>i.id!==id));

  if(!p) return <div className="container py-10 text-white">Product not found.</div>;

  return (
    <div>
      <Header cartCount={items.reduce((s,i)=>s+i.qty,0)} onCartClick={()=>setCartOpen(v=>!v)} />
      <div className="container py-10 grid md:grid-cols-2 gap-8">
        <div>
          <img src={p.img} alt={p.title} className="w-full rounded-2xl object-cover" />
        </div>
        <div className="text-white">
          <h1 className="text-2xl font-bold">{p.title}</h1>
          <div className="mt-2 flex items-center gap-3">
            <div className="text-emerald-300 flex items-center gap-1"><Star className="h-4 w-4 fill-amber-300 text-amber-300" /> {p.rating}</div>
            {p.badge && <span className="badge">{p.badge}</span>}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="text-3xl font-extrabold">{formatPKR(p.price)}</div>
            {p.compareAt && <div className="text-white/50 line-through">{formatPKR(p.compareAt)}</div>}
          </div>
          <p className="mt-4 text-white/80">{p.description}</p>
          <button onClick={()=>add(p)} className="mt-6 rounded-xl bg-brand px-4 py-3 text-white hover:opacity-90">Add to Cart</button>
          <div className="mt-6 text-sm text-white/60">
            <p>• COD Available nationwide</p>
            <p>• Delivery in 3–5 working days</p>
            <p>• 7‑Day Return Policy</p>
          </div>
        </div>
      </div>
      <Footer />
      <CartDrawer open={cartOpen} items={items} onClose={()=>setCartOpen(false)} onQty={onQty} onRemove={onRemove} onCheckout={()=>{ setCartOpen(false); window.location.href='/cart'; }} />
    </div>
  )
}
