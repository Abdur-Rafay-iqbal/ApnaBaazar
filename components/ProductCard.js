
"use client";
import Link from "next/link";
import { Star } from "lucide-react";
import { formatPKR } from "@/lib/data";

export default function ProductCard({ p, onAdd }){
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      <div className="relative">
        <img src={p.img} alt={p.title} className="h-48 w-full object-cover" />
        {p.badge && (<span className="badge absolute left-3 top-3">{p.badge}</span>) }
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/product/${p.id}`} className="font-semibold text-white leading-tight hover:underline">{p.title}</Link>
          <div className="flex items-center gap-1 text-amber-300 text-sm">
            <Star className="h-4 w-4 fill-amber-300" /> {p.rating}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="text-white font-bold">{formatPKR(p.price)}</div>
          {p.compareAt && <div className="text-white/50 line-through text-sm">{formatPKR(p.compareAt)}</div>}
        </div>
        <div className="mt-4">
          <button onClick={() => onAdd?.(p)} className="w-full rounded-xl bg-brand px-3 py-2 text-white hover:opacity-90">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
