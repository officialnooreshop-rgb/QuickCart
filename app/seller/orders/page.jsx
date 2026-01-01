'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, getToken, user } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/order/seller-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setOrders(data.orders);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user) fetchSellerOrders();
  }, [user]);

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between bg-gray-50">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h2>
          <div className="max-w-5xl space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg transition"
              >
                {/* Items */}
                <div className="flex-1 flex gap-4 max-w-80">
                  <Image
                    className="w-16 h-16 object-cover rounded-lg"
                    src={assets.box_icon}
                    alt="box_icon"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-gray-800">
                      {order.items.map(item => `${item.product.name} x ${item.quantity}`).join(", ")}
                    </span>
                    <span className="text-gray-500">Items: {order.items.length}</span>
                  </div>
                </div>

                {/* Address */}
                <div className="text-gray-700 text-sm">
                  {order.address ? (
                    <>
                      <p className="font-medium">{order.address.fullName}</p>
                      <p>{order.address.area}</p>
                      <p>{`${order.address.city}, ${order.address.state}`}</p>
                      <p>{order.address.phoneNumber}</p>
                    </>
                  ) : (
                    <p className="text-red-500">Address not available</p>
                  )}
                </div>

                {/* Amount */}
                <p className="font-semibold text-gray-800 my-auto">
                  {currency}{order.amount}
                </p>

                {/* Payment & Date */}
                <div className="flex flex-col text-gray-700 text-sm my-auto">
                  <span>Method: COD</span>
                  <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                  <span>Payment: Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Orders;
