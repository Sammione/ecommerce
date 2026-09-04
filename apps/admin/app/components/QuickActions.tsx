import React from 'react';
import { PlusCircle, Tag, ShoppingBag, Users } from 'lucide-react';
import Link from 'next/link';

const actions = [
  { name: 'Add Product', icon: PlusCircle, href: '/products/new', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'New Discount', icon: Tag, href: '/discounts/new', color: 'text-purple-600', bg: 'bg-purple-50' },
  { name: 'Pending Orders', icon: ShoppingBag, href: '/orders?status=pending', color: 'text-amber-600', bg: 'bg-amber-50' },
  { name: 'Customers', icon: Users, href: '/customers', color: 'text-blue-600', bg: 'bg-blue-50' },
];

export function QuickActions() {
  return (
    <div className="flex gap-4">
      {actions.map((action) => (
        <Link 
          key={action.name} 
          href={action.href}
          className="flex-1 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-[var(--color-brand-purple)] hover:shadow-md transition-all group"
        >
          <div className={`p-3 rounded-full mb-3 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
            <action.icon size={24} />
          </div>
          <span className="text-sm font-medium text-gray-700 text-center">{action.name}</span>
        </Link>
      ))}
    </div>
  );
}
