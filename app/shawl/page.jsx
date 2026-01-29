"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const Shawl = () => {
  const { products } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === "Shawl"
    );
    setFilteredProducts(filtered);
  }, [products]);

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 pt-4 pb-20 space-y-6 w-full">
        <p className="text-2xl md:text-3xl font-semibold text-[#1E2A38]">
          Shawl
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="transition-transform duration-300 hover:scale-105">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No products found.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shawl;