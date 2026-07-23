import React from 'react'

const Loading = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FBBF24]/40 via-[#B8860B]/30 to-[#FBBF24]/40 animate-pulse blur-2xl" />
        <div className="relative h-20 w-20 animate-spin rounded-full border-4 border-t-[#B8860B] border-gray-200" />
        <div className="absolute h-12 w-12 rounded-full bg-[#fff7e6]" />
      </div>
    </div>
  )
}

export default Loading
