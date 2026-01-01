import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white/70 backdrop-blur-md">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-600">
        
        {/* Logo + Description */}
        <div className="w-full md:w-1/3">
          <Image className="w-28 md:w-32 mb-4" src={assets.logo} alt="logo" />
          <p className="mt-4 text-sm leading-relaxed">
            Our brand blends style and comfort, creating timeless pieces for every occasion. With a focus on quality fabrics, thoughtful design, and effortless elegance, we aim to make fashion that fits your lifestyle and expresses your personality.
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full md:w-1/3 flex justify-start md:justify-center">
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:text-[#B8860B] transition-colors duration-200" href="#">Home</a>
              </li>
              <li>
                <a className="hover:text-[#B8860B] transition-colors duration-200" href="/about-us">About us</a>
              </li>
              <li>
                <a className="hover:text-[#B8860B] transition-colors duration-200" href="/contact-us">Contact us</a>
              </li>
              <li>
                <a className="hover:text-[#B8860B] transition-colors duration-200" href="/privacy-policy">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/3 flex justify-start md:justify-center">
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p> +92 3368335833</p>
              <p> official.noore.shop@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <p className="py-4 text-center text-xs md:text-sm text-gray-500">
        Copyright 2025 © Noore.dev All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
