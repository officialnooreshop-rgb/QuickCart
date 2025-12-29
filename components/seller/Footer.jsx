import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-10">
      <div className="flex items-center gap-4">
        <Image className="hidden md:block w-16 h-16" src={assets.logo} alt="logo" />
        <div className="hidden md:block h-5 w-px bg-gray-500/60"></div>
        <p className="py-2 text-center text-xs md:text-xs text-gray-500">
          Copyright 2025 © greatstack.dev All Right Reserved.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <a href="#">
          <Image className="w-5 h-5" src={assets.facebook_icon} alt="facebook_icon" />
        </a>
        <a href="#">
          <Image className="w-5 h-5" src={assets.twitter_icon} alt="twitter_icon" />
        </a>
        <a href="#">
          <Image className="w-5 h-5" src={assets.instagram_icon} alt="instagram_icon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;