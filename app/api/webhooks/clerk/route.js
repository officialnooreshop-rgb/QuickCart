import connectDB from "@/config/db";
import User from "@/Models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { type, data } = body;

        await connectDB();

        if (type === 'user.created') {
            const { id, first_name, last_name, email_addresses, image_url } = data;
            const userData = {
                _Id: id,
                name: `${first_name} ${last_name}`,
                email: email_addresses[0].email_address,
                imageUrl: image_url,
            };
            await User.findOneAndUpdate({ _Id: id }, userData, { upsert: true });
        } else if (type === 'user.updated') {
            const { id, first_name, last_name, email_addresses, image_url } = data;
            const userData = {
                _Id: id,
                name: `${first_name} ${last_name}`,
                email: email_addresses[0].email_address,
                imageUrl: image_url,
            };
            await User.findOneAndUpdate({ _Id: id }, userData);
        } else if (type === 'user.deleted') {
            const { id } = data;
            await User.findOneAndDelete({ _Id: id });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ success: false, error: error.message });
    }
}