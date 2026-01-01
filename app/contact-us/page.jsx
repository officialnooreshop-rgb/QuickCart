"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";
import contact_us from "../../assets/Customer-Support.png";
import Image from "next/image";

export default function ContactPage() {
  const { isSignedIn } = useUser();
  const [formData, setFormData] = useState({ name: "", email: "", phoneNumber: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      toast.success(data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", phoneNumber: "", message: "" });
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 px-6 py-16 md:px-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
          Contact <span className="text-gradient bg-gradient-to-r from-[#d4af37] to-[#fdb242] bg-clip-text text-transparent">Us</span>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="flex-1 bg-white p-10 rounded-3xl shadow-2xl border border-[#d4af37]/20 hover:shadow-[#fdb242]/20 transition-all duration-300">
            {!isSignedIn ? (
              <p className="text-center text-[#d4af37] font-semibold text-lg">
                Please log in to send a message.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {["name", "email", "phoneNumber"].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field === "phoneNumber" ? "Phone Number" : field.charAt(0).toUpperCase() + field.slice(1)}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb242] focus:border-[#d4af37] shadow-inner transition"
                  />
                ))}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  rows={6}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fdb242] focus:border-[#d4af37] shadow-inner transition"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#fdb242] to-[#f2bb6b] text-black font-semibold p-4 rounded-full shadow-[#fdb242]"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Illustration */}
          {/* Illustration */}
<div className="flex-1">
  <Image
    src={contact_us}
    alt="Contact Us"
    width={500}
    height={500}
    className="w-full h-auto rounded-3xl shadow-2xl border border-[#d4af37]/20 transition-transform transform"
  />
</div>

        </div>
      </main>
      <Footer />
    </>
  );
}
