import connectDB from "@/config/db";
import Review from "@/Models/Review";
import Order from "@/Models/Order";
import Product from "@/Models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ success: false, message: "Product id is required" });
    }

    const reviews = await Review.find({ product: productId }).sort({ createdAt: -1 });
    const reviewCount = await Review.countDocuments({ product: productId });

    const avgRating = reviewCount
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount).toFixed(1)
      : "0.0";

    return NextResponse.json({ success: true, reviews, avgRating, reviewCount });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const formData = await request.formData();
    const productId = formData.get("productId");
    const rating = formData.get("rating");
    const comment = formData.get("comment") || "";
    const files = formData.getAll("images");

    if (!productId || !rating) {
      return NextResponse.json({ success: false, message: "Product and rating are required" });
    }

    await connectDB();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" });
    }

    const hasBought = await Order.exists({
      clerkId: userId,
      status: { $ne: "Cancelled" },
      items: {
        $elemMatch: { product: product._id },
      },
    });

    if (!hasBought) {
      return NextResponse.json({ success: false, message: "You can only review products you have bought" });
    }

    const existingReview = await Review.findOne({ product: product._id, clerkId: userId });
    if (existingReview) {
      return NextResponse.json({ success: false, message: "You already reviewed this product" });
    }

    let imageUrls = [];
    if (files && files.length > 0) {
      imageUrls = await Promise.all(
        files.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { resource_type: "auto" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              }
            );
            stream.end(buffer);
          });
        })
      );
    }

    const review = await Review.create({
      product: product._id,
      clerkId: userId,
      rating: Number(rating),
      comment: comment || "",
      images: imageUrls,
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
