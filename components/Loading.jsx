import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="relative w-20 h-20">
        {/* Outer glowing aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FBBF24]/40 via-[#B8860B]/30 to-[#FBBF24]/40 animate-pulse blur-2xl"></div>

        {/* Spinner */}
        <div className="relative animate-spin rounded-full h-20 w-20 border-4 border-t-[#B8860B] border-gray-300"></div>
      </div>
    </div>
  )
}

export default Loading
