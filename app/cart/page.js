
"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutModal from "@/components/CheckoutModal";
import { formatPKR, CONFIG } from "@/lib/data";

export default function CartPage(){
  const [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{
    const saved = localStorage.getItem("apnabaazar_cart");
    if(saved) setItems(JSON.parse(saved));
  },[]);
  React.useEffect(()=>{
    localStorage.setItem("apnabaazar_cart", JSON.stringify(items));
  },[items]);

  const subtotal = items.reduce((s,i)=> s + i.price * i.qty, 0);
  const delivery = subtotal >= CONFIG.freeDeliveryThreshold || items.length===0 ? 0 : CONFIG.deliveryFee;
  const total = subtotal + delivery;

  const setQty = (id, qty)=> setItems(prev => prev.map(i=>i.id===id?{...i, qty}:i));
  const remove = (id)=> setItems(prev => prev.filter(i=>i.id!==id));

  return (
    <div>
      <Header cartCount={items.reduce((s,i)=>s+i.qty,0)} onCartClick={()=>{}} />
      <div className="container py-10">
        <h1 className="text-white text-2xl font-bold">Your Cart</h1>
        {items.length===0 ? (
          <p className="text-white/70 mt-4">Your cart is empty.</p>
        ):(
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2 space-y-3">
              {items.map(i => (
                <div key={i.id} className="flex gap-3 rounded-xl border border-white/10 p-3">
                  <img src={i.img} alt={i.title} className="h-16 w-16 rounded-md object-cover" />
                  <div className="flex-1">
                    <div className="text-white font-medium leading-tight">{i.title}</div>
                    <div className="text-white/70 text-sm">{formatPKR(i.price)}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button className="h-7 w-7 rounded border border-white/20 text-white" onClick={() => setQty(i.id, Math.max(1, i.qty-1))}>-</button>
                      <span className="text-white text-sm w-6 text-center">{i.qty}</span>
                      <button className="h-7 w-7 rounded border border-white/20 text-white" onClick={() => setQty(i.id, i.qty+1)}>+</button>
                      <button className="ml-auto text-red-300 hover:text-red-400" onClick={() => remove(i.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 p-4 text-white/80 text-sm h-fit">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{delivery===0? "Free" : formatPKR(delivery)}</span></div>
              <div className="flex justify-between font-bold text-white mt-1"><span>Total</span><span>{formatPKR(total)}</span></div>
              <button disabled={items.length===0} onClick={()=>setOpen(true)} className="mt-3 w-full rounded-xl bg-brand px-3 py-2 text-white hover:opacity-90 disabled:opacity-40">Checkout via WhatsApp</button>
              <p className="mt-2 text-xs text-white/50">We will confirm on WhatsApp and process via Markaz supplier.</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <CheckoutModal open={open} onClose={()=>setOpen(false)} items={items} />
    </div>
  )
}
