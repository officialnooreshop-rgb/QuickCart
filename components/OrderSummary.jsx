import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const OrderSummary = () => {
  const { currency, router, getCartCount, getCartAmount, getToken, user, cartItems, setCartItems } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserAddresses(data.addresses);
        if (data.addresses.length > 0) setSelectedAddress(data.addresses[0]);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchUserAddresses();
  }, [user]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (!selectedAddress) return toast.error("Please select a shipping address");

      let cartItemsArray = Object.keys(cartItems)
        .map((key) => ({ productId: key, quantity: cartItems[key] }))
        .filter((item) => item.quantity > 0);

      if (cartItemsArray.length === 0) return toast.error("Your cart is empty");

      const token = await getToken();
      const { data } = await axios.post(
        "/api/order/create",
        { address: selectedAddress, items: cartItemsArray },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        router.push("/order-placed");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full md:w-96 p-6 bg-white/50 backdrop-blur-md rounded-2xl shadow-xl">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#1E2A38] mb-4">Order Summary</h2>
      <hr className="border-gray-300/40 my-4" />

      {/* Address Section */}
      <div className="space-y-4">
        <label className="block text-gray-600 font-medium uppercase text-sm">Select Address</label>
        <div className="relative w-full">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-3 text-left bg-white/60 backdrop-blur-sm rounded-xl border border-gray-300 focus:outline-none flex justify-between items-center hover:border-[#B8860B] transition"
          >
            {selectedAddress
              ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
              : "Select Address"}
            <span className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}>
              ▼
            </span>
          </button>

          {isDropdownOpen && (
            <ul className="absolute w-full bg-white/90 backdrop-blur-md rounded-xl shadow-lg mt-2 py-2 z-20 max-h-60 overflow-auto">
              {userAddresses.map((address, idx) => (
                <li
                  key={idx}
                  onClick={() => handleAddressSelect(address)}
                  className="px-4 py-2 hover:bg-[#B8860B]/10 cursor-pointer transition"
                >
                  {address.fullName}, {address.area}, {address.city}, {address.state}
                </li>
              ))}
              <li
                onClick={() => router.push("/add-address")}
                className="px-4 py-2 hover:bg-[#B8860B]/10 cursor-pointer text-center text-[#B8860B] font-medium transition"
              >
                + Add New Address
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Promo Code */}
      <div className="mt-6 space-y-2">
        <label className="block text-gray-600 font-medium uppercase text-sm">Promo Code</label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#B8860B] bg-white/60 backdrop-blur-sm text-gray-700"
          />
          <button className="px-6 py-3 rounded-xl bg-[#B8860B] text-white font-medium hover:bg-[#A7780A] transition">
            Apply
          </button>
        </div>
      </div>

      <hr className="border-gray-300/40 my-6" />

      {/* Order Totals */}
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600 font-medium">
          <span>Items ({getCartCount()})</span>
          <span>{currency}{getCartAmount()}</span>
        </div>
        <div className="flex justify-between text-gray-600 font-medium">
          <span>Shipping Fee</span>
          <span className="text-gray-800 font-semibold">Free</span>
        </div>
        <div className="flex justify-between text-gray-600 font-medium">
          <span>Tax (2%)</span>
          <span className="text-gray-800 font-semibold">{currency}{Math.floor(getCartAmount() * 0.02)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t border-gray-300 pt-3">
          <span>Total</span>
          <span>{currency}{getCartAmount() + Math.floor(getCartAmount() * 0.02)}</span>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full mt-6 py-3 rounded-xl bg-[#B8860B] text-white font-semibold hover:bg-[#A7780A] transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
