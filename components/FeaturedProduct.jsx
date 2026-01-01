import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Men Shalwar Kameez",
    description:
      "Classic and comfortable men’s shalwar kameez, ideal for casual wear, office, and festive occasions.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Kids Shalwar Kameez",
    description:
      "Comfortable and stylish kids shalwar kameez made with soft, breathable fabric for everyday wear and special occasions.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Women Shalwar Kameez",
    description:
      "Elegant and comfortable women shalwar kameez, perfect for everyday wear and special occasions.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-16">
      {/* HEADER */}
      <div className="flex flex-col items-center">
        <p className="text-3xl md:text-4xl font-bold text-[#1E2A38]">
          Featured Products
        </p>
        <div className="w-28 h-1 rounded bg-[#B8860B] mt-2" />
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div
            key={id}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {/* IMAGE */}
            <Image
              src={image}
              alt={title}
              className="w-full h-96 md:h-[28rem] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
            />

            {/* TEXT OVERLAY (ALWAYS VISIBLE) */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-b-2xl px-4 md:px-6 py-4 md:py-6 flex flex-col gap-2">
              <p className="text-xl md:text-2xl font-semibold text-white">
                {title}
              </p>
              <p className="text-sm md:text-base text-gray-200 leading-snug">
                {description}
              </p>
              <button className="mt-2 flex items-center gap-2 bg-[#B8860B] px-5 py-2 rounded-full font-medium text-[#ffffff] shadow-md hover:scale-105 transition-transform duration-300 w-max">
                Buy now
                <Image
                  src={assets.redirect_icon}
                  alt="Redirect Icon"
                  className="w-3 h-3"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
