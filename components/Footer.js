
import { CONFIG } from "@/lib/data";

export default function Footer(){
  return (
    <footer className="mt-14 border-t border-white/10 bg-[var(--darkbg)]">
      <div className="container py-8 grid gap-6 md:grid-cols-3 text-white/70 text-sm">
        <div>
          <div className="text-white font-bold text-lg">{CONFIG.brand}</div>
          <div className="text-emerald-300 text-xs mt-1">{CONFIG.taglineUrdu}</div>
          <p className="mt-3 max-w-sm">Essentials delivered across Pakistan. Curated from trusted Markaz partners. COD available.</p>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Customer Care</div>
          <ul className="space-y-1">
            <li>WhatsApp: {CONFIG.whatsappNumber}</li>
            <li>Email: support@apnabaazar.pk</li>
            <li>Shipping: 3–5 working days</li>
            <li>Returns: 7 days (unused, original packaging)</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text白 mb-2"></div>
          <div className="font-semibold text-white mb-2">Policies</div>
          <ul className="space-y-1">
            <li>Privacy Policy</li>
            <li>Return & Refund Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-white/50 text-xs pb-6">© {new Date().getFullYear()} {CONFIG.brand}. All rights reserved.</div>
    </footer>
  )
}
