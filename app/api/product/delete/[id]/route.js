import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/Models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(request, context) {
  try {
    const { userId } = getAuth(request);
    const params = await context.params;

    if (!params?.id) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
    }

    if (!(await authSeller(userId))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const product = await Product.findOneAndDelete({ _id: params.id, userId });

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
