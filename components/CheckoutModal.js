
"use client";
import { X } from "lucide-react";
import { CONFIG, formatPKR } from "@/lib/data";

export default function CheckoutModal({ open, onClose, items }){
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");

  if(!open) return null;

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal >= CONFIG.freeDeliveryThreshold || items.length === 0 ? 0 : CONFIG.deliveryFee;
  const total = subtotal + delivery;

  const text = encodeURIComponent(
`*${CONFIG.brand} – New Order*
Name: ${name}
Phone: ${phone}
Address: ${address}

${items.map(i => `• ${i.title} x${i.qty} — ${formatPKR(i.price*i.qty)}`).join("\n")}

Subtotal: ${formatPKR(subtotal)}
Delivery: ${delivery===0 ? "Free" : formatPKR(delivery)}
*Total: ${formatPKR(total)}*

Payment: Cash on Delivery
— Sent from ${CONFIG.brand} website`
  );

  const waLink = `https://wa.me/${CONFIG.whatsappNumber.replace(/[^\d]/g,"")}?text=${text}`;
  const ready = name.trim() && phone.trim() && address.trim();

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">Enter delivery details</h3>
          <button className="text-white/70 hover:text-white" onClick={onClose}><X className="h-5 w-5"/></button>
        </div>
        <div className="mt-4 grid gap-3">
          <input className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/50" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/50" placeholder="Phone (03xx…)" value={phone} onChange={e=>setPhone(e.target.value)} />
          <textarea className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/50" placeholder="Complete Address (House #, Street, Area, City)" rows={3} value={address} onChange={e=>setAddress(e.target.value)} />
          <a href={ready ? waLink : undefined} target="_blank" rel="noreferrer">
            <button disabled={!ready} className="w-full rounded-xl bg-brand px-3 py-2 text-white hover:opacity-90 disabled:opacity-40">Place Order on WhatsApp</button>
          </a>
          <p className="text-white/50 text-xs">We will confirm your order on WhatsApp and process via Markaz supplier. By ordering, you agree to our policies.</p>
        </div>
      </div>
    </div>
  )
}
