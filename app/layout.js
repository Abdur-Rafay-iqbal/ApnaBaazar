
import "./../styles/globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "ApnaBaazar – Online Shopping in Pakistan | COD",
  description: "Trending gadgets, Islamic products, and home essentials. Cash on Delivery nationwide."
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
