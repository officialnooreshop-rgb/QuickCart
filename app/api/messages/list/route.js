import db from '@/config/db';
import Message from '@/Models/Message';

await db(); // Ensure database connection

export async function GET(req) {
  try {
    const messages = await Message.find(); // Fetch all messages from the database
    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch messages' }), { status: 500 });
  }
}