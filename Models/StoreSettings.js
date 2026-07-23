import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, uppercase: true, trim: true },
    discountPercent: { type: Number, required: true, min: 0, max: 100 },
    active: { type: Boolean, default: true },
  },
  { _id: false }
);

const storeSettingsSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: "global" },
  shippingFee: { type: Number, default: 0, min: 0 },
  taxRate: { type: Number, default: 2, min: 0, max: 100 },
  promoCodes: { type: [promoCodeSchema], default: [] },
});

export default mongoose.models.StoreSettings || mongoose.model("StoreSettings", storeSettingsSchema);
