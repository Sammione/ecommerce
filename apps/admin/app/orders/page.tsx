'use client';

import React, { useState } from 'react';

interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  destination: string;
  date: string;
  total: number;
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  orderStatus: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'READY_FOR_DELIVERY' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  itemsCount: number;
}

const initialOrders: OrderRecord[] = [
  { id: '1', orderNumber: 'IFEMI-92841', customerName: 'Adaeze Okonkwo', email: 'adaeze@example.com', phone: '+234 803 123 4567', destination: 'Lekki Phase 1, Lagos', date: '2026-08-28', total: 70000, paymentStatus: 'PAID', orderStatus: 'SHIPPED', itemsCount: 2 },
  { id: '2', orderNumber: 'IFEMI-92842', customerName: 'Chidinma Adeleke', email: 'chidinma@example.com', phone: '+234 812 345 6789', destination: 'Maitama, Abuja', date: '2026-08-29', total: 125000, paymentStatus: 'PAID', orderStatus: 'PROCESSING', itemsCount: 3 },
  { id: '3', orderNumber: 'IFEMI-92843', customerName: 'Folake Balogun', email: 'folake@example.com', phone: '+234 802 987 6543', destination: 'GRA Phase 2, Port Harcourt', date: '2026-08-29', total: 45000, paymentStatus: 'PAID', orderStatus: 'CONFIRMED', itemsCount: 1 },
  { id: '4', orderNumber: 'IFEMI-92840', customerName: 'Zainab Dangote', email: 'zainab@example.com', phone: '+234 805 111 2233', destination: 'Victoria Island, Lagos', date: '2026-08-27', total: 180000, paymentStatus: 'PAID', orderStatus: 'DELIVERED', itemsCount: 4 }
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>(initialOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  const handleUpdateStatus = (id: string, newStatus: OrderRecord['orderStatus']) => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, orderStatus: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
    }
  };

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'ALL' && o.orderStatus !== statusFilter) return false;
    if (search && !o.orderNumber.toLowerCase().includes(search.toLowerCase()) && !o.customerName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-playfair">Order Fulfillment</h1>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Track Nigerian and international dispatches, update live courier timelines, and verify payments.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <input
            type="text"
            placeholder="Search by Order ID or Client Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-xs w-full sm:w-72 focus:outline-none focus:border-[var(--color-brand-navy)]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PROCESSING">Processing</option>
            <option value="READY_FOR_DELIVERY">Ready for Delivery</option>
            <option value="SHIPPED">Shipped (In Transit)</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <div className="text-gray-500 font-light">
          Showing <strong>{filtered.length}</strong> Orders
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-6 py-3.5">Order ID</th>
              <th className="px-6 py-3.5">Customer / Contact</th>
              <th className="px-6 py-3.5">Destination</th>
              <th className="px-6 py-3.5">Date</th>
              <th className="px-6 py-3.5">Total Amount</th>
              <th className="px-6 py-3.5">Payment</th>
              <th className="px-6 py-3.5">Delivery Status</th>
              <th className="px-6 py-3.5 text-right">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-light">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-[var(--color-brand-navy)]">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{order.customerName}</div>
                  <div className="text-[10px] text-gray-400">{order.phone}</div>
                </td>
                <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{order.destination}</td>
                <td className="px-6 py-4 text-gray-500">{order.date}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  ₦ {order.total.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded ${
                    order.orderStatus === 'DELIVERED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.orderStatus === 'SHIPPED'
                      ? 'bg-blue-100 text-blue-800'
                      : order.orderStatus === 'PROCESSING'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.orderStatus.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleUpdateStatus(order.id, e.target.value as any)}
                    className="border border-gray-300 rounded px-2 py-1 text-[10px] font-bold bg-white focus:outline-none focus:border-[var(--color-brand-navy)]"
                  >
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="READY_FOR_DELIVERY">Ready for Delivery</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
