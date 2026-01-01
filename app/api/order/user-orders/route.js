import Order from "@/Models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const orders = await Order.find({ clerkId: userId }).populate({
      path: "items.product",
      model: "Product",
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
