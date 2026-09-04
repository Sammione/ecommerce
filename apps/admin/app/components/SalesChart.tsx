"use client";

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 6890 },
  { name: 'Sat', sales: 8390 },
  { name: 'Sun', sales: 7490 },
];

export function SalesChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full h-[400px]">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            tickFormatter={(value) => `₦${(value / 1000)}k`} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Sales']}
          />
          <Area 
            type="monotone" 
            dataKey="sales" 
            stroke="#1E3A8A" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorSales)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
