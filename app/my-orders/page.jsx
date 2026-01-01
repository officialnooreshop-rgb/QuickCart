'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";

const MyOrders = () => {
  const { currency, getToken, user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/order/user-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setOrders(data.orders.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.delete(`/api/order/delete/${orderToCancel}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success("Order canceled successfully");
        setOrders(orders.filter((order) => order._id !== orderToCancel));
        setShowCancelPopup(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const isCancelable = (orderDate) => {
    const orderTime = new Date(orderDate).getTime();
    return Date.now() - orderTime <= 6 * 60 * 60 * 1000;
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 pb-20 min-h-screen bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">My Orders</h2>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col md:flex-row justify-between p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 gap-4"
              >
                {/* Items */}
                <div className="flex-1 flex gap-4 items-start md:items-center">
                  <div className="flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 p-2">
                    <Image
                      src={assets.box_icon}
                      alt="order_icon"
                      className="w-16 h-16 md:w-20 md:h-20 object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-gray-800">
                      {order.items.map(item => `${item.product.name} x ${item.quantity}`).join(", ")}
                    </p>
                    <span className="text-gray-500 text-sm">Items: {order.items.length}</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex-1 text-gray-700 text-sm md:text-base">
                  {order.address ? (
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{order.address.fullName}</span>
                      <span>{order.address.area}</span>
                      <span>{`${order.address.city}, ${order.address.state}`}</span>
                      <span>{order.address.phoneNumber}</span>
                    </div>
                  ) : (
                    <span className="text-red-500">Address not available</span>
                  )}
                </div>

                {/* Amount */}
                <div className="my-auto text-gray-800 font-medium">
                  {currency}{order.amount}
                </div>

                {/* Payment & Status */}
                <div className="flex flex-col gap-1 my-auto text-gray-600 text-sm md:text-base">
                  <span>Method: COD</span>
                  <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                  <span>Payment: Pending</span>
                  <span>Status: {order.status || "Pending"}</span>

                  {isCancelable(order.date) && (
                    <button
                      onClick={() => {
                        setOrderToCancel(order._id);
                        setShowCancelPopup(true);
                      }}
                      className="mt-2 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}

            {orders.length === 0 && !loading && (
              <p className="text-gray-500 text-center py-10">You have no orders yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Cancel popup */}
      {showCancelPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-sm w-full">
            <p className="text-lg font-medium mb-4">Are you sure you want to cancel this order?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowCancelPopup(false)}
                className="bg-gray-300 px-4 py-2 rounded-full hover:bg-gray-400 transition"
              >
                No
              </button>
              <button
                onClick={handleCancelOrder}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default MyOrders;
