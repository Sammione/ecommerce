import ShopClient from './ShopClient';

export const metadata = {
  title: "Shop All Collections — Ifẹ́mi Lifestyle",
  description: "Browse the complete collection of luxury silk kaftans, tailored trouser sets, loungewear, and home diffusers."
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[var(--color-brand-cream)] pt-28 px-4 md:px-12 lg:px-24 pb-24">
      <ShopClient />
    </main>
  );
}
