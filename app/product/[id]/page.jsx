'use client'
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

const Product = () => {
    const { id } = useParams();
    const { products, router, addToCart } = useAppContext();

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const product = products.find((p) => p._id === id);
        setProductData(product);
    }, [id, products.length]);

    if (!productData) return <Loading />;

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Images */}
                    <div className="px-5 lg:px-16 xl:px-20">
                        <div className="rounded-2xl overflow-hidden bg-gray-50 shadow-md mb-4">
                            <Image
                                src={mainImage || productData.image[0]}
                                alt={productData.name}
                                className="w-full h-auto object-cover"
                                width={1280}
                                height={720}
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {productData.image.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className="cursor-pointer rounded-xl overflow-hidden bg-gray-100/20 backdrop-blur-sm hover:scale-105 transition-transform shadow-sm"
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
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-semibold text-gray-800/90 mb-4">
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

                        <p className="text-gray-600 mt-3">{productData.description}</p>

                        <p className="text-3xl font-medium mt-6">
                            Rs.{productData.offerPrice}
                            <span className="text-base font-normal text-gray-500 line-through ml-2">
                                Rs.{productData.price}
                            </span>
                        </p>

                        <hr className="my-6 border-gray-300" />

                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
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
                                onClick={() => addToCart(productData._id)}
                                className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 rounded-lg transition"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    addToCart(productData._id);
                                    router.push('/cart');
                                }}
                                className="w-full py-3.5 bg-[#fdb242] text-white hover:bg-[#f2a832] rounded-lg transition"
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Featured Products */}
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mb-4 mt-16">
                        <p className="text-3xl font-semibold">
                            Featured <span className="text-[#fdb242]">Products</span>
                        </p>
                        <div className="w-28 h-0.5 bg-[#fdb242] mt-2 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-16 w-full">
                        {products.slice(0, 5).map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                    <button className="px-8 py-2 mb-16 border rounded-full text-gray-500/70 hover:bg-slate-50/90 transition">
                        See more
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Product;
