import React from "react";

const NewsLetter = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center text-center space-y-6 px-4 sm:px-8 py-12 bg-white/70 backdrop-blur-md rounded-3xl shadow-lg max-w-md mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E2A38]">
        Subscribe now to our latest deals!
      </h1>
      <p className="text-sm sm:text-base text-gray-700 max-w-xs sm:max-w-sm">
        Stay updated on the hottest offers and exclusive discounts by subscribing today!
      </p>

      {/* Responsive input + button */}
      <div className="flex flex-col sm:flex-row w-full sm:max-w-md gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
        />
        <button className="w-full sm:w-auto px-6 py-3 bg-[#B8860B] text-white font-medium rounded-full hover:bg-[#A7780A] transition-colors duration-300">
          Subscribe
        </button>
      </div>

      <style jsx>{`
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.7) inset !important;
          -webkit-text-fill-color: #1E2A38 !important;
        }
      `}</style>
    </div>
  );
};

export default NewsLetter;
