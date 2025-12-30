"use client"
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { user, isSeller, router, getCartCount } = useAppContext();
  const { openSignIn } = useClerk();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search box

  const handleSearchClick = (e) => {
    e.stopPropagation(); // Prevent closing when clicking inside the search bar
    setIsSearchOpen(true);
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700" onClick={() => setIsSearchOpen(false)}>
      <Image
        className="cursor-pointer w-16 md:w-20"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/about-us" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact-us" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <div className="relative flex items-center">
          <div
            className={`flex items-center border border-[#fdb242] rounded-full px-4 py-2 transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-12'} overflow-hidden`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the search bar
          >
            <input
              type="text"
              placeholder="Search..."
              className={`flex-grow focus:outline-none ${isSearchOpen ? 'block' : 'hidden'}`}
              onClick={handleSearchClick}
            />
            <Image
              className={`cursor-pointer transition-all duration-300 ${isSearchOpen ? 'w-4 h-4' : 'w-4 h-4'}`}
              src={assets.search_icon}
              alt="search icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
          </div>
        </div>
        {user
          ? <>
<button
  onClick={() => router.push("/cart")}
  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
>
  <div className="relative">
    <CartIcon />

    {getCartCount() > 0 && (
      <span
        className="absolute -top-1.5 -right-1.5
                   bg-[#fdb242]
                   text-white
                   text-[10px] font-semibold
                   w-4 h-4
                   flex items-center justify-center
                   rounded-full
                   leading-none
                   transition-transform duration-200
                   hover:scale-110"
      >
        {getCartCount() > 9 ? "9+" : getCartCount()}
      </span>
    )}
  </div>

  <span>Cart</span>
</button>

            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
              </UserButton.MenuItems>
            </UserButton>
          </>
          : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={() => router.push('/cart')} className="relative">
            <CartIcon />
            {getCartCount() > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 
                   bg-[#fdb242] 
                   text-white 
                   text-[10px] font-semibold 
                   w-4 h-4 
                   flex items-center justify-center 
                   rounded-full 
                   leading-none
                   transition-transform duration-200
                   hover:scale-110"
              >
                {getCartCount() > 9 ? "9+" : getCartCount()}
              </span>
            )}
          </button>
        </div>
        {user
          ? <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
              </UserButton.MenuItems>
            </UserButton>
          </>
          : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>}
      </div>
    </nav>
  );
};

export default Navbar;