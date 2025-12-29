
import Order from "@/Models/Order";
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
        let amount = 0;
        const orderItems = [];
        for (const item of items) {
            const product = await Product.findById(item.productId);
            amount += product.offerPrice * item.quantity;
            orderItems.push({
                product: product,
                quantity: item.quantity
            });
        }

        //create order
        const orderData = {
            userId,
            items: orderItems,
            amount: amount + Math.floor(amount * 0.02),
            address,
            date: Date.now()
        };
        const order = new Order(orderData);
        await order.save();

        //clear user cart after order creation
        const user = await User.findOne({ _Id: userId });
        user.cartItems = {};
        await user.save();

        return NextResponse.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.log("Error in creating order:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}