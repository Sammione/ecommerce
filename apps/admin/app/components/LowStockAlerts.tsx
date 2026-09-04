import React from 'react';
import { AlertTriangle } from 'lucide-react';

const mockAlerts = [
  { id: 1, name: 'Velvet Midi Skirt (Black, M)', stock: 2, status: 'Critical' },
  { id: 2, name: 'Oxford Cotton Shirt (White, L)', stock: 5, status: 'Low' },
  { id: 3, name: 'Silk Scarf (Floral)', stock: 8, status: 'Low' },
];

export function LowStockAlerts() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-200 bg-red-50/50 flex justify-between items-center">
        <div className="flex items-center gap-2 text-red-700">
          <AlertTriangle size={18} className="text-red-600" />
          <h2 className="text-lg font-medium">Low Stock Alerts</h2>
        </div>
      </div>
      <div className="p-0 flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-100">
          {mockAlerts.map((item) => (
            <li key={item.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-xs text-gray-500">Only {item.stock} left in stock</p>
              </div>
              <div className="shrink-0">
                <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                  item.status === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-center">
         <a href="/inventory" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
           Manage Inventory &rarr;
         </a>
      </div>
    </div>
  );
}
