"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiUser, FiLock, FiClipboard, FiShield, FiSettings, FiRefreshCw } from "react-icons/fi";

const sections = [
  {
    icon: <FiUser className="text-[#d4af37] w-6 h-6" />,
    title: "Information We Collect",
    content: "We collect personal information such as your name, email, phone number, and order details when you interact with our website. This information helps us provide you with a personalized and secure shopping experience."
  },
  {
    icon: <FiClipboard className="text-[#d4af37] w-6 h-6" />,
    title: "How We Use Your Information",
    content: "Your information is used to process orders, provide customer support, send updates about our products and promotions, and improve our website experience. We never sell or share your personal data with third parties without your consent."
  },
  {
    icon: <FiLock className="text-[#d4af37] w-6 h-6" />,
    title: "Data Security",
    content: "We use industry-standard security measures to protect your personal information. Access to your data is limited to authorized personnel only. However, no online system is completely secure, so please ensure you use strong passwords and protect your account details."
  },
  {
    icon: <FiShield className="text-[#d4af37] w-6 h-6" />,
    title: "Cookies & Tracking",
    content: "Our website uses cookies to enhance your browsing experience, remember preferences, and analyze website traffic. You can control cookies through your browser settings."
  },
  {
    icon: <FiSettings className="text-[#d4af37] w-6 h-6" />,
    title: "Your Rights",
    content: "You have the right to access, correct, or delete your personal information. You can also unsubscribe from marketing communications at any time. Contact our support team if you wish to exercise these rights."
  },
  {
    icon: <FiRefreshCw className="text-[#d4af37] w-6 h-6" />,
    title: "Changes to this Policy",
    content: "We may update this privacy policy from time to time. Any changes will be posted on this page with the effective date. We encourage you to review this page periodically."
  },
];

const PrivacyPolicyPage = () => {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50 text-black min-h-screen">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Privacy <span className="bg-gradient-to-r from-[#d4af37] to-[#fdb242] bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
            Your privacy is our top priority. We take the protection of your personal information seriously and are committed to keeping it safe.
          </p>
        </section>

        {/* POLICY CONTENT */}
        <section className="max-w-6xl mx-auto px-6 pb-24 space-y-8">
          {sections.map((section, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                {section.icon}
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
