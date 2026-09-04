'use client';

import React, { useState } from 'react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'Ifẹ́mi Lifestyle',
    supportEmail: 'concierge@ifemi.ng',
    supportPhone: '+234 803 123 4567',
    showroomAddress: 'Plot 14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
    lagosDeliveryFee: 3000,
    freeDeliveryThreshold: 100000,
    nationwideDeliveryFee: 6000,
    paystackPublicKey: 'pk_test_a1b2c3d4e5f6789012345678',
    paystackSecretKey: 'sk_test_************************',
    enableTestMode: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-playfair">Store & Platform Settings</h1>
        <p className="text-xs text-gray-500 font-light mt-0.5">
          Configure Nigerian delivery zones, Paystack API credentials, and showroom concierge details.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded flex items-center gap-2">
          <span>✓</span>
          <span>Settings saved and applied successfully across all storefront routes.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        {/* 1. Store Profile */}
        <div className="bg-white p-6 rounded border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-playfair text-lg font-bold text-[var(--color-brand-navy)] border-b pb-2">
            1. Brand & Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Brand Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">WhatsApp Hotline</label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Showroom Address</label>
              <input
                type="text"
                value={settings.showroomAddress}
                onChange={(e) => setSettings({ ...settings, showroomAddress: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
              />
            </div>
          </div>
        </div>

        {/* 2. Delivery Rates */}
        <div className="bg-white p-6 rounded border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-playfair text-lg font-bold text-[var(--color-brand-navy)] border-b pb-2">
            2. Nigerian Delivery Zone Pricing
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Lagos Flat Fee (₦)</label>
              <input
                type="number"
                value={settings.lagosDeliveryFee}
                onChange={(e) => setSettings({ ...settings, lagosDeliveryFee: Number(e.target.value) })}
                className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Free Shipping Threshold (₦)</label>
              <input
                type="number"
                value={settings.freeDeliveryThreshold}
                onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })}
                className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Nationwide Standard Fee (₦)</label>
              <input
                type="number"
                value={settings.nationwideDeliveryFee}
                onChange={(e) => setSettings({ ...settings, nationwideDeliveryFee: Number(e.target.value) })}
                className="w-full h-10 border border-gray-300 rounded px-3 text-xs"
              />
            </div>
          </div>
        </div>

        {/* 3. Paystack Credentials */}
        <div className="bg-white p-6 rounded border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-playfair text-lg font-bold text-[var(--color-brand-navy)] border-b pb-2">
            3. Paystack Payment Gateway Integration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Paystack Public Key</label>
              <input
                type="text"
                value={settings.paystackPublicKey}
                onChange={(e) => setSettings({ ...settings, paystackPublicKey: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded px-3 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Paystack Secret Key</label>
              <input
                type="password"
                value={settings.paystackSecretKey}
                onChange={(e) => setSettings({ ...settings, paystackSecretKey: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded px-3 font-mono text-xs"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 pt-2 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={settings.enableTestMode}
              onChange={(e) => setSettings({ ...settings, enableTestMode: e.target.checked })}
              className="w-4 h-4 accent-[var(--color-brand-navy)]"
            />
            <span>Enable Paystack Sandbox Test Mode</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-[var(--color-brand-navy)] text-white text-xs uppercase tracking-widest font-bold rounded hover:bg-[var(--color-brand-purple)] transition-colors shadow"
          >
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
}
