"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const KidsShalwarKameez = () => {
  const { products } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === "Kids Shalwar Kameez"
    );
    setFilteredProducts(filtered);
  }, [products]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen w-full bg-gradient-to-br from-[#fffdf8] via-gray-50 to-[#fff7e6] px-6 pb-20 pt-10 md:px-16 md:pt-14 lg:px-32">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b8860b]">Little Styles</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1E2A38] md:text-4xl">Kids Shalwar Kameez</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500">Comfortable, colorful, and made for every memorable moment.</p>
        </div>

        <div className="mt-10 grid w-full grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-7">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="transition-transform duration-300 hover:-translate-y-1">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-[1.5rem] border border-dashed border-[#d9caa6] bg-white/70 p-12 text-center text-gray-500">No products found.</div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default KidsShalwarKameez;