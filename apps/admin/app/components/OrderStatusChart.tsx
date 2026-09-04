"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Delivered', value: 85, color: '#10B981' }, // emerald-500
  { name: 'Pending', value: 42, color: '#F59E0B' },  // amber-500
  { name: 'Cancelled', value: 15, color: '#EF4444' }, // red-500
];

export function OrderStatusChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full h-[400px]">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
