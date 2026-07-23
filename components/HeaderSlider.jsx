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
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Discover The Shawl According To Your Style!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Explore Our New Waist coats Collection!",
      offer: "New Arrivals",
      buttonText1: "Order Now",
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

  const handleSlideClick = (id) => {
    if (id === 1) {
      window.location.href = "/shalwar-kameez?page=1&category=Men%20Shalwar%20Kameez";
    } else if (id === 2) {
      window.location.href = "/shawl";
    } else if (id === 3) {
      window.location.href = "/waist-coat";
    }
  };

  return (
    <div className="relative mt-2 w-full overflow-hidden rounded-[2rem] border border-[#f2e1b8] bg-gradient-to-br from-[#fff8e8] via-[#fffdf8] to-[#f6ead0] shadow-[0_12px_40px_rgba(184,134,11,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(184,134,11,0.12),_transparent_35%)]" />

      <div
        className="relative flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full flex flex-col-reverse items-center justify-between px-6 py-10 md:flex-row md:px-14 md:py-12"
          >
            <div className="mt-8 max-w-lg text-center md:mt-0 md:pl-8 md:text-left">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#B8860B] md:text-base">
                {slide.offer}
              </p>
              <h1 className="text-2xl font-bold leading-snug text-[#1E2A38] md:text-5xl md:leading-tight">
                {slide.title}
              </h1>
              <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:items-start md:mt-6">
                <button
                  onClick={() => handleSlideClick(slide.id)}
                  className="rounded-full bg-[#B8860B] px-8 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_8px_20px_rgba(184,134,11,0.25)] md:px-10"
                >
                  {slide.buttonText1}
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-1 justify-center md:mt-0">
              <div className="group relative">
                <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-white/20 via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
                <Image
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                  className="w-56 rounded-[1.5rem] drop-shadow-[0_20px_40px_rgba(0,0,0,0.16)] transition-transform duration-500 group-hover:scale-105 md:w-80"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3">
        {sliderData.map((_, index) => (
          <span
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 w-3 cursor-pointer rounded-full transition-all ${
              currentSlide === index
                ? "scale-125 bg-[#A78B5B]"
                : "bg-gray-400/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
