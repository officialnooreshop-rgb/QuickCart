import Order from "@/Models/Order";
import Product from "@/Models/Product";
import User from "@/Models/User";
import StoreSettings from "@/Models/StoreSettings";
import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items, promoCode } = await request.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    if (!address || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Address and items are required",
      });
    }

    await connectDB();
    let subtotal = 0;
    const orderItems = [];
    const unavailableProductIds = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        unavailableProductIds.push(item.productId);
        continue;
      }

      subtotal += product.offerPrice * item.quantity;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
      });
    }

    if (unavailableProductIds.length > 0) {
      return NextResponse.json({
        success: false,
        unavailableProductIds,
        message: "Some products in your cart are no longer available and were removed. Please review your cart.",
      });
    }

    const settings = await StoreSettings.findOne({ key: "global" }).lean();
    const shippingFee = Number(settings?.shippingFee || 0);
    const taxRate = Number(settings?.taxRate || 0);
    const promo = settings?.promoCodes?.find((item) => item.active && item.code === String(promoCode || "").trim().toUpperCase());
    const discount = promo ? Math.floor(subtotal * (promo.discountPercent / 100)) : 0;
    const taxableAmount = subtotal - discount;
    const tax = Math.floor(taxableAmount * (taxRate / 100));
    const amount = taxableAmount + shippingFee + tax;

    const order = new Order({
      clerkId: userId,
      items: orderItems,
      amount,
      address,
    });

    await order.save();

    await User.findOneAndUpdate(
      { clerkId: userId },
      { cartItems: {} }
    );

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("Error in creating order:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
