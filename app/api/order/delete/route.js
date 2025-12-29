import connectDB from "@/config/db";
import Order from "@/Models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const { userId } = getAuth(request);
        const url = new URL(request.url);
        const orderId = url.pathname.split("/").pop();

        if (!orderId) {
            return NextResponse.json({ success: false, message: "Order ID is required" });
        }

        await connectDB();

        const order = await Order.findOne({ _id: orderId, userId });
        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found or unauthorized" });
        }

        await Order.deleteOne({ _id: orderId });
        return NextResponse.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}