"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  const values = [
    {
      title: "Quality",
      text: "Every product is chosen with strict quality standards.",
    },
    {
      title: "Trust",
      text: "Transparent pricing, honest service, real value.",
    },
    {
      title: "Style",
      text: "Timeless designs with a modern luxury touch.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 text-black">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-28 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            About <span className="text-gradient bg-gradient-to-r from-[#d4af37] to-[#fdb242] bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
            Where premium style meets everyday comfort. We bring timeless
            fashion crafted with quality, elegance, and purpose.
          </p>
        </section>

        {/* DIVIDER */}
        <div className="w-3/4 md:w-1/2 mx-auto h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-12" />

        {/* STORY SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Our <span className="text-[#d4af37]">Story</span>
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our journey started with a simple idea — to create an ecommerce
              brand that values quality over quantity and style over trends.
              Every product we offer is carefully selected to reflect elegance,
              durability, and modern design.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe fashion should feel as good as it looks. That’s why we
              focus on premium materials, refined details, and customer-first
              service.
            </p>
          </div>

          <div className="bg-white border border-[#d4af37]/20 rounded-2xl p-10 shadow-2xl hover:shadow-3xl transition">
            <h3 className="text-xl font-semibold mb-6 text-[#d4af37]">
              What Sets Us Apart
            </h3>
            <ul className="space-y-4 text-gray-700 text-lg">
              <li>• Carefully selected products, not mass-listed items</li>
              <li>• Focus on fabric quality, stitching, and finishing</li>
              <li>• Honest pricing with no fake discounts</li>
              <li>• Quality checks before dispatch</li>
              <li>• Responsive customer support you can actually reach</li>
            </ul>
          </div>
        </section>

        {/* MISSION SECTION */}
        <section className="bg-white py-28">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Our <span className="text-[#d4af37]">Mission</span>
            </h2>
            <p className="mt-6 text-gray-700 text-lg md:text-xl leading-relaxed">
              To deliver premium fashion that empowers confidence, reflects
              individuality, and stands the test of time — without compromising
              on quality or service.
            </p>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-28 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {values.map((item, index) => (
            <div
              key={index}
              className="border border-[#d4af37]/30 rounded-2xl p-10 bg-white shadow-2xl hover:shadow-3xl transition hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-[#d4af37] mb-4">
                {item.title}
              </h3>
              <p className="text-gray-700 text-lg">{item.text}</p>
            </div>
          ))}
        </section>

        {/* CTA SECTION */}
        <section className="bg-gradient-to-r from-white via-[#f9f5ee] to-white py-28 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Experience <span className="text-[#d4af37]">Luxury</span> With Us
          </h2>
          <p className="mt-6 text-gray-600 text-lg md:text-xl">
            Join thousands of customers who trust us for premium style.
          </p>
          <button
            onClick={() => window.location.href = "/all-products"}
            className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#fdb242] text-black font-semibold shadow-xl hover:opacity-90 transition"
          >
            Shop Now
          </button>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
