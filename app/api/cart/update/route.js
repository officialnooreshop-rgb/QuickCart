import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";
import User from "@/Models/User";

export async function POST(request) {
    try {
        const userId = getAuth(request).userId;
        const {cartData} = await request.json();
        await connectDB();
        const user = await User.findOne({ _Id: userId });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        user.cartItems = cartData;
        await user.save();

        return NextResponse.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}