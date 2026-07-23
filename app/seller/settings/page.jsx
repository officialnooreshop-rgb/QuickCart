'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";

const SettingsPage = () => {
  const { getToken, user } = useAppContext();
  const [shippingFee, setShippingFee] = useState(0);
  const [taxRate, setTaxRate] = useState(2);
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const loadSettings = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get("/api/store-settings", { headers: { Authorization: `Bearer ${token}` } });
        if (!data.success) throw new Error(data.message);
        setShippingFee(data.settings.shippingFee ?? 0);
        setTaxRate(data.settings.taxRate ?? 2);
        setPromoCodes(data.settings.promoCodes || []);
      } catch (error) {
        toast.error(error.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, [user]);

  const updatePromo = (index, field, value) => {
    setPromoCodes((current) => current.map((promo, promoIndex) => promoIndex === index ? { ...promo, [field]: value } : promo));
  };

  const saveSettings = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      const token = await getToken();
      const { data } = await axios.patch("/api/store-settings", { shippingFee, taxRate, promoCodes }, { headers: { Authorization: `Bearer ${token}` } });
      if (!data.success) throw new Error(data.message);
      setPromoCodes(data.settings.promoCodes || []);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-[#fffdf8] via-gray-50 to-[#fff7e6] p-4 md:p-10">
      <form onSubmit={saveSettings} className="mx-auto max-w-4xl space-y-8 rounded-[2rem] border border-[#f2e1b8] bg-white p-6 shadow-[0_12px_40px_rgba(184,134,11,0.1)] md:p-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b8860b]">Store Controls</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-500">Control the checkout rules your customers see.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="font-medium text-gray-800">Shipping fee</span>
            <input type="number" min="0" step="0.01" value={shippingFee} onChange={(event) => setShippingFee(event.target.value)} className="rounded-xl border border-gray-300 px-4 py-3 focus:border-[#b8860b] focus:outline-none" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium text-gray-800">Tax rate (%)</span>
            <input type="number" min="0" max="100" step="0.01" value={taxRate} onChange={(event) => setTaxRate(event.target.value)} className="rounded-xl border border-gray-300 px-4 py-3 focus:border-[#b8860b] focus:outline-none" />
          </label>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Promo codes</h2>
              <p className="mt-1 text-sm text-gray-500">Customers can apply these codes in their order summary.</p>
            </div>
            <button type="button" onClick={() => setPromoCodes((current) => [...current, { code: "", discountPercent: 10, active: true }])} className="rounded-full bg-[#fff2cf] px-4 py-2 text-sm font-semibold text-[#8b6500] hover:bg-[#f8e4ad]">Add code</button>
          </div>

          <div className="space-y-3">
            {promoCodes.map((promo, index) => (
              <div key={index} className="grid gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 md:grid-cols-[1fr_150px_auto_auto] md:items-center">
                <input value={promo.code} onChange={(event) => updatePromo(index, "code", event.target.value)} placeholder="WELCOME10" className="rounded-lg border border-gray-300 bg-white px-3 py-2 uppercase focus:border-[#b8860b] focus:outline-none" />
                <input type="number" min="1" max="100" value={promo.discountPercent} onChange={(event) => updatePromo(index, "discountPercent", event.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-[#b8860b] focus:outline-none" />
                <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={promo.active !== false} onChange={(event) => updatePromo(index, "active", event.target.checked)} /> Active</label>
                <button type="button" onClick={() => setPromoCodes((current) => current.filter((_, promoIndex) => promoIndex !== index))} className="text-left text-sm font-semibold text-red-600 hover:text-red-700">Remove</button>
              </div>
            ))}
            {promoCodes.length === 0 && <p className="rounded-2xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">No promo codes yet.</p>}
          </div>
        </div>

        <button type="submit" disabled={saving} className="rounded-full bg-[#B8860B] px-8 py-3 font-semibold text-white transition hover:bg-[#A7780A] disabled:opacity-60">{saving ? "Saving..." : "Save Settings"}</button>
      </form>
    </div>
  );
};

export default SettingsPage;
