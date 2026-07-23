'use client';
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {
  const { currency, products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#fffdf8] via-gray-50 to-[#fff7e6] px-6 pb-20 pt-10 md:px-16 md:pt-14 lg:px-32">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b8860b]">Your Selection</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1E2A38] md:text-4xl">Shopping Cart</h1>
            <p className="mt-2 text-sm text-gray-500">Review your pieces before you make them yours.</p>
          </div>
          <div className="w-fit rounded-full border border-[#f2e1b8] bg-white px-4 py-2 text-sm font-semibold text-[#8b6500] shadow-sm">
            {getCartCount()} {getCartCount() === 1 ? "item" : "items"}
          </div>
        </div>

      <div className="flex flex-col gap-10 md:flex-row">
        
        {/* LEFT: Cart Items */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between border-b border-[#eadfca] pb-5">
            <p className="text-lg font-semibold text-gray-800">Selected items</p>
            <p className="text-sm text-gray-500">Ready when you are</p>
          </div>

          <div className="space-y-4">
            {Object.keys(cartItems).map((itemId) => {
              const product = products.find(p => p._id === itemId);
              if (!product || cartItems[itemId] <= 0) return null;

              return (
                <div
                  key={itemId}
                  className="flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-[#f2e1b8] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(184,134,11,0.12)] md:flex-row"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4 w-full md:w-2/3">
                    <div className="h-20 w-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#fff2cf] to-gray-100 p-2 md:h-24 md:w-28">
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        className="h-full w-full scale-125 rounded-lg object-cover transition-transform duration-300 md:scale-110"
                        width={1280}
                        height={720}
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <button
                        onClick={() => updateCartQuantity(product._id, 0)}
                        className="text-xs text-[#fdb242] mt-1 hover:underline transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-gray-600 font-medium md:w-20">{currency}{product.offerPrice}</p>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 border rounded-full px-3 py-1 bg-white shadow-sm">
                    <button onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)} className="hover:bg-gray-100 rounded-full p-1 transition">
                      <Image src={assets.decrease_arrow} alt="decrease" className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={cartItems[itemId]}
                      onChange={e => updateCartQuantity(product._id, Number(e.target.value))}
                      className="w-12 text-center outline-none text-gray-700"
                    />
                    <button onClick={() => addToCart(product._id)} className="hover:bg-gray-100 rounded-full p-1 transition">
                      <Image src={assets.increase_arrow} alt="increase" className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="text-gray-600 font-medium md:w-24 text-right">{currency}{(product.offerPrice * cartItems[itemId]).toFixed(2)}</p>
                </div>
              );
            })}
          </div>

          {getCartCount() === 0 && (
            <div className="rounded-[1.5rem] border border-dashed border-[#d9caa6] bg-white/70 p-10 text-center">
              <p className="text-lg font-semibold text-[#1E2A38]">Your cart is waiting for something special.</p>
              <p className="mt-2 text-sm text-gray-500">Explore the collection and find your next favorite piece.</p>
            </div>
          )}

          {/* Continue Shopping */}
          <button
            onClick={() => router.push('/all-products')}
            className="mt-6 inline-flex items-center gap-2 text-[#fdb242] font-medium hover:gap-3 transition-all"
          >
            <Image
              className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
              src={assets.arrow_right_icon_colored}
              alt="arrow_right"
            />
            Continue Shopping
          </button>
        </div>

        {/* RIGHT: Order Summary */}
          <OrderSummary />
        </div>
        </div>
    </>
  );
};

export default Cart;
