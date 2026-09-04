import React from 'react';

const mockProducts = [
  { id: 1, name: 'Silk Evening Gown', category: 'Dresses', revenue: 450000, sales: 15, image: 'https://images.unsplash.com/photo-1566160983868-c6d0f8006745?w=150&q=80' },
  { id: 2, name: 'Tailored Linen Suit', category: 'Suits', revenue: 320000, sales: 8, image: 'https://images.unsplash.com/photo-1594938298596-70f56fb3cecb?w=150&q=80' },
  { id: 3, name: 'Leather Crossbody Bag', category: 'Accessories', revenue: 215000, sales: 24, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=150&q=80' },
  { id: 4, name: 'Cashmere Blend Scarf', category: 'Accessories', revenue: 125000, sales: 35, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=150&q=80' },
];

export function TopProducts() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Top Selling Products</h2>
        <a href="/products" className="text-sm font-medium text-[var(--color-brand-purple)] hover:underline">View All</a>
      </div>
      <div className="p-0 flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-100">
          {mockProducts.map((product) => (
            <li key={product.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-xs text-gray-500">{product.category} • {product.sales} sales</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-gray-900">₦{(product.revenue).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
