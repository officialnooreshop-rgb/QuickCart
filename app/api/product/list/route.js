import connectDB from "@/config/db";
import Product from "@/Models/Product";
import Review from "@/Models/Review";
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find({});

        const reviewStats = await Review.aggregate([
            {
                $group: {
                    _id: "$product",
                    averageRating: { $avg: "$rating" },
                    reviewCount: { $sum: 1 },
                },
            },
        ]);

        const ratingMap = new Map(
            reviewStats.map((item) => [
                item._id.toString(),
                {
                    rating: Number(item.averageRating.toFixed(1)),
                    reviewCount: item.reviewCount,
                },
            ])
        );

        const enrichedProducts = products.map((product) => {
            const productObject = product.toObject();
            const stats = ratingMap.get(product._id.toString()) || { rating: 0, reviewCount: 0 };

            return {
                ...productObject,
                rating: stats.rating,
                reviewCount: stats.reviewCount,
            };
        });

        return NextResponse.json({ success: true, products: enrichedProducts });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}