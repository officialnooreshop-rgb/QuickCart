import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Explore Our Exclusive Shalwar Kameez For Men!",
      offer: "Limited Time Offer 20% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Discover The Shawl According To Your Style!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Explore Our New Waist coats Collection!",
      offer: "New Arrivals",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
    
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000); // slower for luxury feel
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => setCurrentSlide(index);

  return (
  <div className="relative w-full overflow-hidden mt-2"> {/* 2px gap from navbar */}
      {/* SLIDES */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-14 py-10 bg-gradient-to-r from-[#FAFAFA] via-[#F7F7F7] to-[#FAFAFA] rounded-3xl"
          >
            {/* TEXT */}
            <div className="max-w-lg md:pl-8 text-center md:text-left mt-8 md:mt-0">
              <p className="text-sm md:text-base text-[#B8860B] font-medium tracking-wide mb-2">
                {slide.offer}
              </p>
              <h1 className="text-2xl md:text-5xl font-bold text-[#1E2A38] leading-snug md:leading-tight mb-4">
                {slide.title}
              </h1>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-4 md:mt-6">
                <button className="px-8 py-2 md:px-10 md:py-3 rounded-full bg-[#B8860B] text-[#1E2A38] font-semibold shadow-lg hover:scale-105 transition-transform">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 text-[#1E2A38] font-medium hover:gap-3 transition-all">
                  {slide.buttonText2}
                  <Image
                    src={assets.arrow_icon}
                    alt="arrow"
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center flex-1 mt-6 md:mt-0">
              <div className="relative group">
                <Image
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                  className="w-56 md:w-80 rounded-2xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                {/* GLASS AURA */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-40 transition-opacity"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {sliderData.map((_, index) => (
          <span
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
              currentSlide === index
                ? "bg-[#A78B5B] scale-125"
                : "bg-gray-400/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
