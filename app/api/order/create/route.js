
import { inngest } from "@/config/inngest";
import Product from "@/Models/Product";
import User from "@/Models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const userId = getAuth(request).userId;
        const {address,items} = await request.json();

        if (!address ||items.length===0) {
            return NextResponse.json({ success: false, message: "Address and items are required to create an order" });
        }

        //calculate total amount
        const amount = items.reduce(async(acc, item) => {
            const product = await Product.findById(item.productId);
            return acc + product.offerPrice * item.quantity;
        },0)

        await inngest.send({
            name: "order/created",
            data: { userId,
                 address,
                  items,
                   amount : amount + Math.floor(amount *0.02),
                   date: Date.now()
                 }
        });

        //clear user cart after order creation
        const user = await User.findById(userId);
        user.cartItems = {};
        await user.save();

        return NextResponse.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.log("Error in creating order:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}