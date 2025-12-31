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
      <main className="min-h-screen bg-white px-6 py-12 md:px-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
          Contact <span className="text-[#d4af37]">Us</span>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="flex-1 bg-white p-10 rounded-2xl shadow-lg border border-[#d4af37]/40">
            {!isSignedIn ? (
              <p className="text-center text-[#d4af37] font-semibold">
                Please log in to send a message.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  rows={6}
                  className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#d4af37] text-black font-semibold p-4 rounded-full hover:opacity-90 transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Illustration */}
          <div className="flex-1">
            <Image
              src={contact_us}
              alt="Contact Us"
              width={500}
              height={500}
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
