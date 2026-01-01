'use client';
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext();

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 pb-20 bg-gray-50 min-h-screen">
        
        {/* LEFT: Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-300 pb-6">
            <p className="text-2xl md:text-3xl font-semibold text-gray-800">
              Your <span className="text-[#fdb242]">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-500/80">{getCartCount()} Items</p>
          </div>

          <div className="space-y-4">
            {Object.keys(cartItems).map((itemId) => {
              const product = products.find(p => p._id === itemId);
              if (!product || cartItems[itemId] <= 0) return null;

              return (
                <div
                  key={itemId}
                  className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4 w-full md:w-2/3">
                    <div className="rounded-xl overflow-hidden bg-gray-100 p-2">
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
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
                  <p className="text-gray-600 font-medium md:w-20">${product.offerPrice}</p>

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
                  <p className="text-gray-600 font-medium md:w-24 text-right">${(product.offerPrice * cartItems[itemId]).toFixed(2)}</p>
                </div>
              );
            })}
          </div>

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
    </>
  );
};

export default Cart;
