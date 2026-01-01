import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-white/50 backdrop-blur-md rounded-2xl shadow-inner py-6 px-4 md:px-10 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Copyright */}
        <div className="flex items-center gap-4">
          <Image className="hidden md:block w-16 h-16" src={assets.logo} alt="logo" />
          <div className="hidden md:block h-6 w-px bg-gray-400/50"></div>
          <p className="text-center text-xs md:text-sm text-gray-500">
            Copyright 2025 © greatstack.dev All Rights Reserved
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a href="#" className="hover:scale-110 transition-transform duration-200">
            <Image className="w-5 h-5" src={assets.facebook_icon} alt="facebook_icon" />
          </a>
          <a href="#" className="hover:scale-110 transition-transform duration-200">
            <Image className="w-5 h-5" src={assets.twitter_icon} alt="twitter_icon" />
          </a>
          <a href="#" className="hover:scale-110 transition-transform duration-200">
            <Image className="w-5 h-5" src={assets.instagram_icon} alt="instagram_icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
