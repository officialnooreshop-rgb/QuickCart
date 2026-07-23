'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";

const categories = [
  "Featured Products",
  "Men Shalwar Kameez",
  "Women Shalwar Kameez",
  "Kids Shalwar Kameez",
  "Waist Coat",
  "Shawl",
];

const EditProduct = () => {
  const { id } = useParams();
  const { getToken, router, user } = useAppContext();
  const [product, setProduct] = useState(null);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", category: categories[0], price: "", offerPrice: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || !id) return;

    const loadProduct = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get("/api/product/seller-list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const found = data.products?.find((item) => item._id === id);
        if (!found) {
          toast.error("Product not found");
          router.push("/seller/product-list");
          return;
        }
        setProduct(found);
        setForm({
          name: found.name || "",
          description: found.description || "",
          category: found.category || categories[0],
          price: found.price ?? "",
          offerPrice: found.offerPrice ?? "",
        });
      } catch (error) {
        toast.error(error.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [user, id]);

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const saveProduct = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      const token = await getToken();
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      files.forEach((file) => formData.append("images", file));

      const { data } = await axios.patch(`/api/product/update/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!data.success) throw new Error(data.message);
      toast.success(data.message);
      router.push("/seller/product-list");
    } catch (error) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-4 md:p-8">
      <form onSubmit={saveProduct} className="mx-auto max-w-3xl space-y-6 rounded-[2rem] border border-[#f2e1b8] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] md:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#b8860b]">Product Editor</p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-800">Edit product</h1>
        </div>

        <div>
          <p className="mb-2 text-lg font-medium">Product Images</p>
          <p className="mb-3 text-sm text-gray-500">Choose new images only if you want to replace the current gallery.</p>
          <div className="flex flex-wrap gap-4">
            {[0, 1, 2, 3].map((index) => (
              <label key={index} htmlFor={`edit-image-${index}`} className="relative h-24 w-24 cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gray-300 hover:border-[#d4af37]">
                <input
                  id={`edit-image-${index}`}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => {
                    const nextFiles = [...files];
                    nextFiles[index] = event.target.files?.[0];
                    setFiles(nextFiles.filter(Boolean));
                  }}
                />
                <Image
                  src={files[index] ? URL.createObjectURL(files[index]) : product?.image?.[index] || assets.upload_area}
                  alt="product preview"
                  fill
                  className="object-cover"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="font-medium">Product Name</span>
            <input value={form.name} onChange={(event) => updateField("name", event.target.value)} required className="rounded-lg border border-gray-300 px-3 py-3 focus:border-[#b8860b] focus:outline-none" />
          </label>
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="font-medium">Description</span>
            <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} required rows={5} className="resize-none rounded-lg border border-gray-300 px-3 py-3 focus:border-[#b8860b] focus:outline-none" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium">Category</span>
            <select value={form.category} onChange={(event) => updateField("category", event.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-3 focus:border-[#b8860b] focus:outline-none">
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium">Product Price</span>
            <input type="number" min="0" value={form.price} onChange={(event) => updateField("price", event.target.value)} required className="rounded-lg border border-gray-300 px-3 py-3 focus:border-[#b8860b] focus:outline-none" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium">Offer Price</span>
            <input type="number" min="0" value={form.offerPrice} onChange={(event) => updateField("offerPrice", event.target.value)} required className="rounded-lg border border-gray-300 px-3 py-3 focus:border-[#b8860b] focus:outline-none" />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={saving} className="rounded-full bg-[#B8860B] px-8 py-3 font-semibold text-white transition hover:bg-[#A7780A] disabled:opacity-60">
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={() => router.push("/seller/product-list")} className="rounded-full border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
