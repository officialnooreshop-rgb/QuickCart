import connectDB from "@/config/db";
import User from "@/Models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET(request) {
    try {
        const userId = getAuth(request).userId;

        await connectDB();
        let user = await User.findOne({ _Id: userId });

        if (!user) {
            // Create new user
            const client = await clerkClient();
            const clerkUser = await client.users.getUser(userId);
            user = new User({
                _Id: userId,
                Name: clerkUser.firstName + ' ' + clerkUser.lastName,
                email: clerkUser.primaryEmailAddress.emailAddress,
                imageUrl: clerkUser.imageUrl,
                cartItems: {}
            });
            await user.save();
        }

        return NextResponse.json({ success: true, data: user });

    } catch (error) {
            return NextResponse.json({ success: false, message: error.message    });
    }
}

export async function POST(request) {
    try {
        const userId = getAuth(request).userId;
        const { address } = await request.json();

        await connectDB();
        const user = await User.findOne({ _Id: userId });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' });
        }

        user.address = address;
        await user.save();

        return NextResponse.json({ success: true, message: 'Address updated successfully' });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}