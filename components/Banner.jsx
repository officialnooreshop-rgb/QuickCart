import React from "react";

const Banner = () => {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fff8e8] via-[#fffdf8] to-[#f6ead0] px-6 py-10 shadow-[0_12px_40px_rgba(184,134,11,0.12)] md:px-10 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(184,134,11,0.12),_transparent_40%)]" />
      <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-[#b8860b]/10 blur-3xl md:h-40 md:w-40" />

      <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="max-w-xl">
          <p className="mb-3 inline-flex rounded-full border border-[#b8860b]/20 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#b8860b]">
            New Season Style
          </p>
          <h2 className="text-3xl font-bold leading-snug text-[#1E2A38] md:text-4xl">
            Level Up Your Wardrobe Today
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
            Discover elegant, comfortable outfits designed to make every day feel polished and effortless.
          </p>
        </div>

        <div className="w-full max-w-sm rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-lg backdrop-blur md:w-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Featured</p>
              <p className="mt-1 text-lg font-semibold text-[#1E2A38]">Premium Edit</p>
            </div>
            <div className="rounded-full bg-[#b8860b] px-3 py-1 text-sm font-semibold text-white">
              Fresh Drop
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {["Elegant", "Comfort", "Style"].map((tag, index) => (
              <div
                key={tag}
                className={`rounded-xl px-2 py-3 text-center text-sm font-semibold text-[#1E2A38] ${index % 2 === 0 ? "bg-[#fff2cf]" : "bg-[#f8f1e4]"}`}
              >
                {tag}
              </div>
            ))}
          </div>

          <button className="mt-4 w-full rounded-full bg-[#B8860B] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.01]">
            Shop Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
