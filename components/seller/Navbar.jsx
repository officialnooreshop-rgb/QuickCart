import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {
  const { router } = useAppContext()

  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-white/50 backdrop-blur-md shadow-md rounded-b-xl border-b border-gray-200">
      {/* Logo */}
      <Image
        onClick={() => router.push('/')}
        className="w-16 lg:w-20 cursor-pointer transition-transform hover:scale-105"
        src={assets.logo}
        alt="Logo"
      />

      {/* Logout Button */}
      <button className="bg-[#B8860B] text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-[#A7780A] transition-colors shadow-sm">
        Logout
      </button>
    </div>
  )
}

export default Navbar
