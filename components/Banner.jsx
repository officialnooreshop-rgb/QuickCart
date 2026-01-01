import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between py-16 md:py-20 px-6 md:px-20 bg-gradient-to-r from-[#FAFAFA] via-[#F7F7F7] to-[#FAFAFA] rounded-3xl overflow-hidden shadow-lg">
      
      {/* LEFT IMAGE */}
      <div className="flex justify-center md:justify-start w-full md:w-auto mb-6 md:mb-0">
        <div className="relative group">
          <Image
            src={assets.jbl_soundbox_image}
            alt="jbl_soundbox_image"
            className="w-56 md:w-64 transition-transform duration-500 group-hover:scale-105 rounded-2xl drop-shadow-xl"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-40 transition-opacity"></div>
        </div>
      </div>

      {/* CENTER TEXT */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 md:space-y-4 px-4 md:px-0 max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E2A38] leading-snug">
          Level Up Your Clothing Wardrobe Today!
        </h2>
        <p className="text-gray-700/80 md:text-base font-medium leading-relaxed">
          Upgrade your style with our latest collection of stylish and comfortable outfits, perfect for every occasion.
        </p>
        <button className="group flex items-center gap-2 px-12 py-3 rounded-full bg-[#B8860B] text-[#ffffff] font-semibold shadow-lg hover:scale-105 transition-transform">
          Buy now
          <Image
            src={assets.arrow_icon_white}
            alt="arrow_icon"
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex justify-center md:justify-end w-full md:w-auto mt-8 md:mt-0">
        <Image
          src={assets.md_controller_image}
          alt="md_controller_image"
          className="hidden md:block w-64 md:w-72 transition-transform duration-500 group-hover:scale-105 rounded-2xl drop-shadow-xl"
        />
        <Image
          src={assets.sm_controller_image}
          alt="sm_controller_image"
          className="md:hidden w-56 rounded-2xl drop-shadow-xl"
        />
      </div>

      {/* OPTIONAL GLASS OVERLAY */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-t from-white/10 via-white/5 to-transparent"></div>
    </div>
  );
};

export default Banner;
