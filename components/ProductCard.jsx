import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
        scrollTo(0, 0);
      }}
      className="flex flex-col items-start gap-2 max-w-[220px] w-full cursor-pointer group"
    >
      {/* IMAGE + GLASS AURA */}
      <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-sm hover:shadow-lg transition-shadow duration-300">
        <Image
          src={product.image[0]}
          alt={product.name}
          className="w-4/5 h-4/5 md:w-full md:h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
          width={800}
          height={800}
        />
        {/* Glass aura on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>

        {/* WISHLIST BUTTON */}
        <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition-transform">
          <Image className="h-4 w-4" src={assets.heart_icon} alt="heart_icon" />
        </button>
      </div>

      {/* PRODUCT NAME */}
      <p className="md:text-base font-semibold text-[#1E2A38] w-full truncate">
        {product.name}
      </p>

      {/* DESCRIPTION */}
      <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
        {product.description}
      </p>

      {/* RATING */}
      <div className="flex items-center gap-1">
        <p className="text-xs text-gray-600">{4.5}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-3 w-3"
              src={index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon}
              alt="star_icon"
            />
          ))}
        </div>
      </div>

      {/* PRICE + BUY BUTTON */}
      <div className="flex items-center justify-between w-full mt-2">
        <p className="text-base font-semibold text-[#000000]">
          {currency}
          {product.offerPrice}
        </p>
        <button className="max-sm:hidden px-4 py-1.5 text-[#000000] border border-[#B8860B]/30 rounded-full text-xs font-medium hover:bg-[#B8860B]/10 transition">
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
