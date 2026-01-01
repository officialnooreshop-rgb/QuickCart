'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect } from 'react'

const OrderPlaced = () => {
  const { router } = useAppContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/my-orders')
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6 bg-gray-50 px-4">
      <div className="relative flex justify-center items-center w-28 h-28 md:w-32 md:h-32">
        {/* Spinner */}
        <div className="absolute w-full h-full rounded-full border-4 border-t-green-400 border-gray-200 animate-spin"></div>
        {/* Checkmark */}
        <div className="absolute flex justify-center items-center w-full h-full">
          <Image src={assets.checkmark} alt="order success" className="w-12 h-12 md:w-16 md:h-16" />
        </div>
      </div>
      <div className="text-center text-2xl md:text-3xl font-semibold text-gray-800 animate-fadeIn">
        Order Placed Successfully
      </div>
      <div className="text-center text-gray-500 text-sm md:text-base">
        You will be redirected to your orders page shortly...
      </div>
    </div>
  )
}

export default OrderPlaced
