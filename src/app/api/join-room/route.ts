import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';

export async function POST(request: Request) {
  try {
    const { userId, roomCode } = await request.json();

    if (!userId || !roomCode) {
      return NextResponse.json({ error: 'User ID and Room Code are required' }, { status: 400 });
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

    // Query Stream Chat to check if the channel exists
    const channels = await serverClient.queryChannels({
      type: 'livestream',
      id: channelId,
    });

    if (channels.length === 0) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const targetChannel = channels[0];

    // Add the user to the channel using admin privileges
    await targetChannel.addMembers([userId]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error joining room on server:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
