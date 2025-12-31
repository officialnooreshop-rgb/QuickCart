"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
    return (
        <>
            <Navbar />

            <main className="bg-white text-black">
                {/* HERO SECTION */}
                <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
                        About <span className="text-[#d4af37]">Us</span>
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-gray-600 text-lg">
                        Where premium style meets everyday comfort. We bring timeless
                        fashion crafted with quality, elegance, and purpose.
                    </p>
                </section>

                {/* DIVIDER */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

                {/* STORY SECTION */}
                <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">
                            Our <span className="text-[#d4af37]">Story</span>
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our journey started with a simple idea — to create an ecommerce
                            brand that values quality over quantity and style over trends.
                            Every product we offer is carefully selected to reflect elegance,
                            durability, and modern design.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            We believe fashion should feel as good as it looks. That’s why we
                            focus on premium materials, refined details, and customer-first
                            service.
                        </p>
                    </div>

                    <div className="border border-[#d4af37]/40 rounded-xl p-8 bg-[#fafafa]">
                        <h3 className="text-xl font-semibold mb-4 text-[#d4af37]">
                            What Sets Us Apart
                        </h3>
                        <ul className="space-y-3 text-gray-700">
                            <li>• Carefully selected products, not mass-listed items</li>
                            <li>• Focus on fabric quality, stitching, and finishing</li>
                            <li>• Honest pricing with no fake discounts</li>
                            <li>• Quality checks before dispatch</li>
                            <li>• Responsive customer support you can actually reach</li>

                        </ul>
                    </div>
                </section>

                {/* MISSION SECTION */}
                <section className="bg-[#f9f9f9] py-20">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-semibold">
                            Our <span className="text-[#d4af37]">Mission</span>
                        </h2>
                        <p className="mt-6 text-gray-700 text-lg">
                            To deliver premium fashion that empowers confidence, reflects
                            individuality, and stands the test of time — without compromising
                            on quality or service.
                        </p>
                    </div>
                </section>

                {/* VALUES SECTION */}
                <section className="max-w-7xl mx-auto px-6 py-20 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {[
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
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="border border-[#d4af37]/30 rounded-xl p-8 bg-white hover:border-[#d4af37] transition shadow-sm"
                        >
                            <h3 className="text-xl font-semibold text-[#d4af37] mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-700">{item.text}</p>
                        </div>
                    ))}
                </section>

                {/* CTA SECTION */}
                <section className="bg-gradient-to-r from-white via-[#f7f7f7] to-white py-20 text-center">
                    <h2 className="text-3xl font-semibold">
                        Experience <span className="text-[#d4af37]">Luxury</span> With Us
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Join thousands of customers who trust us for premium style.
                    </p>
                    <button onClick={() => window.location.href = "/all-products"} className="mt-8 px-8 py-3 rounded-full bg-[#d4af37] text-black font-semibold hover:opacity-90 transition">
                        Shop Now
                    </button>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default AboutPage;
