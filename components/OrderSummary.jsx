import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const OrderSummary = () => {
  const { currency, router, getCartCount, getCartAmount, getToken, user, cartItems, setCartItems } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [settings, setSettings] = useState({ shippingFee: 0, taxRate: 2, promoCodes: [] });
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

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

  useEffect(() => {
    axios.get("/api/store-settings")
      .then(({ data }) => {
        if (data.success) setSettings(data.settings);
      })
      .catch(() => {});
  }, []);

  const subtotal = getCartAmount();
  const discount = appliedPromo ? Math.floor(subtotal * (appliedPromo.discountPercent / 100)) : 0;
  const taxableAmount = subtotal - discount;
  const tax = Math.floor(taxableAmount * (Number(settings.taxRate || 0) / 100));
  const total = taxableAmount + Number(settings.shippingFee || 0) + tax;
  const totalItems = Object.values(cartItems).reduce((sum, quantity) => sum + (Number(quantity) > 0 ? Number(quantity) : 0), 0);

  const applyPromoCode = () => {
    const normalizedCode = promoCode.trim().toUpperCase();
    const match = settings.promoCodes?.find((promo) => promo.active && promo.code === normalizedCode);
    if (!match) {
      setAppliedPromo(null);
      toast.error("That promo code is not valid");
      return;
    }
    setAppliedPromo(match);
    toast.success(`${match.discountPercent}% discount applied`);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (!selectedAddress) return toast.error("Please select a shipping address");

      if (totalItems > 50) return toast.error("You can place a maximum of 50 items per order");

      let cartItemsArray = Object.keys(cartItems)
        .map((key) => ({ productId: key, quantity: cartItems[key] }))
        .filter((item) => item.quantity > 0);

      if (cartItemsArray.length === 0) return toast.error("Your cart is empty");

      const token = await getToken();
      const { data } = await axios.post(
        "/api/order/create",
        { address: selectedAddress, items: cartItemsArray, promoCode: appliedPromo?.code || "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        router.push("/order-placed");
      } else {
        if (data.unavailableProductIds?.length) {
          const unavailable = new Set(data.unavailableProductIds);
          const availableCartItems = Object.fromEntries(
            Object.entries(cartItems).filter(([productId]) => !unavailable.has(productId))
          );

          setCartItems(availableCartItems);
          await axios.post(
            "/api/cart/update",
            { cartData: availableCartItems },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }

        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full rounded-[2rem] border border-[#f2e1b8] bg-gradient-to-br from-[#fffdf8] via-[#fff8e8] to-[#f7ebd0] p-6 shadow-[0_16px_45px_rgba(184,134,11,0.12)] md:w-96">
      <h2 className="mb-4 text-2xl font-semibold text-[#1E2A38] md:text-3xl">Order Summary</h2>
      <hr className="my-4 border-gray-300/40" />

      {/* Address Section */}
      <div className="space-y-4">
        <label className="block text-gray-600 font-medium uppercase text-sm">Select Address</label>
        <div className="relative w-full">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-[#e7d4aa] bg-white/80 px-4 py-3 text-left transition hover:border-[#B8860B] focus:outline-none"
          >
            {selectedAddress
              ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
              : "Select Address"}
            <span className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}>
              ▼
            </span>
          </button>

          {isDropdownOpen && (
            <ul className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-[#f2e1b8] bg-white/95 py-2 shadow-lg">
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
          <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
            placeholder="Enter promo code"
              className="min-w-0 w-full flex-1 rounded-xl border border-[#e7d4aa] bg-white/80 px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-[#B8860B]"
          />
            <button type="button" onClick={applyPromoCode} className="w-full shrink-0 rounded-xl bg-[#B8860B] px-6 py-3 font-medium text-white transition hover:bg-[#A7780A] sm:w-auto">
            Apply
          </button>
        </div>
        {appliedPromo && <p className="text-sm font-medium text-emerald-700">{appliedPromo.code} applied: {appliedPromo.discountPercent}% off</p>}
      </div>

      <hr className="border-gray-300/40 my-6" />

      {/* Order Totals */}
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600 font-medium">
          <span>Items ({getCartCount()})</span>
          <span>{currency}{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-600 font-medium">
          <span>Shipping Fee</span>
          <span className="text-gray-800 font-semibold">{settings.shippingFee > 0 ? `${currency}${settings.shippingFee}` : "Free"}</span>
        </div>
        <div className="flex justify-between text-gray-600 font-medium">
          <span>Tax ({settings.taxRate}%)</span>
          <span className="text-gray-800 font-semibold">{currency}{tax}</span>
        </div>
        {discount > 0 && <div className="flex justify-between font-medium text-emerald-700"><span>Promo discount</span><span>-{currency}{discount}</span></div>}
        <div className="flex justify-between font-semibold text-lg border-t border-gray-300 pt-3">
          <span>Total</span>
          <span>{currency}{total}</span>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="mt-6 w-full rounded-xl bg-[#B8860B] py-3 font-semibold text-white transition hover:bg-[#A7780A]"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
