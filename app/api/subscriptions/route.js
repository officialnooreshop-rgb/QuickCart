import connectDB from '@/config/db';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email' });
    }

    const existing = await Subscription.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ success: true, message: 'Email already subscribed' });
    }

    const subscription = new Subscription({ email: email.toLowerCase() });
    await subscription.save();

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function GET() {
  try {
    await connectDB();
    const subscriptions = await Subscription.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, subscriptions });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
