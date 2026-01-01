import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <div className="flex flex-col items-center pt-16 px-4 md:px-14">
      {/* SECTION HEADER */}
      <div className="flex flex-col items-center w-full mb-8">
        <p className="text-3xl md:text-4xl font-bold text-[#1E2A38]">
          Popular Products
        </p>
        <div className="w-28 h-1 rounded bg-[#B8860B] mt-2" />
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-10 w-full">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* SEE MORE BUTTON */}
      <button
        onClick={() => router.push("/all-products")}
        className="mt-12 px-12 py-3 rounded-full bg-[#B8860B] text-[#ffffff] font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
      >
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
