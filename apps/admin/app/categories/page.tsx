'use client';

import React, { useState } from 'react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  productsCount: number;
  featured: boolean;
}

const initialCategories: CategoryItem[] = [
  { id: '1', name: 'Kaftans', slug: 'kaftans', productsCount: 14, featured: true },
  { id: '2', name: 'Trouser Sets', slug: 'trouser-sets', productsCount: 8, featured: true },
  { id: '3', name: 'Loungewear', slug: 'loungewear', productsCount: 12, featured: true },
  { id: '4', name: 'Diffusers', slug: 'diffusers', productsCount: 6, featured: false },
  { id: '5', name: 'Cushions', slug: 'cushions', productsCount: 9, featured: false },
  { id: '6', name: 'Jewellery', slug: 'jewellery', productsCount: 16, featured: false }
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [newCatName, setNewCatName] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const slug = newCatName.trim().toLowerCase().replace(/\s+/g, '-');
    const newCat: CategoryItem = {
      id: String(Date.now()),
      name: newCatName.trim(),
      slug,
      productsCount: 0,
      featured: false
    };

    setCategories([...categories, newCat]);
    setNewCatName('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this category?')) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const toggleFeatured = (id: string) => {
    setCategories(
      categories.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-playfair">Categories & Collections</h1>
        <p className="text-xs text-gray-500 font-light mt-0.5">
          Organize storefront catalogue groupings and curate homepage featured collections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Add Category Form */}
        <div className="lg:col-span-4 bg-white p-6 rounded border border-gray-200 shadow-sm h-fit">
          <h3 className="font-playfair text-lg font-bold text-[var(--color-brand-navy)] mb-4">
            Add New Category
          </h3>
          <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Category Title *</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Silk Kimonos, Table Runners"
                className="w-full h-10 border border-gray-300 rounded px-3 text-xs focus:outline-none focus:border-[var(--color-brand-navy)]"
              />
            </div>
            <p className="text-[11px] text-gray-400 font-light">
              Slug will be automatically formatted for SEO routing (e.g., <code>/categories/silk-kimonos</code>).
            </p>
            <button
              type="submit"
              className="w-full py-2.5 bg-[var(--color-brand-navy)] text-white text-xs uppercase tracking-wider font-bold rounded hover:bg-[var(--color-brand-purple)] transition-colors"
            >
              + Create Category
            </button>
          </form>
        </div>

        {/* Right: Category List */}
        <div className="lg:col-span-8 bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5">Category Name</th>
                <th className="px-6 py-3.5">URL Slug</th>
                <th className="px-6 py-3.5">Products Linked</th>
                <th className="px-6 py-3.5">Homepage Featured</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-light">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 text-sm">{cat.name}</td>
                  <td className="px-6 py-4 font-mono text-gray-500">/categories/{cat.slug}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{cat.productsCount} Pieces</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleFeatured(cat.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        cat.featured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {cat.featured ? 'Featured' : 'Standard'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(cat.id)}
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
      </div>
    </div>
  );
}
