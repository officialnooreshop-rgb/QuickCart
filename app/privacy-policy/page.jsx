"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Navbar />

      <main className="bg-white text-black min-h-screen">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            Privacy <span className="text-[#d4af37]">Policy</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-gray-700 text-lg">
            Your privacy is our priority. We are committed to protecting the personal information you share with us.
          </p>
        </section>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

        {/* POLICY CONTENT */}
        <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#d4af37] mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We collect personal information such as your name, email, phone number, and order details when you interact with our website. This information helps us provide you with a personalized and secure shopping experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#d4af37] mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your information is used to process orders, provide customer support, send updates about our products and promotions, and improve our website experience. We never sell or share your personal data with third parties without your consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#d4af37] mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use industry-standard security measures to protect your personal information. Access to your data is limited to authorized personnel only. However, no online system is completely secure, so please ensure you use strong passwords and protect your account details.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#d4af37] mb-4">
              Cookies & Tracking
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our website uses cookies to enhance your browsing experience, remember preferences, and analyze website traffic. You can control cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#d4af37] mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, correct, or delete your personal information. You can also unsubscribe from marketing communications at any time. Contact our support team if you wish to exercise these rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#d4af37] mb-4">
              Changes to this Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be posted on this page with the effective date. We encourage you to review this page periodically.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
