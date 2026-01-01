'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddAddress = () => {
    const {getToken, router} = useAppContext();

    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
        addressType: 'home'
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const token = await getToken();
            const {data} = await axios.post('/api/user/add-address', { address }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                toast.success(data.message);
                router.push('/cart');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between items-start md:items-center">
                
                {/* Form */}
                <form onSubmit={onSubmitHandler} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                        Add Shipping <span className="text-[#fdb242]">Address</span>
                    </h2>

                    <div className="space-y-4">
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdb242] shadow-sm transition"
                            type="text"
                            placeholder="Full name"
                            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                            value={address.fullName}
                            required
                        />
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdb242] shadow-sm transition"
                            type="text"
                            placeholder="Phone number"
                            onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                            value={address.phoneNumber}
                            required
                        />
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdb242] shadow-sm transition"
                            type="text"
                            placeholder="Pin code"
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                            value={address.pincode}
                            required
                        />
                        <textarea
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdb242] shadow-sm transition resize-none"
                            rows={4}
                            placeholder="Address (Area and Street)"
                            onChange={(e) => setAddress({ ...address, area: e.target.value })}
                            value={address.area}
                            required
                        ></textarea>

                        {/* City and State stacked */}
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdb242] shadow-sm transition"
                            type="text"
                            placeholder="City/District/Town"
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            value={address.city}
                            required
                        />
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdb242] shadow-sm transition"
                            type="text"
                            placeholder="State"
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            value={address.state}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-3 bg-gradient-to-r from-[#fdb242] to-[#f2bb6b] text-black font-semibold rounded-full hover:opacity-90 transition"
                    >
                        Save Address
                    </button>
                </form>

                {/* Illustration */}
                <div className="mt-10 md:mt-0 md:ml-16 flex-shrink-0">
                    <Image
                        src={assets.my_location_image}
                        alt="my_location_image"
                        className="rounded-2xl shadow-lg"
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddAddress;
