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
    link: "/shalwar-kameez",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Kids Shalwar Kameez",
    description:
      "Comfortable and stylish kids shalwar kameez made with soft, breathable fabric for everyday wear and special occasions.",
    link: "/kids-shalwar-kameez",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Women Shalwar Kameez",
    description:
      "Elegant and comfortable women shalwar kameez, perfect for everyday wear and special occasions.",
    link: "/women-shalwar-kameez",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-16 rounded-[2rem] border border-[#f2e1b8] bg-gradient-to-br from-[#fffdf8] via-[#fff8e8] to-[#f9f1dc] px-4 py-10 shadow-[0_12px_40px_rgba(184,134,11,0.08)] sm:px-6 md:px-10 lg:px-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold tracking-tight text-[#1E2A38] md:text-4xl">
          Featured Products
        </p>
        <div className="mt-2 h-1 w-28 rounded bg-[#B8860B]" />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {products.map(({ id, image, title, description, link }) => (
          <div
            key={id}
            className="group relative cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/70 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
          >
            <Image
              src={image}
              alt={title}
              className="h-96 w-full rounded-[1.5rem] object-cover transition-transform duration-500 group-hover:scale-105 md:h-[28rem]"
            />

            <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 flex w-full flex-col gap-2 rounded-b-[1.5rem] px-4 py-5 md:px-6 md:py-6">
              <p className="text-xl font-semibold text-white md:text-2xl">{title}</p>
              <p className="text-sm leading-snug text-gray-200 md:text-base">{description}</p>
              <button
                onClick={() => (window.location.href = link)}
                className="mt-2 flex w-max items-center gap-2 rounded-full bg-[#B8860B] px-5 py-2 font-medium text-white shadow-md transition-transform duration-300 hover:scale-105"
              >
                Buy now
                <Image src={assets.redirect_icon} alt="Redirect Icon" className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
