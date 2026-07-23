import db from '@/config/db';
import Message from '@/Models/Message';

export async function GET(req) {
  try {
    await db();
    const messages = await Message.find();
    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch messages' }), { status: 500 });
  }
}