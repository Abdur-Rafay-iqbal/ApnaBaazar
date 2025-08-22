
"use client";
import Link from "next/link";
import { ShoppingCart, Store, Phone } from "lucide-react";
import { CONFIG } from "@/lib/data";

export default function Header({ cartCount=0, onCartClick }){
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[var(--darkbg)]/95 backdrop-blur">
      <div className="container py-3 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-brand grid place-items-center">
            <Store className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold text-white text-lg tracking-wide">{CONFIG.brand}</div>
            <div className="text-emerald-300 text-xs">{CONFIG.taglineUrdu}</div>
          </div>
        </Link>

        <nav className="ml-6 hidden md:flex gap-5 text-white/80 text-sm">
          <Link href="/#shop" className="hover:text-white">Shop</Link>
          <Link href="/category/gadgets" className="hover:text-white">Gadgets</Link>
          <Link href="/category/islamic" className="hover:text-white">Islamic</Link>
          <Link href="/category/home-kitchen" className="hover:text-white">Home & Kitchen</Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a className="hidden sm:flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-sm"
             href={`https://wa.me/${CONFIG.whatsappNumber.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer">
            <Phone className="h-4 w-4" /> WhatsApp
          </a>
          <button onClick={onCartClick} className="text-white/80 hover:text-white flex items-center">
            <ShoppingCart className="h-5 w-5" />
            <span className="ml-2 text-sm">Cart ({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  )
}
