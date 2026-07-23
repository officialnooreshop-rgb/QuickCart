import connectDB from "@/config/db";
import StoreSettings from "@/Models/StoreSettings";
import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const defaultSettings = { shippingFee: 0, taxRate: 2, promoCodes: [] };

export async function GET() {
  try {
    await connectDB();
    const settings = await StoreSettings.findOneAndUpdate(
      { key: "global" },
      { $setOnInsert: { key: "global", ...defaultSettings } },
      { new: true, upsert: true }
    ).lean();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { userId } = getAuth(request);
    if (!(await authSeller(userId))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const shippingFee = Number(body.shippingFee);
    const taxRate = Number(body.taxRate);
    const promoCodes = Array.isArray(body.promoCodes) ? body.promoCodes : [];

    if (!Number.isFinite(shippingFee) || shippingFee < 0 || !Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) {
      return NextResponse.json({ success: false, message: "Enter valid shipping and tax values" }, { status: 400 });
    }

    const normalizedPromoCodes = promoCodes
      .map((promo) => ({
        code: String(promo.code || "").trim().toUpperCase(),
        discountPercent: Number(promo.discountPercent),
        active: promo.active !== false,
      }))
      .filter((promo) => promo.code && Number.isFinite(promo.discountPercent) && promo.discountPercent > 0 && promo.discountPercent <= 100);

    await connectDB();
    const settings = await StoreSettings.findOneAndUpdate(
      { key: "global" },
      { shippingFee, taxRate, promoCodes: normalizedPromoCodes },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    return NextResponse.json({ success: true, settings, message: "Store settings saved" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
