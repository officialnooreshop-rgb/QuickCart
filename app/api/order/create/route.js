import Order from "@/Models/Order";
import Product from "@/Models/Product";
import User from "@/Models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    if (!address || items.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Address and items are required",
      });
    }

    let amount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) throw new Error("Product not found");

      amount += product.offerPrice * item.quantity;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
      });
    }

    const order = new Order({
      clerkId: userId,
      items: orderItems,
      amount: amount + Math.floor(amount * 0.02),
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
