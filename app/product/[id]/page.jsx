"use client";

import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import { useClerk } from "@clerk/nextjs";

const Product = () => {
    const { id } = useParams();
    const { products, router, addToCart } = useAppContext();
    const { user, openSignIn } = useClerk(); // <-- Clerk hook

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const product = products.find((p) => p._id === id);
        setProductData(product);
    }, [id, products.length]);

    if (!productData) return <Loading />;

    const handleAddToCart = () => {
        if (!user) return openSignIn(); // <-- open sign-in if not logged in
        addToCart(productData._id);
    };

    const handleBuyNow = () => {
        if (!user) return openSignIn();
        addToCart(productData._id);
        router.push("/cart");
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-[#fffdf8] via-gray-50 to-[#fff7e6] px-6 pb-10 pt-10 md:px-16 md:pt-14 lg:px-32">
                <div className="mb-8 text-sm text-gray-500">
                    Home <span className="mx-2 text-[#b8860b]">/</span> Product details
                </div>
                {/* Product Details */}
                <div className="grid grid-cols-1 gap-10 rounded-[2rem] border border-[#f2e1b8] bg-white/80 p-5 shadow-[0_16px_45px_rgba(184,134,11,0.1)] backdrop-blur md:grid-cols-2 md:gap-16 md:p-8">
                    {/* Images */}
                    <div className="px-0 lg:px-5 xl:px-10">
                        <div className="mb-4 overflow-hidden rounded-[1.5rem] border border-[#f2e1b8] bg-gradient-to-br from-[#fff8e8] to-gray-100 shadow-md">
                            <Image
                                src={mainImage || productData.image[0]}
                                alt={productData.name}
                                className="w-full h-auto object-cover"
                                width={1280}
                                height={720}
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {productData.image.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`cursor-pointer overflow-hidden rounded-xl border bg-gray-100/20 shadow-sm transition-transform hover:scale-105 ${mainImage === img ? "border-[#b8860b] ring-2 ring-[#b8860b]/20" : "border-transparent"}`}
                                >
                                    <Image
                                        src={img}
                                        alt={`thumb ${idx + 1}`}
                                        className="w-full h-auto object-cover"
                                        width={1280}
                                        height={720}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#b8860b]">Noore Collection</p>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight text-[#1E2A38] md:text-4xl">
                            {productData.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                {[...Array(4)].map((_, i) => (
                                    <Image key={i} className="h-4 w-4" src={assets.star_icon} alt="star" />
                                ))}
                                <Image className="h-4 w-4" src={assets.star_dull_icon} alt="star" />
                            </div>
                            <p className="text-gray-600">(4.5)</p>
                        </div>

                        <p className="mt-4 max-w-xl leading-relaxed text-gray-600">{productData.description}</p>

                        <div className="mt-7 flex items-end gap-3">
                            <p className="text-4xl font-bold text-[#1E2A38]">
                            Rs.{productData.offerPrice}
                            </p>
                            <span className="text-base font-normal text-gray-500 line-through ml-2">
                                Rs.{productData.price}
                            </span>
                        </div>

                        <hr className="my-6 border-gray-300" />

                        <div className="overflow-x-auto rounded-2xl bg-[#fff8e8] p-4">
                            <table className="w-full table-auto">
                                <tbody>
                                    <tr>
                                        <td className="text-gray-600 font-medium">Brand</td>
                                        <td className="text-[#fdb242]/80">Noore</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center mt-10 gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="w-full rounded-xl border border-[#e7d4aa] bg-white py-3.5 font-semibold text-gray-800 transition hover:border-[#b8860b] hover:bg-[#fff8e8]"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="w-full rounded-xl bg-[#B8860B] py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#A7780A]"
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Featured Products */}
                <div className="flex flex-col items-center">
                    <div className="mb-4 mt-16 flex flex-col items-center">
                        <p className="text-3xl font-bold text-[#1E2A38]">
                            Featured <span className="text-[#fdb242]">Products</span>
                        </p>
                        <div className="w-28 h-0.5 bg-[#fdb242] mt-2 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-16 w-full">
                        {products.slice(0, 5).map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                    <button onClick={() => router.push("/all-products")} className="mb-16 rounded-full border border-[#e7d4aa] bg-white px-8 py-3 font-semibold text-gray-600 shadow-sm transition hover:border-[#b8860b] hover:bg-[#fff8e8]">
                        See more
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Product;
