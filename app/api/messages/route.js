import db from '@/config/db';
import Message from '@/Models/Message';
import { NextResponse } from 'next/server';

await db(); // Ensure the database connection is awaited

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    return new NextResponse(JSON.stringify({ success: true, message: 'Message Sent successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error saving message:', error); // Log error for debugging
    return new NextResponse(JSON.stringify({ error: 'Failed to save message' }), { status: 500 });
  }
}