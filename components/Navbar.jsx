"use client";
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { user, isSeller, router, getCartCount } = useAppContext();
  const { openSignIn } = useClerk();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 transition-all">
      
      {/* LOGO */}
      <Image
        className="cursor-pointer w-16 md:w-20 hover:scale-105 transition-transform"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      {/* DESKTOP LINKS */}
      <div className="hidden lg:flex items-center gap-8 text-[#1E2A38] font-medium relative">
        {["Home", "Shop", "About Us", "Contact"].map((link, idx) => (
          <Link
            key={idx}
            href={
              link === "Home"
                ? "/"
                : link === "Shop"
                ? "/all-products"
                : link === "About Us"
                ? "/about-us"
                : "/contact-us"
            }
            className="relative group hover:text-[#B8860B] transition-colors"
          >
            {link}
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#B8860B] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border border-grey-600 text-[#1E2A38] px-4 py-1.5 rounded-full hover:bg-[#B8860B]/10 transition"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* CART + USER DESKTOP */}
      <div className="hidden md:flex items-center gap-4 relative">
        {/* Cart */}
        <button
          onClick={() => router.push("/cart")}
          className="relative flex items-center gap-1 text-gray-700 hover:text-[#B8860B] transition transform hover:-translate-y-1"
        >
          <CartIcon className="w-6 h-6" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#B8860B] text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full leading-none animate-bounce">
              {getCartCount() > 9 ? "9+" : getCartCount()}
            </span>
          )}
        </button>

        {/* User */}
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Home"
                labelIcon={<HomeIcon />}
                onClick={() => router.push("/")}
              />
              <UserButton.Action
                label="Products"
                labelIcon={<BoxIcon />}
                onClick={() => router.push("/all-products")}
              />
              <UserButton.Action
                label="My Orders"
                labelIcon={<BagIcon />}
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 text-gray-700 hover:text-[#B8860B] transition transform hover:-translate-y-1"
          >
            <Image src={assets.user_icon} alt="user icon" className="w-6 h-6" />
            Account
          </button>
        )}
      </div>

      {/* MOBILE MENU */}
      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full hover:bg-[#B8860B]/10 transition"
          >
            Seller Dashboard
          </button>
        )}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/cart")}
            className="relative"
          >
            <CartIcon />
            {getCartCount() > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#B8860B] text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full leading-none transition-transform duration-200 hover:scale-110">
                {getCartCount() > 9 ? "9+" : getCartCount()}
              </span>
            )}
          </button>

          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Home"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push("/")}
                />
                <UserButton.Action
                  label="Products"
                  labelIcon={<BoxIcon />}
                  onClick={() => router.push("/all-products")}
                />
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 hover:text-[#B8860B] transition"
            >
              <Image src={assets.user_icon} alt="user icon" className="w-6 h-6" />
              Account
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
