'use client';

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelList,
  ChannelHeader,
  MessageList,
  MessageComposer,
  Window,
  Thread,
  useChatContext,
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

interface ChatContainerProps {
  userId: string;
  userName: string;
  token: string;
  apiKey: string;
  onLogout: () => void;
}

export default function ChatContainer({
  userId,
  userName,
  token,
  apiKey,
  onLogout,
}: ChatContainerProps) {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const client = StreamChat.getInstance(apiKey);
    let isSubscribed = true;

    const initChat = async () => {
      try {
        await client.connectUser(
          {
            id: userId,
            name: userName,
            image: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userId)}`,
          },
          token
        );

        if (!isSubscribed) return;

        const generalChannel = client.channel('messaging', 'general-chat', {
          name: 'General Lounge 💬',
          created_by_id: userId,
        } as any);

        await generalChannel.create();
        await generalChannel.addMembers([userId]);

        if (isSubscribed) {
          setChatClient(client);
        }
      } catch (error) {
        console.error('Error connecting to Stream Chat:', error);
      }
    };

    initChat();

    return () => {
      isSubscribed = false;
      setChatClient(null);
      client.disconnectUser().then(() => {
        console.log('Stream Chat disconnected');
      });
    };
  }, [userId, userName, token, apiKey]);

  const handleCreateChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatClient || !newChannelName.trim() || isCreating) return;

    setIsCreating(true);
    try {
      const channelId = newChannelName
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);

      const channel = chatClient.channel('messaging', channelId, {
        name: newChannelName.trim(),
        created_by_id: userId,
        members: [userId],
      } as any);

      await channel.create();
      setNewChannelName('');
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating channel:', error);
      alert('Failed to create channel');
    } finally {
      setIsCreating(false);
    }
  };

  if (!chatClient) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Connecting to Yapster Chat...</p>
      </div>
    );
  }

  return (
    <Chat client={chatClient} theme="str-chat__theme-dark">
      <ChatLayout 
        onLogout={onLogout} 
        onCreateChannelClick={() => setShowCreateModal(true)} 
      />

      {/* Create Channel Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create a New Channel</h2>
            <form onSubmit={handleCreateChannel}>
              <div className="form-group">
                <label htmlFor="channelName">Channel Name</label>
                <input
                  type="text"
                  id="channelName"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  placeholder="e.g. general-chat, design-team"
                  maxLength={30}
                  required
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setShowCreateModal(false)}
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={isCreating || !newChannelName.trim()}
                >
                  {isCreating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Chat>
  );
}

function ChatLayout({ 
  onLogout, 
  onCreateChannelClick 
}: { 
  onLogout: () => void; 
  onCreateChannelClick: () => void;
}) {
  const { client, channel, setActiveChannel } = useChatContext();

  const handleBackToList = () => {
    setActiveChannel(undefined);
  };

  const hasActiveChannel = !!channel;

  return (
    <div className={`yapster-app-layout ${hasActiveChannel ? 'mobile-chat-active' : 'mobile-sidebar-active'}`}>
      {/* Left Sidebar */}
      <aside className="yapster-sidebar">
        <div className="yapster-sidebar-header">
          <div className="logo-section">
            <span className="logo-icon">🚀</span>
            <h1>Yapster</h1>
          </div>
          
          <button 
            className="btn-create-channel" 
            onClick={onCreateChannelClick}
            title="Create new channel"
          >
            ＋
          </button>
        </div>

        <div className="current-user-badge">
          <img 
            src={client.user?.image || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(client.userID || '')}`} 
            alt={client.user?.name}
            className="user-avatar"
          />
          <div className="user-details">
            <span className="user-name-text">{client.user?.name || client.userID}</span>
            <span className="user-status-text">online</span>
          </div>
          <button className="btn-logout-small" onClick={onLogout} title="Sign Out">
            🚪
          </button>
        </div>

        <div className="channel-list-container">
          <ChannelList
            filters={{ members: { $in: [client.userID || ''] } }}
            sort={{ last_message_at: -1 }}
            options={{ limit: 10 }}
            showChannelSearch
          />
        </div>
      </aside>

      {/* Right Chat Main Pane */}
      <main className="yapster-chat-main">
        <Channel>
          <Window>
            <div className="chat-window-header-wrapper">
              <button 
                className="btn-back-to-list" 
                onClick={handleBackToList} 
                title="Back to Channels"
              >
                ←
              </button>
              <ChannelHeader />
            </div>
            <MessageList />
            <MessageComposer />
          </Window>
          <Thread />
        </Channel>
      </main>
    </div>
  );
}
