import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Ifẹ́mi Lifestyle — Luxury Nigerian Fashion & Lifestyle",
  description: "Modern African luxury fashion, flowing silk kaftans, tailored trouser sets, diffusers, cushions, and bespoke lifestyle pieces. Handcrafted in Lagos, delivered nationwide and globally.",
  keywords: ["Nigerian fashion", "luxury kaftans", "trouser sets", "Adire", "African luxury brand", "Lagos fashion", "Ifemi lifestyle"],
  openGraph: {
    title: "Ifẹ́mi Lifestyle — Luxury Nigerian Fashion & Lifestyle",
    description: "Modern African luxury fashion, flowing silk kaftans, tailored trouser sets, and bespoke home decor.",
    locale: "en_NG",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col justify-between`}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Navbar />
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
