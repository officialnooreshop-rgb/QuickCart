import db from '@/config/db';
import Message from '@/Models/Message';
import { NextResponse } from 'next/server';

await db(); // Ensure the database connection is awaited

export async function POST(req) {
  try {
    const { name, email, message, phoneNumber } = await req.json();

    console.log('Received data:', { name, email, message, phoneNumber }); // Log received data

    if (!name || !email || !message || !phoneNumber) {
      console.log('Validation failed: Missing fields');
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    const newMessage = new Message({ name, email, message, phoneNumber });
    console.log('Saving message:', newMessage); // Log message before saving

    await newMessage.save();

    console.log('Message saved successfully');
    return new NextResponse(JSON.stringify({ success: true, message: 'Message Sent successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error saving message:', error); // Log error for debugging
    return new NextResponse(JSON.stringify({ error: 'Failed to save message' }), { status: 500 });
  }
}