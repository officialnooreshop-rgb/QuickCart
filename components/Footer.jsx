import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-[#f2e1b8] bg-gradient-to-br from-[#fffdf8] to-[#fff7e6]">
      <div className="flex flex-col gap-10 px-6 py-14 text-gray-600 md:flex-row md:items-start md:justify-center md:px-16 lg:px-32">
        <div className="w-full md:w-1/3">
          <Image className="mb-4 w-28 md:w-32" src={assets.logo} alt="logo" />
          <p className="mt-4 text-sm leading-relaxed">
            Our brand blends style and comfort, creating timeless pieces for every occasion. With a focus on quality fabrics, thoughtful design, and effortless elegance, we aim to make fashion that fits your lifestyle and expresses your personality.
          </p>
        </div>

        <div className="flex w-full justify-start md:w-1/3 md:justify-center">
          <div>
            <h2 className="mb-5 font-semibold text-gray-900">Company</h2>
            <ul className="space-y-2 text-sm">
              <li><a className="transition-colors duration-200 hover:text-[#B8860B]" href="#">Home</a></li>
              <li><a className="transition-colors duration-200 hover:text-[#B8860B]" href="/about-us">About us</a></li>
              <li><a className="transition-colors duration-200 hover:text-[#B8860B]" href="/contact-us">Contact us</a></li>
              <li><a className="transition-colors duration-200 hover:text-[#B8860B]" href="/privacy-policy">Privacy policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex w-full justify-start md:w-1/3 md:justify-center">
          <div>
            <h2 className="mb-5 font-semibold text-gray-900">Get in touch</h2>
            <div className="space-y-2 text-sm">
              <p>+92 3368335833</p>
              <p>official.noore.shop@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <p className="py-4 text-center text-xs text-gray-500 md:text-sm">
        Copyright 2025 © Noore.dev All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
