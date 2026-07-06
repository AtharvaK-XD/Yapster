import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';

export async function POST(request: Request) {
  try {
    const { userId, roomName, roomCode } = await request.json();

    if (!userId || !roomName || !roomCode) {
      return NextResponse.json({ error: 'User ID, Room Name, and Room Code are required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Stream API credentials are not configured on the server. Please verify your .env.local file.' },
        { status: 500 }
      );
    }

    // Initialize Stream Chat Server Client
    const serverClient = StreamChat.getInstance(apiKey, apiSecret);
    const channelId = roomCode.toLowerCase();

    // Create the channel server-side using admin privileges
    const channel = serverClient.channel('livestream', channelId, {
      name: roomName.trim(),
      room_code: roomCode,
      created_by_id: userId,
      members: [userId],
    } as any);

    await channel.create();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error creating room on server:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
