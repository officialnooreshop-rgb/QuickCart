import mongoose from "mongoose";
import { Amarante } from "next/font/google";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: "user" },
    items: [{
        product: { type: Object, required: true, ref: "product" },
        quantity: { type: Number, required: true },
    }],
    amount: { type: Number, required: true },
    address: { type: Object, ref: "address", required: true },
    status: { type: String, required: true, default: "Order Placed" },
    date: { type: Number, required: true },
});

const Order = mongoose.models.order || mongoose.model("order", orderSchema);
export default Order;
export { Order };
