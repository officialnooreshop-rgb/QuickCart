'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const OrderPlaced = () => {
  const { router } = useAppContext()
  const [secondsLeft, setSecondsLeft] = useState(5)

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/my-orders')
    }, 5000)

    const countdown = setInterval(() => {
      setSecondsLeft((seconds) => Math.max(seconds - 1, 0))
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(countdown)
    }
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#fffdf8] via-gray-50 to-[#fff7e6] px-6 py-12">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-[#f2e1b8] bg-white p-8 text-center shadow-[0_20px_55px_rgba(184,134,11,0.14)] md:p-12">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#fff2cf]" />
        <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-[#f8f1e4]" />
        <div className="relative">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-emerald-50 shadow-inner md:h-32 md:w-32">
            <Image src={assets.checkmark} alt="order success" className="h-14 w-14 md:h-16 md:w-16" />
          </div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Order confirmed</p>
          <div className="mt-3 text-2xl font-bold text-[#1E2A38] md:text-3xl">Your order is on its way</div>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500 md:text-base">
            Thank you for shopping with us. We have received your order and will keep you updated on its progress.
          </p>
          <button onClick={() => router.push('/my-orders')} className="mt-7 rounded-full bg-[#B8860B] px-8 py-3 font-semibold text-white transition hover:bg-[#A7780A]">
            View My Orders
          </button>
          <p className="mt-4 text-xs text-gray-400">Redirecting in {secondsLeft} seconds</p>
        </div>
      </div>
    </div>
  )
}

export default OrderPlaced
