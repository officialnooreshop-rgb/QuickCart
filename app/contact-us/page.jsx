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
  const [formData, setFormData] = useState({ name: "", email: "", message: "", phoneNumber: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "", phoneNumber: "" });
    } catch (err) {
      toast.error("Failed to send message. Try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-6 py-12 md:px-16">
        <Toaster position="top-right" reverseOrder={false} />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Contact Us</h1>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Form */}
          <div className="flex-1 bg-white p-8 rounded-xl shadow-md">
            {!isSignedIn ? (
              <p className="text-center text-orange-600 font-semibold">
                Please log in to send a message.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  rows={5}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 text-white p-3 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-60"
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
              width={500} // Adjust width as needed
              height={500} // Adjust height as needed
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
