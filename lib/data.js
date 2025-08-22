
export const CONFIG = {
  brand: "ApnaBaazar",
  taglineUrdu: "آپ کا اپنا بازار",
  whatsappNumber: "+923001234567",
  deliveryFee: 200,
  freeDeliveryThreshold: 5000,
  currency: "PKR",
};

export const CATEGORIES = [
  { slug: "gadgets", name: "Gadgets & Electronics" },
  { slug: "islamic", name: "Islamic Products" },
  { slug: "home-kitchen", name: "Household & Kitchen" },
  { slug: "fashion", name: "Fashion & Accessories" }
];

export const PRODUCTS = [
  {
    id: "t500-smartwatch",
    title: "T500 Smart Watch",
    price: 1699, compareAt: 2199, rating: 4.5,
    category: "gadgets",
    img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop",
    badge: "Trending",
    description: "Bluetooth smartwatch with fitness tracking, notifications, and customizable faces."
  },
  {
    id: "i12-earbuds",
    title: "i12 Wireless Earbuds",
    price: 999, compareAt: 1399, rating: 4.2,
    category: "gadgets",
    img: "https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=1200&auto=format&fit=crop",
    badge: "Hot",
    description: "True wireless earbuds with auto-pairing and clear sound."
  },
  {
    id: "digital-tasbeeh",
    title: "Digital Tasbeeh Counter",
    price: 299, compareAt: 450, rating: 4.8,
    category: "islamic",
    img: "https://images.unsplash.com/photo-1603545174870-3f2fbef1d9dc?q=80&w=1200&auto=format&fit=crop",
    badge: "Bestseller",
    description: "Handheld digital counter for daily ibadah."
  },
  {
    id: "quran-speaker",
    title: "Quran Speaker with Remote",
    price: 2499, compareAt: 2999, rating: 4.7,
    category: "islamic",
    img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop",
    badge: "New",
    description: "Portable speaker preloaded with Tilawat and translation; includes remote."
  },
  {
    id: "mini-juicer",
    title: "Portable Mini Juicer",
    price: 1299, compareAt: 1699, rating: 4.1,
    category: "home-kitchen",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31b?q=80&w=1200&auto=format&fit=crop",
    badge: "Saver Deal",
    description: "USB rechargeable juicer for shakes and smoothies on the go."
  },
  {
    id: "water-dispenser",
    title: "Automatic Water Dispenser Pump",
    price: 899, compareAt: 1199, rating: 4.0,
    category: "home-kitchen",
    img: "https://images.unsplash.com/photo-1591369822096-ffd6aeefb8d8?q=80&w=1200&auto=format&fit=crop",
    badge: "Popular",
    description: "One-touch pump for 19L bottles; rechargeable."
  },
  {
    id: "ring-light",
    title: "LED Ring Light 10\"",
    price: 1799, compareAt: 2299, rating: 4.3,
    category: "gadgets",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    badge: "Creator Pick",
    description: "10-inch ring light with adjustable brightness and tripod."
  },
  {
    id: "prayer-mat",
    title: "Prayer Mat with Back Support",
    price: 1499, compareAt: 1899, rating: 4.6,
    category: "islamic",
    img: "https://images.unsplash.com/photo-1581320549334-4f0b3a09c9b6?q=80&w=1200&auto=format&fit=crop",
    badge: "Comfort",
    description: "Thick, supportive prayer mat designed for comfort."
  }
];

export const formatPKR = (n) => new Intl.NumberFormat("en-PK", {
  style: "currency", currency: "PKR", maximumFractionDigits: 0
}).format(n);
