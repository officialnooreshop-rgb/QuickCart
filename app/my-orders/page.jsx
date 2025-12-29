'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
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

            const { data } = await axios.get('/api/order/list', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                setOrders(data.orders.reverse());
                setLoading(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleCancelOrder = async () => {
        try {
            console.log("Order to cancel:", orderToCancel); // Debugging log
            const token = await getToken();
            const { data } = await axios.delete(`/api/order/delete/${orderToCancel}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                toast.success("Order canceled successfully");
                setOrders(orders.filter(order => order._id !== orderToCancel));
                setShowCancelPopup(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const isCancelable = (orderDate) => {
        const orderTime = new Date(orderDate).getTime();
        const currentTime = Date.now();
        return (currentTime - orderTime) <= 6 * 60 * 60 * 1000; // 6 hours in milliseconds
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {loading ? <Loading /> : (<div className="max-w-5xl border-t border-gray-300 text-sm">
                        {orders.map((order, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300">
                                <div className="flex-1 flex gap-5 max-w-80">
                                    <Image
                                        className="max-w-16 max-h-16 object-cover"
                                        src={assets.box_icon}
                                        alt="box_icon"
                                    />
                                    <p className="flex flex-col gap-3">
                                        <span className="font-medium text-base">
                                            {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                        </span>
                                        <span>Items : {order.items.length}</span>
                                    </p>
                                </div>
                                <div>
                                    {order.address ? (
                                        <p>
                                            <span className="font-medium">{order.address.fullName}</span>
                                            <br />
                                            <span>{order.address.area}</span>
                                            <br />
                                            <span>{`${order.address.city}, ${order.address.state}`}</span>
                                            <br />
                                            <span>{order.address.phoneNumber}</span>
                                        </p>
                                    ) : (
                                        <p className="text-red-500">Address not available</p>
                                    )}
                                </div>
                                <p className="font-medium my-auto">{currency}{order.amount}</p>
                                <div>
                                    <p className="flex flex-col">
                                        <span>Method : COD</span>
                                        <span>Date : {new Date(order.date).toLocaleDateString()}</span>
                                        <span>Payment : Pending</span>
                                    </p>
                                    {isCancelable(order.date) && (
                                        <button
                                            onClick={() => {
                                                setOrderToCancel(order._id);
                                                setShowCancelPopup(true);
                                            }}
                                            className="bg-red-500 text-white px-4 py-2 mt-3 hover:bg-red-600"
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>)}
                </div>
            </div>
            {showCancelPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-md text-center">
                        <p className="text-lg font-medium mb-4">Are You Sure You Wanna Cancel Your Order?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowCancelPopup(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                No
                            </button>
                            <button
                                onClick={handleCancelOrder}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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