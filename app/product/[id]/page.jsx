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
import axios from "axios";
import toast from "react-hot-toast";

const Product = () => {
    const { id } = useParams();
    const { products, router, addToCart, fetchProductData } = useAppContext();
    const { user, openSignIn } = useClerk(); // <-- Clerk hook

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState("0.0");
    const [reviewCount, setReviewCount] = useState(0);
    const [canReview, setCanReview] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
    const [reviewImages, setReviewImages] = useState([]);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    useEffect(() => {
        const product = products.find((p) => p._id === id);
        setProductData(product);
    }, [id, products.length]);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!id) return;
            try {
                const { data } = await axios.get(`/api/review?productId=${id}`);
                if (data.success) {
                    setReviews(data.reviews || []);
                    setAvgRating(data.avgRating || "0.0");
                    setReviewCount(data.reviewCount || 0);
                    if (user) {
                        setHasReviewed((data.reviews || []).some((review) => review.clerkId === user.id));
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchReviews();
    }, [id]);

    useEffect(() => {
        const checkCanReview = async () => {
            if (!user || !id) {
                setCanReview(false);
                return;
            }

            try {
                const { data } = await axios.get(`/api/review/check-order?productId=${id}`);
                if (data.success) {
                    setCanReview(data.canReview);
                }
            } catch (error) {
                console.error(error);
                setCanReview(false);
            }
        };

        checkCanReview();
    }, [user, id]);

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

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            openSignIn();
            return;
        }

        if (!canReview) {
            toast.error("You can only review products you have bought.");
            return;
        }

        setIsSubmittingReview(true);

        try {
            const formData = new FormData();
            formData.append("productId", productData._id);
            formData.append("rating", reviewForm.rating);
            formData.append("comment", reviewForm.comment);
            reviewImages.forEach((image) => formData.append("images", image));

            const { data } = await axios.post("/api/review", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (data.success) {
                toast.success("Review submitted successfully");
                setReviewForm({ rating: 5, comment: "" });
                setReviewImages([]);
                await fetchProductData();
                const { data: refreshedData } = await axios.get(`/api/review?productId=${productData._id}`);
                if (refreshedData.success) {
                    setReviews(refreshedData.reviews || []);
                    setAvgRating(refreshedData.avgRating || "0.0");
                    setReviewCount(refreshedData.reviewCount || 0);
                }
            } else {
                toast.error(data.message || "Unable to submit review");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Unable to submit review");
        } finally {
            setIsSubmittingReview(false);
        }
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
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Image
                                        key={i}
                                        className="h-4 w-4"
                                        src={i < Math.round(Number(avgRating)) ? assets.star_icon : assets.star_dull_icon}
                                        alt="star"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600">({avgRating}) · {reviewCount} review{reviewCount === 1 ? "" : "s"}</p>
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

                {/* Reviews */}
                <div className="mt-12 rounded-[2rem] border border-[#f2e1b8] bg-[radial-gradient(circle_at_top_left,_#fffdf8,_#fff8e8_60%,_#fff2d2)] p-6 shadow-[0_20px_60px_rgba(184,134,11,0.12)] md:p-8">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-2xl font-bold text-[#1E2A38]">Customer Reviews</p>
                            <p className="mt-1 text-sm text-gray-600">Real feedback from verified buyers.</p>
                        </div>
                        <div className="rounded-full bg-[#fff8e8] px-4 py-2 text-sm font-semibold text-[#b8860b]">
                            {avgRating} / 5 from {reviewCount} reviews
                        </div>
                    </div>

                    {user && canReview && !hasReviewed ? (
                        <form onSubmit={handleReviewSubmit} className="mt-6 rounded-[1.5rem] border border-[#f2e1b8] bg-white/80 p-5 shadow-[0_10px_30px_rgba(184,134,11,0.08)]">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="font-semibold text-[#1E2A38]">Write a review</p>
                                    <p className="text-sm text-gray-600">You can leave one review for this product after purchase.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-600">Your rating:</span>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                                className="p-1 transition-transform hover:scale-110"
                                                aria-label={`Rate ${star} star${star === 1 ? "" : "s"}`}
                                            >
                                                <Image
                                                    className="h-6 w-6"
                                                    src={star <= reviewForm.rating ? assets.star_icon : assets.star_dull_icon}
                                                    alt={`star ${star}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <textarea
                                value={reviewForm.comment}
                                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                rows="3"
                                placeholder="Share your experience with this product..."
                                className="mt-4 w-full rounded-xl border border-[#e7d4aa] bg-white px-3 py-2 text-sm outline-none focus:border-[#b8860b]"
                            />
                            <div className="mt-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Upload images (optional)</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => setReviewImages(Array.from(e.target.files || []))}
                                    className="w-full rounded-xl border border-[#e7d4aa] bg-white px-3 py-2 text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmittingReview}
                                className="mt-4 rounded-xl bg-[#B8860B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#A7780A] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmittingReview ? "Submitting..." : "Submit Review"}
                            </button>
                        </form>
                    ) : user ? null : (
                        <div className="mt-6 rounded-[1.25rem] border border-dashed border-[#e7d4aa] bg-[#fff8e8]/80 p-4 text-sm text-gray-600 shadow-sm">
                            Sign in to leave a review for this product.
                        </div>
                    )}

                    <div className="mt-8 space-y-4">
                        {reviews.length > 0 ? reviews.map((review) => (
                            <div key={review._id} className="rounded-2xl border border-[#f2e1b8] bg-[#fffdf8] p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Image
                                                key={i}
                                                className="h-4 w-4"
                                                src={i < review.rating ? assets.star_icon : assets.star_dull_icon}
                                                alt="star"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                {review.comment ? <p className="mt-3 text-sm text-gray-700">{review.comment}</p> : null}
                                {review.images && review.images.length > 0 ? (
                                    <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                                        {review.images.map((image, index) => (
                                            <Image
                                                key={`${review._id}-${index}`}
                                                src={image}
                                                alt={`Review image ${index + 1}`}
                                                width={500}
                                                height={500}
                                                className="h-32 w-full rounded-xl object-cover"
                                            />
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        )) : (
                            <div className="rounded-2xl border border-dashed border-[#e7d4aa] bg-[#fff8e8] p-6 text-center text-sm text-gray-600">
                                No reviews yet. Be the first to share your experience.
                            </div>
                        )}
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
