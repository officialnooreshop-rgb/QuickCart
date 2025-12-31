"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { getToken } = useAppContext();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Earphone");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);

    files.forEach((file) => formData.append("images", file));

    try {
      const token = await getToken();
      const response = await axios.post("/api/product/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFiles([]);
        setName("");
        setDescription("");
        setCategory("Earphone");
        setPrice("");
        setOfferPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col bg-gray-50 p-4 md:p-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-lg space-y-6"
      >
        {/* Image Upload */}
        <div>
          <p className="text-lg font-medium mb-2">Product Images</p>
          <div className="flex flex-wrap gap-4">
            {[...Array(4)].map((_, index) => (
              <label
                key={index}
                htmlFor={`image${index}`}
                className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#d4af37] transition"
              >
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                />
                <Image
                  src={
                    files[index] ? URL.createObjectURL(files[index]) : assets.upload_area
                  }
                  alt="product"
                  fill
                  className="object-cover rounded-xl"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Type here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] resize-none"
          />
        </div>

        {/* Category & Pricing */}
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-2 w-36">
            <label className="text-lg font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            >
              <option value="Earphone">Featured Products</option>
              <option value="Headphone">Men Shalwar Kameez</option>
              <option value="Watch">Women Shalwar Kameez</option>
              <option value="Smartphone">Kids Shalwar Kameez</option>
              <option value="Laptop">Waist Coat</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 w-36">
            <label className="text-lg font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="px-3 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>

          <div className="flex flex-col gap-2 w-36">
            <label className="text-lg font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
              className="px-3 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-40 px-6 py-3 bg-[#d4af37] text-black font-semibold rounded-full hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
