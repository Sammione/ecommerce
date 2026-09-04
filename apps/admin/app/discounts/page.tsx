'use client';

import React, { useState } from 'react';

interface PromoCode {
  id: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  minOrder: number;
  usedCount: number;
  maxUses: number;
  active: boolean;
}

const initialPromos: PromoCode[] = [
  { id: '1', code: 'WELCOME10', type: 'PERCENTAGE', value: 10, minOrder: 0, usedCount: 42, maxUses: 500, active: true },
  { id: '2', code: 'IFEMI20', type: 'PERCENTAGE', value: 20, minOrder: 100000, usedCount: 18, maxUses: 50, active: true },
  { id: '3', code: 'VIP5000', type: 'FIXED', value: 5000, minOrder: 50000, usedCount: 9, maxUses: 100, active: false }
];

export default function AdminDiscountsPage() {
  const [promos, setPromos] = useState<PromoCode[]>(initialPromos);
  const [newCode, setNewCode] = useState('');
  const [newType, setNewType] = useState<'PERCENTAGE' | 'FIXED'>('PERCENTAGE');
  const [newValue, setNewValue] = useState('15');
  const [newMinOrder, setNewMinOrder] = useState('0');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const promo: PromoCode = {
      id: String(Date.now()),
      code: newCode.trim().toUpperCase(),
      type: newType,
      value: Number(newValue),
      minOrder: Number(newMinOrder),
      usedCount: 0,
      maxUses: 100,
      active: true
    };

    setPromos([promo, ...promos]);
    setNewCode('');
  };

  const toggleActive = (id: string) => {
    setPromos(
      promos.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-playfair">Promotions & Discount Codes</h1>
        <p className="text-xs text-gray-500 font-light mt-0.5">
          Generate promotional coupon vouchers, set minimum order values, and track real-time redemption metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Create Form */}
        <div className="lg:col-span-4 bg-white p-6 rounded border border-gray-200 shadow-sm h-fit">
          <h3 className="font-playfair text-lg font-bold text-[var(--color-brand-navy)] mb-4">
            Create Promo Code
          </h3>
          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="e.g. LAGOSVIP15"
                className="w-full h-10 border border-gray-300 rounded px-3 text-xs uppercase font-mono font-bold focus:outline-none focus:border-[var(--color-brand-navy)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Discount Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full h-10 border border-gray-300 rounded px-3 text-xs bg-white"
                >
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FIXED">Fixed Amount (₦)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Value ({newType === 'PERCENTAGE' ? '%' : '₦'}) *</label>
                <input
                  type="number"
                  required
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Min Order Value (₦)</label>
              <input
                type="number"
                value={newMinOrder}
                onChange={(e) => setNewMinOrder(e.target.value)}
                placeholder="0"
                className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[var(--color-brand-navy)] text-white text-xs uppercase tracking-wider font-bold rounded hover:bg-[var(--color-brand-purple)] transition-colors"
            >
              + Activate Promo Code
            </button>
          </form>
        </div>

        {/* Right: Table */}
        <div className="lg:col-span-8 bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5">Promo Code</th>
                <th className="px-6 py-3.5">Discount Rate</th>
                <th className="px-6 py-3.5">Min Order</th>
                <th className="px-6 py-3.5">Redemptions</th>
                <th className="px-6 py-3.5 text-right">Status / Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-light">
              {promos.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-sm text-[var(--color-brand-navy)]">{p.code}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {p.type === 'PERCENTAGE' ? `${p.value}% OFF` : `₦${p.value.toLocaleString()} OFF`}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {p.minOrder > 0 ? `₦${p.minOrder.toLocaleString()}` : 'No Minimum'}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">{p.usedCount} / {p.maxUses}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => toggleActive(p.id)}
                      className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded ${
                        p.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {p.active ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
