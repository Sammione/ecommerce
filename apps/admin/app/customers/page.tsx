'use client';

import React, { useState } from 'react';

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  tier: 'VIP Platinum' | 'VIP Gold' | 'Client';
  joinedDate: string;
}

const initialCustomers: CustomerRecord[] = [
  { id: '1', name: 'Adaeze Okonkwo', email: 'adaeze@example.com', phone: '+234 803 123 4567', location: 'Lekki Phase 1, Lagos', totalOrders: 5, totalSpent: 345000, tier: 'VIP Platinum', joinedDate: 'Jan 2026' },
  { id: '2', name: 'Chidinma Adeleke', email: 'chidinma@example.com', phone: '+234 812 345 6789', location: 'Maitama, Abuja', totalOrders: 3, totalSpent: 210000, tier: 'VIP Gold', joinedDate: 'Mar 2026' },
  { id: '3', name: 'Folake Balogun', email: 'folake@example.com', phone: '+234 802 987 6543', location: 'GRA, Port Harcourt', totalOrders: 2, totalSpent: 98000, tier: 'Client', joinedDate: 'May 2026' },
  { id: '4', name: 'Zainab Dangote', email: 'zainab@example.com', phone: '+234 805 111 2233', location: 'Victoria Island, Lagos', totalOrders: 7, totalSpent: 520000, tier: 'VIP Platinum', joinedDate: 'Feb 2026' }
];

export default function AdminCustomersPage() {
  const [customers] = useState<CustomerRecord[]>(initialCustomers);
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-playfair">Customer Directory</h1>
        <p className="text-xs text-gray-500 font-light mt-0.5">
          View client profiles, lifetime purchase histories, and WhatsApp contact details.
        </p>
      </div>

      <div className="bg-white p-4 rounded border border-gray-200 shadow-sm flex items-center justify-between gap-4 text-xs">
        <input
          type="text"
          placeholder="Search by client name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-xs w-80 focus:outline-none focus:border-[var(--color-brand-navy)]"
        />
        <div className="text-gray-500 font-light">
          Active Registered Clients: <strong>{customers.length}</strong>
        </div>
      </div>

      <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-6 py-3.5">Client Profile</th>
              <th className="px-6 py-3.5">Contact Details</th>
              <th className="px-6 py-3.5">Primary Location</th>
              <th className="px-6 py-3.5">Tier</th>
              <th className="px-6 py-3.5">Total Orders</th>
              <th className="px-6 py-3.5">Lifetime Spend</th>
              <th className="px-6 py-3.5 text-right">Concierge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-light">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{c.name}</div>
                  <div className="text-[10px] text-gray-400">Client since {c.joinedDate}</div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <div>{c.email}</div>
                  <div className="text-[10px] text-gray-500">{c.phone}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{c.location}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    c.tier === 'VIP Platinum'
                      ? 'bg-purple-100 text-purple-800'
                      : c.tier === 'VIP Gold'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {c.tier}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">{c.totalOrders} Orders</td>
                <td className="px-6 py-4 font-bold text-[var(--color-brand-navy)]">
                  ₦ {c.totalSpent.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-emerald-600 text-white rounded text-[10px] font-semibold hover:bg-emerald-700 transition-colors inline-block"
                  >
                    WhatsApp
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
