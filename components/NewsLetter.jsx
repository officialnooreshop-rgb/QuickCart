import React from "react";

const NewsLetter = () => {
  return (
    <div className="mt-5 flex flex-col items-center justify-center text-center space-y-4 pt-10 pb-16 bg-white/50 backdrop-blur-md rounded-2xl shadow-lg mx-4 md:mx-16">
      <h1 className="md:text-4xl text-2xl font-semibold text-[#1E2A38]">
        Subscribe now to our latest deals!
      </h1>
      <p className="md:text-base text-gray-600/80 max-w-xl">
        Stay updated on the hottest offers and exclusive discounts by subscribing today!
      </p>

      <div className="flex items-center justify-between max-w-2xl w-full h-14 rounded-full overflow-hidden border border-gray-300/30 shadow-sm">
        <input
          className="flex-1 px-6 text-[#1E2A38] placeholder-gray-400 outline-none bg-white/80 backdrop-blur-sm shadow-inner autofill-input"
          type="email"
          placeholder="Enter your email id"
        />
        <button className="px-10 md:px-14 h-full bg-[#B8860B] text-white font-medium hover:bg-[#A7780A] transition-colors duration-300">
          Subscribe
        </button>
      </div>

      <style jsx>{`
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px rgba(255,255,255,0.8) inset !important;
          -webkit-text-fill-color: #1E2A38 !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
};

export default NewsLetter;
