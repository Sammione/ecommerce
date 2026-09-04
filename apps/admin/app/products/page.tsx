'use client';

import React, { useState } from 'react';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number | null;
  sku: string;
  stock: number;
  isPublished: boolean;
  isFeatured: boolean;
  colors: string;
  sizes: string;
}

const initialProducts: ProductItem[] = [
  { id: '1', name: 'Midnight Elegance Silk Kaftan', category: 'Kaftans', price: 45000, sku: 'KAFTAN-BLU-001', stock: 14, isPublished: true, isFeatured: true, colors: 'Midnight Navy, Royal Purple', sizes: 'One Size' },
  { id: '2', name: 'Royal Purple Crepe Trouser Set', category: 'Trouser Sets', price: 65000, salePrice: 58000, sku: 'TSET-PRP-002', stock: 8, isPublished: true, isFeatured: true, colors: 'Royal Purple, Midnight Navy', sizes: 'XS, S, M, L, XL, XXL' },
  { id: '3', name: 'Lavender Whisper Silk Loungewear', category: 'Loungewear', price: 35000, sku: 'LNG-LAV-003', stock: 12, isPublished: true, isFeatured: false, colors: 'Lavender, Cream', sizes: 'S, M, L, XL' },
  { id: '4', name: 'Handwoven Artisanal Cushion Set', category: 'Cushions', price: 18000, salePrice: 15000, sku: 'CSH-IVO-004', stock: 20, isPublished: true, isFeatured: false, colors: 'Warm Cream, Charcoal', sizes: 'Standard' },
  { id: '5', name: 'Royal Oud & Amber Home Diffuser (250ml)', category: 'Diffusers', price: 22000, sku: 'DIF-OUD-005', stock: 25, isPublished: true, isFeatured: true, colors: 'Amber Gold', sizes: '250ml' },
  { id: '6', name: 'Sculptural Brass Statement Earrings', category: 'Jewellery', price: 18500, sku: 'JWL-BRS-006', stock: 16, isPublished: true, isFeatured: false, colors: 'Polished Brass', sizes: 'Standard' }
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  // New Product Form State
  const [form, setForm] = useState({
    name: '',
    category: 'Kaftans',
    price: '',
    salePrice: '',
    sku: '',
    stock: '10',
    colors: 'Midnight Navy, Royal Purple',
    sizes: 'One Size',
    isPublished: true,
    isFeatured: false
  });

  // Automated SKU Generator based on Brief §16
  const generateSKU = (name: string, category: string, color: string) => {
    const catPrefixes: Record<string, string> = {
      Kaftans: 'KAFTAN',
      'Trouser Sets': 'TSET',
      Loungewear: 'LNG',
      Diffusers: 'DIF',
      Cushions: 'CSH',
      Jewellery: 'JWL'
    };
    const prefix = catPrefixes[category] || 'IFEMI';
    const colorCode = color.slice(0, 3).toUpperCase() || 'STD';
    const randomNum = String(products.length + 1).padStart(3, '0');
    return `${prefix}-${colorCode}-${randomNum}`;
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value;
    const isKaftan = newCat === 'Kaftans';
    setForm({
      ...form,
      category: newCat,
      sizes: isKaftan ? 'One Size' : 'XS, S, M, L, XL',
      sku: generateSKU(form.name, newCat, form.colors.split(',')[0] || 'BLU')
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setForm({
      ...form,
      name: newName,
      sku: form.sku || generateSKU(newName, form.category, form.colors.split(',')[0] || 'BLU')
    });
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    const newProduct: ProductItem = {
      id: String(Date.now()),
      name: form.name,
      category: form.category,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : null,
      sku: form.sku || generateSKU(form.name, form.category, 'BLU'),
      stock: Number(form.stock),
      isPublished: form.isPublished,
      isFeatured: form.isFeatured,
      colors: form.colors,
      sizes: form.sizes
    };

    setProducts([newProduct, ...products]);
    setShowModal(false);
    setForm({
      name: '',
      category: 'Kaftans',
      price: '',
      salePrice: '',
      sku: '',
      stock: '10',
      colors: 'Midnight Navy, Royal Purple',
      sizes: 'One Size',
      isPublished: true,
      isFeatured: false
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this piece from catalogue?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const togglePublished = (id: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, isPublished: !p.isPublished } : p))
    );
  };

  const filtered = products.filter((p) => {
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-playfair">Product Catalogue</h1>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Manage your Nigerian fashion pieces, variant stock, and auto-generated SKUs.
          </p>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setForm((prev) => ({ ...prev, sku: generateSKU('New Piece', prev.category, 'BLU') }));
          }}
          className="px-5 py-2.5 bg-[var(--color-brand-navy)] text-white text-xs uppercase tracking-wider font-bold rounded shadow hover:bg-[var(--color-brand-purple)] transition-colors flex items-center gap-2"
        >
          <span>+ Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <input
            type="text"
            placeholder="Search by product title or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-xs w-full sm:w-72 focus:outline-none focus:border-[var(--color-brand-navy)]"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Kaftans">Kaftans</option>
            <option value="Trouser Sets">Trouser Sets</option>
            <option value="Loungewear">Loungewear</option>
            <option value="Diffusers">Diffusers</option>
            <option value="Cushions">Cushions</option>
            <option value="Jewellery">Jewellery</option>
          </select>
        </div>

        <div className="text-gray-500 font-light">
          Showing <strong>{filtered.length}</strong> of {products.length} Products
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-6 py-3.5">Product / Title</th>
              <th className="px-6 py-3.5">SKU</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Price</th>
              <th className="px-6 py-3.5">Stock</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-light">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                  <div className="text-[10px] text-gray-400">
                    Colors: {item.colors} • Sizes: {item.sizes}
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-gray-700">{item.sku}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  ₦ {item.price.toLocaleString()}
                  {item.salePrice && (
                    <span className="text-[10px] text-emerald-600 block">Sale: ₦{item.salePrice.toLocaleString()}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    item.stock <= 5 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.stock} in stock
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => togglePublished(item.id)}
                    className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded ${
                      item.isPublished
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {item.isPublished ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button
                    onClick={() => handleDeleteProduct(item.id)}
                    className="text-red-500 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Product Modal with Automated SKU Generator */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 shadow-2xl border border-gray-200 my-8">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-[var(--color-brand-navy)]">
                  Add New Product
                </h3>
                <p className="text-xs text-gray-400 font-light">Simple upload experience for business management</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-black text-xl">✕</button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Lapis Blue Silk Kaftan"
                  className="w-full h-10 border border-gray-300 rounded px-3 text-xs focus:outline-none focus:border-[var(--color-brand-navy)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={handleCategoryChange}
                    className="w-full h-10 border border-gray-300 rounded px-3 text-xs bg-white"
                  >
                    <option>Kaftans</option>
                    <option>Trouser Sets</option>
                    <option>Loungewear</option>
                    <option>Diffusers</option>
                    <option>Cushions</option>
                    <option>Jewellery</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-gray-700">SKU (Stock Code) *</label>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, sku: generateSKU(form.name, form.category, form.colors) })}
                      className="text-[10px] text-[var(--color-brand-purple)] font-bold hover:underline"
                    >
                      ↻ Auto-Generate
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    placeholder="KAFTAN-BLU-001"
                    className="w-full h-10 border border-gray-300 rounded px-3 font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Price (₦) *</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="45000"
                    className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Sale Price (₦)</label>
                  <input
                    type="number"
                    value={form.salePrice}
                    onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                    placeholder="Optional"
                    className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Initial Stock *</label>
                  <input
                    type="number"
                    required
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Available Colors</label>
                  <input
                    type="text"
                    value={form.colors}
                    onChange={(e) => setForm({ ...form, colors: e.target.value })}
                    placeholder="Midnight Navy, Royal Purple"
                    className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Available Sizes</label>
                  <input
                    type="text"
                    value={form.sizes}
                    onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                    placeholder="One Size or XS, S, M, L"
                    className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    className="w-4 h-4 accent-[var(--color-brand-navy)]"
                  />
                  <span>Publish Immediately to Storefront</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="w-4 h-4 accent-[var(--color-brand-purple)]"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 border border-gray-300 rounded font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[var(--color-brand-navy)] text-white font-bold rounded hover:bg-[var(--color-brand-purple)] transition-colors"
                >
                  Save & Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
