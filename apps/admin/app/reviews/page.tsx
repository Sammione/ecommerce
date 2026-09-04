'use client';

import React, { useState } from 'react';

interface ReviewItem {
  id: string;
  customerName: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const initialReviews: ReviewItem[] = [
  { id: '1', customerName: 'Dr. Amina Bello', productName: 'Midnight Elegance Silk Kaftan', rating: 5, comment: 'The fabric quality is truly exceptional. The drape and gold piping make this piece a showstopper at my event in Abuja.', date: '2026-08-25', status: 'APPROVED' },
  { id: '2', customerName: 'Kemi Adebayo', productName: 'Royal Purple Crepe Trouser Set', rating: 5, comment: 'Flawless tailoring. The waistline and trousers fit perfectly without needing any alterations in Lagos.', date: '2026-08-27', status: 'PENDING' },
  { id: '3', customerName: 'Ngozi Eze', productName: 'Royal Oud & Amber Home Diffuser', rating: 5, comment: 'The scent throw in my living room is intoxicating. Long-lasting and rich.', date: '2026-08-28', status: 'PENDING' },
  { id: '4', customerName: 'Anonymous Buyer', productName: 'Sculptural Brass Statement Earrings', rating: 3, comment: 'Earrings are slightly heavier than expected, but gorgeous design.', date: '2026-08-20', status: 'APPROVED' }
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);

  const handleSetStatus = (id: string, status: ReviewItem['status']) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-playfair">Customer Reviews & Testimonials</h1>
        <p className="text-xs text-gray-500 font-light mt-0.5">
          Moderate client feedback, verify ratings, and publish authentic reviews on product pages.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900 text-sm">{rev.customerName}</span>
                <span className="text-[10px] text-gray-400">• on <strong>{rev.productName}</strong></span>
                <span className="text-amber-500 text-xs tracking-wider">{'★'.repeat(rev.rating)}</span>
              </div>
              <p className="text-xs text-gray-600 font-light italic leading-relaxed">
                “{rev.comment}”
              </p>
              <div className="text-[10px] text-gray-400 font-light">Submitted on {rev.date}</div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded ${
                rev.status === 'APPROVED'
                  ? 'bg-emerald-100 text-emerald-800'
                  : rev.status === 'REJECTED'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {rev.status}
              </span>

              {rev.status !== 'APPROVED' && (
                <button
                  onClick={() => handleSetStatus(rev.id, 'APPROVED')}
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Approve
                </button>
              )}

              {rev.status !== 'REJECTED' && (
                <button
                  onClick={() => handleSetStatus(rev.id, 'REJECTED')}
                  className="px-3 py-1.5 border border-red-300 text-red-600 rounded text-xs font-semibold hover:bg-red-50 transition-colors"
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
