
"use client";
import { X, Trash2 } from "lucide-react";
import { formatPKR, CONFIG } from "@/lib/data";

export default function CartDrawer({ open, items, onClose, onQty, onRemove, onCheckout }){
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal >= CONFIG.freeDeliveryThreshold || items.length === 0 ? 0 : CONFIG.deliveryFee;
  const total = subtotal + delivery;

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-slate-900 shadow-xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-bold text-lg">Your Cart</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white"><X className="h-5 w-5"/></button>
        </div>
        <div className="p-4 grid gap-3 overflow-y-auto max-h-[65vh]">
          {items.length === 0 && <div className="text-white/60">Your cart is empty.</div>}
          {items.map((i) => (
            <div key={i.id} className="flex gap-3 rounded-xl border border-white/10 p-3">
              <img src={i.img} alt={i.title} className="h-16 w-16 rounded-md object-cover" />
              <div className="flex-1">
                <div className="text-white font-medium leading-tight">{i.title}</div>
                <div className="text-white/70 text-sm">{formatPKR(i.price)}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button className="h-7 w-7 rounded border border-white/20 text-white" onClick={() => onQty(i.id, Math.max(1, i.qty-1))}>-</button>
                  <span className="text-white text-sm w-6 text-center">{i.qty}</span>
                  <button className="h-7 w-7 rounded border border-white/20 text-white" onClick={() => onQty(i.id, i.qty+1)}>+</button>
                  <button className="ml-auto text-red-300 hover:text-red-400" onClick={() => onRemove(i.id)}><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="space-y-1 text-white/80 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{delivery === 0 ? "Free" : formatPKR(delivery)}</span></div>
            <div className="flex justify-between font-bold text-white"><span>Total</span><span>{formatPKR(total)}</span></div>
          </div>
          <button disabled={items.length===0} onClick={onCheckout} className="mt-3 w-full rounded-xl bg-brand px-3 py-2 text-white hover:opacity-90 disabled:opacity-40">Checkout</button>
          <p className="mt-2 text-xs text-white/50">COD available. You will checkout via WhatsApp with order details.</p>
        </div>
      </aside>
    </div>
  )
}
