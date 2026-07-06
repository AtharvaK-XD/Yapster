import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
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

    // Upsert the user on the server side to ensure they exist
    await serverClient.upsertUser({
      id: userId,
      role: 'user',
    });

    // Create the default lobby channel from the server side and add the user
    const lobbyChannel = serverClient.channel('messaging', 'yap-lobby', {
      name: 'Public Lobby 🚀',
      room_code: 'YAP-LOBBY',
      created_by_id: userId,
    } as any);
    await lobbyChannel.create();
    await lobbyChannel.addMembers([userId]);

    // Generate token (expires in 24 hours)
    const token = serverClient.createToken(
      userId,
      Math.floor(Date.now() / 1000) + 24 * 60 * 60
    );

    return NextResponse.json({ token, apiKey });
  } catch (error) {
    console.error('Error generating Stream token:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
