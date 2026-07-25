import connectDB from "@/config/db";
import Order from "@/Models/Order";
import Product from "@/Models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ success: false, message: "Product id is required" });
    }

    await connectDB();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" });
    }

    const order = await Order.findOne({
      clerkId: userId,
      status: { $ne: "Cancelled" },
      items: {
        $elemMatch: { product: product._id },
      },
    });

    return NextResponse.json({ success: true, canReview: Boolean(order) });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
