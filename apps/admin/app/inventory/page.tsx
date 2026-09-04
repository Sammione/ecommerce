'use client';

import React, { useState } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  threshold: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const initialInventory: InventoryItem[] = [
  { id: '1', name: 'Midnight Elegance Silk Kaftan', sku: 'KAFTAN-BLU-001', category: 'Kaftans', stock: 14, threshold: 5, status: 'In Stock' },
  { id: '2', name: 'Royal Purple Crepe Trouser Set', sku: 'TSET-PRP-002', category: 'Trouser Sets', stock: 4, threshold: 5, status: 'Low Stock' },
  { id: '3', name: 'Lavender Whisper Silk Loungewear', sku: 'LNG-LAV-003', category: 'Loungewear', stock: 12, threshold: 5, status: 'In Stock' },
  { id: '4', name: 'Handwoven Artisanal Cushion Set', sku: 'CSH-IVO-004', category: 'Cushions', stock: 20, threshold: 8, status: 'In Stock' },
  { id: '5', name: 'Royal Oud & Amber Home Diffuser', sku: 'DIF-OUD-005', category: 'Diffusers', stock: 2, threshold: 6, status: 'Low Stock' },
  { id: '6', name: 'Sculptural Brass Statement Earrings', sku: 'JWL-BRS-006', category: 'Jewellery', stock: 0, threshold: 4, status: 'Out of Stock' }
];

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(initialInventory);
  const [search, setSearch] = useState('');

  const handleAdjustStock = (id: string, delta: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + delta);
          let newStatus: InventoryItem['status'] = 'In Stock';
          if (newStock === 0) newStatus = 'Out of Stock';
          else if (newStock <= item.threshold) newStatus = 'Low Stock';
          return { ...item, stock: newStock, status: newStatus };
        }
        return item;
      })
    );
  };

  const filtered = items.filter(
    (i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockCount = items.filter((i) => i.stock <= i.threshold).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-playfair">Stock & Inventory Management</h1>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Monitor atelier production, set reorder thresholds, and adjust variant quantities in real-time.
          </p>
        </div>

        {lowStockCount > 0 && (
          <div className="px-4 py-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded flex items-center gap-2">
            <span>⚠️</span>
            <span>{lowStockCount} items require re-tailoring / stock replenishment</span>
          </div>
        )}
      </div>

      {/* Search and stats */}
      <div className="bg-white p-4 rounded border border-gray-200 shadow-sm flex items-center justify-between gap-4 text-xs">
        <input
          type="text"
          placeholder="Filter by product or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-xs w-72 focus:outline-none focus:border-[var(--color-brand-navy)]"
        />
        <div className="text-gray-500 font-light">
          Total Inventory Items: <strong>{items.length}</strong>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-6 py-3.5">Product Name</th>
              <th className="px-6 py-3.5">SKU</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Current Stock</th>
              <th className="px-6 py-3.5">Stock Status</th>
              <th className="px-6 py-3.5 text-right">Quick Adjust</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-light">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                <td className="px-6 py-4 font-mono font-bold text-gray-600">{item.sku}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4 font-bold text-sm text-[var(--color-brand-navy)]">
                  {item.stock} pieces
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'In Stock'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'Low Stock'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleAdjustStock(item.id, -1)}
                    className="px-2.5 py-1 border border-gray-300 rounded font-bold hover:bg-gray-100 text-gray-700"
                    title="Decrease by 1"
                  >
                    −1
                  </button>
                  <button
                    onClick={() => handleAdjustStock(item.id, 5)}
                    className="px-2.5 py-1 bg-[var(--color-brand-navy)] text-white rounded font-bold hover:bg-[var(--color-brand-purple)] transition-colors"
                    title="Restock +5"
                  >
                    +5 Restock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
