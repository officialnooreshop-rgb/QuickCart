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
  const [updatingId, setUpdatingId] = useState(null);

  const fetchSellerOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/order/seller-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setOrders([...data.orders].sort((first, second) => new Date(second.date) - new Date(first.date)));
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      const token = await getToken();
      const { data } = await axios.patch('/api/order/status', { orderId, status }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setOrders(prev => prev.map(order => order._id === orderId ? { ...order, status } : order));
        toast.success('Order status updated');
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    if (user) fetchSellerOrders();
  }, [user]);

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-between bg-gradient-to-br from-[#fffdf8] via-gray-50 to-[#fff7e6]">
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6 p-4 md:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b8860b]">Store Operations</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">Orders</h2>
              <p className="mt-2 text-sm text-gray-500">Manage fulfillment from one focused view.</p>
            </div>
            <div className="w-fit rounded-2xl border border-[#f2e1b8] bg-white px-5 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Total orders</p>
              <p className="mt-1 text-2xl font-bold text-[#1E2A38]">{orders.length}</p>
            </div>
          </div>
          <div className="max-w-6xl space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col gap-5 rounded-[1.5rem] border border-[#f2e1b8] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(184,134,11,0.12)] md:flex-row md:justify-between"
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
                      {order.items.map(item => `${item.product?.name || "Product unavailable"} x ${item.quantity}`).join(", ")}
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

                {/* Order Status */}
                <div className="flex flex-col my-auto gap-2 min-w-[220px] rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Delivery</span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      COD
                    </span>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-800">{new Date(order.date).toLocaleDateString()}</p>
                    <p className="mt-1">Order progress</p>
                  </div>

                  <div className="mt-1">
                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                      Status
                    </label>
                    <select
                      value={order.status || 'Pending'}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      disabled={updatingId === order._id}
                      className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
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
