import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  amount: {
    type: Number,
    required: true,
  },

  address: {
    type: Object,
    required: true,
  },

  status: {
    type: String,
    enum: [
      "Pending",
      "Packed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ],
    default: "Pending", // 👈 VERY IMPORTANT
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);
