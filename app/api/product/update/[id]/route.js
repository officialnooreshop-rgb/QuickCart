import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import connectDB from "@/config/db";
import Product from "@/Models/Product";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => (error ? reject(error) : resolve(result.secure_url))
    );
    stream.end(buffer);
  });
}

export async function PATCH(request, context) {
  try {
    const { userId } = getAuth(request);
    const params = await context.params;

    if (!params?.id) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
    }

    if (!(await authSeller(userId))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get("name")?.trim();
    const description = formData.get("description")?.trim();
    const category = formData.get("category");
    const price = Number(formData.get("price"));
    const offerPrice = Number(formData.get("offerPrice"));
    const files = formData.getAll("images").filter((file) => file?.size > 0);

    if (!name || !description || !category || !Number.isFinite(price) || !Number.isFinite(offerPrice)) {
      return NextResponse.json({ success: false, message: "All product fields are required" }, { status: 400 });
    }

    await connectDB();
    const product = await Product.findOne({ _id: params.id, userId });
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    const update = { name, description, category, price, offerPrice };
    if (files.length > 0) {
      update.image = await Promise.all(files.map(uploadImage));
    }

    const updatedProduct = await Product.findByIdAndUpdate(product._id, update, { new: true });
    return NextResponse.json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
