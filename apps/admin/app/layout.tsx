'use client';

import { Inter } from "next/font/google";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Boxes, 
  Users, 
  Tags, 
  TicketPercent, 
  Star, 
  Settings 
} from 'lucide-react';
import "./globals.css";
import Logo from './components/Logo';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Orders', href: '/orders', icon: ShoppingBag },
    { name: 'Inventory', href: '/inventory', icon: Boxes },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Categories', href: '/categories', icon: Tags },
    { name: 'Discounts', href: '/discounts', icon: TicketPercent },
    { name: 'Reviews', href: '/reviews', icon: Star },
    { name: 'Store Settings', href: '/settings', icon: Settings },
  ];

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#F8F9FA] text-[#1E293B] flex h-screen overflow-hidden`}>
        {/* Sidebar */}
        <aside className="w-64 bg-[#0B132B] text-white flex flex-col shrink-0 border-r border-gray-800">
          <div className="h-20 flex items-center px-6 border-b border-gray-800">
            <Logo light />
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 text-xs">
            <div className="px-3 pb-2 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Management Suite
            </div>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded font-medium transition-all ${
                    isActive
                      ? 'bg-[var(--color-brand-purple)] text-white shadow-md font-semibold'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-sm">
                    <item.icon size={18} />
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User profile footer */}
          <div className="p-4 border-t border-gray-800 flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-white">Administrator</p>
              <p className="text-[10px] text-gray-400">admin@ifemi.ng</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" title="Online" />
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Atelier Operations</span>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-semibold text-[var(--color-brand-purple)]">Lagos Head Office</span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 border border-[var(--color-brand-navy)] text-[var(--color-brand-navy)] uppercase tracking-wider font-semibold rounded hover:bg-[var(--color-brand-navy)] hover:text-white transition-colors"
              >
                ↗ View Live Storefront
              </a>
              <div className="w-8 h-8 rounded-full bg-[var(--color-brand-purple)] text-white flex items-center justify-center font-bold text-xs">
                IF
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
