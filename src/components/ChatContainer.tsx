'use client';

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageComposer,
  Window,
  Thread,
  useChatContext,
  useMessageContext,
  useContextMenuContext,
  MessageActions,
  defaultMessageActionSet,
  WithComponents,
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

interface ChatContainerProps {
  userId: string;
  userName: string;
  token: string;
  apiKey: string;
  onLogout: () => void;
}

// ----------------------------------------------------
// CUSTOM MESSAGE ACTIONS: "MESSAGE INFO" DECORATOR
// ----------------------------------------------------
const MessageInfoAction = (props: any) => {
  const { message } = useMessageContext('MessageInfoAction');
  const { client } = useChatContext();
  const { closeMenu } = useContextMenuContext();

  const isMyMessage = message.user?.id === client.userID;

  if (!isMyMessage) return null;

  return (
    <button
      {...props}
      className="str-chat__message-actions-list-item-button"
      onClick={() => {
        if ((window as any).triggerMessageInfoModal) {
          (window as any).triggerMessageInfoModal(message);
        }
        closeMenu();
      }}
    >
      Message Info
    </button>
  );
};

const CustomMessageActions = (props: any) => {
  return (
    <MessageActions
      {...props}
      messageActionSet={[
        ...defaultMessageActionSet,
        {
          Component: MessageInfoAction,
          placement: 'dropdown',
          type: 'message-info',
        },
      ]}
    />
  );
};

const CustomAvatar = (props: any) => {
  const { image, name, user, size } = props;
  const isOnline = user?.online;
  const seed = encodeURIComponent(user?.id || name || 'yapster');
  const avatarUrl = image || `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
  
  // Set a safe fallback size (e.g., 36px) if none is provided by the parent list view container
  const finalSize = size || 36;

  return (
    <div 
      className="str-chat__avatar str-chat__avatar--circle custom-avatar-container" 
      style={{ 
        width: `${finalSize}px`, 
        height: `${finalSize}px`, 
        position: 'relative',
        ['--avatar-size' as any]: `${finalSize}px`
      }}
    >
      <img
        src={avatarUrl}
        alt={name || ''}
        className="str-chat__avatar-image"
        style={{ width: `${finalSize}px`, height: `${finalSize}px`, borderRadius: '50%', objectFit: 'cover' }}
      />
      {user && (
        <span className={`presence-dot ${isOnline ? 'online' : 'offline'}`} />
      )}
    </div>
  );
};

const CustomMessageStatus = (props: any) => {
  const { message, readBy } = props;
  const { client } = useChatContext();

  if (!message) return null;

  const isMyMessage = message.user?.id === client?.userID;
  if (!isMyMessage) return null;

  if (message.status === 'sending') {
    return (
      <span className="msg-status-tick sending" title="Sending...">
        ⚡
      </span>
    );
  }

  if (message.status === 'failed') {
    return (
      <span className="msg-status-tick failed" title="Failed to send">
        ⚠️
      </span>
    );
  }

  const isRead = readBy && readBy.length > 0;

  if (isRead) {
    return (
      <span className="msg-status-tick read" title="Read by recipient">
        ✓✓
      </span>
    );
  }

  return (
    <span className="msg-status-tick delivered" title="Delivered">
      ✓✓
    </span>
  );
};

export default function ChatContainer({
  userId,
  userName,
  token,
  apiKey,
  onLogout,
}: ChatContainerProps) {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    const client = StreamChat.getInstance(apiKey);
    let isSubscribed = true;

    // If client is already connected to this user, skip connection
    if (client.userID === userId) {
      if (isSubscribed) {
        setChatClient(client);
      }
      return;
    }

    const initChat = async () => {
      try {
        const savedPicture = sessionStorage.getItem('yapster-user-picture');

        // Connect the user to Stream Chat
        await client.connectUser(
          {
            id: userId,
            name: userName,
            image: savedPicture || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userId)}`,
          },
          token
        );

        if (isSubscribed) {
          setChatClient(client);
        }
      } catch (error: any) {
        console.error('Error connecting to Stream Chat:', error);
        if (isSubscribed) {
          setConnectionError(
            error.message || 'Failed to authenticate. Please check your internet connection or Stream credentials.'
          );
        }
      }
    };

    initChat();

    return () => {
      isSubscribed = false;
    };
  }, [userId, userName, token, apiKey]);

  const handleLogout = async () => {
    try {
      const client = StreamChat.getInstance(apiKey);
      await client.disconnectUser();
      console.log('Stream Chat disconnected successfully.');
    } catch (error) {
      console.error('Error disconnecting on logout:', error);
    }
    onLogout();
  };

  if (connectionError) {
    return (
      <div className="error-screen">
        <div className="error-card">
          <h2>⚠️ Connection Failed</h2>
          <p>{connectionError}</p>
          <div className="error-actions">
            <button className="btn-retry" onClick={() => window.location.reload()}>
              Retry Connection
            </button>
            <button className="btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

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
      <WithComponents overrides={{
        MessageActions: CustomMessageActions,
        Avatar: CustomAvatar,
        MessageStatus: CustomMessageStatus
      }}>
        <ChatLayout onLogout={handleLogout} userId={userId} />
      </WithComponents>
    </Chat>
  );
}

function ChatLayout({ onLogout, userId }: { onLogout: () => void; userId: string }) {
  const { client, channel, setActiveChannel } = useChatContext();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showMembersList, setShowMembersList] = useState(false);
  const [infoMessage, setInfoMessage] = useState<any | null>(null);
  
  const [newRoomName, setNewRoomName] = useState('');
  const [joinRoomCode, setJoinRoomCode] = useState('');
  
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Global callback bridge for Message Info Action
  useEffect(() => {
    (window as any).triggerMessageInfoModal = (message: any) => {
      setInfoMessage(message);
    };
    return () => {
      (window as any).triggerMessageInfoModal = undefined;
    };
  }, []);

  const handleBackToList = () => {
    setActiveChannel(undefined);
  };

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'YAP-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim() || isCreating) return;

    setIsCreating(true);
    try {
      const roomCode = generateRoomCode();
      const channelId = roomCode.toLowerCase();

      // 1. Call server-side API to create the channel with admin credentials
      const createResponse = await fetch('/api/create-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, roomName: newRoomName.trim(), roomCode }),
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(errorData.error || 'Failed to create room');
      }

      // 2. Initialize and watch the channel client-side now that it has been created
      const targetChannel = client.channel('livestream', channelId);
      await targetChannel.watch();
      
      setNewRoomName('');
      setShowCreateModal(false);
      setActiveChannel(targetChannel);
    } catch (error: any) {
      console.error('Error creating room:', error);
      alert(error.message || 'Failed to create room.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedCode = joinRoomCode.trim().toUpperCase();
    
    if (!formattedCode || isJoining) return;

    setIsJoining(true);
    try {
      if (formattedCode !== 'YAP-LOBBY' && (!formattedCode.startsWith('YAP-') || formattedCode.length !== 8)) {
        alert('Invalid room code format. Code must be like YAP-XXXX');
        setIsJoining(false);
        return;
      }

      const channelId = formattedCode.toLowerCase();
      
      // 1. Call server-side API to add the user to the channel members list
      const joinResponse = await fetch('/api/join-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, roomCode: formattedCode }),
      });

      if (!joinResponse.ok) {
        const errorData = await joinResponse.json();
        throw new Error(errorData.error || 'Failed to join room');
      }

      // 2. Initialize and watch the channel client-side now that the user is a member
      const targetChannel = client.channel('livestream', channelId);
      await targetChannel.watch();

      setJoinRoomCode('');
      setShowJoinModal(false);
      setActiveChannel(targetChannel);
    } catch (error: any) {
      console.error('Error joining room:', error);
      alert(error.message || 'Room not found. Please verify the code and try again.');
    } finally {
      setIsJoining(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Room code "${code}" copied to clipboard! Share it with friends.`);
  };

  // Get users who read the message (read_timestamp >= message_timestamp)
  const getReaders = (msg: any) => {
    if (!channel || !msg) return [];
    
    const readStates = channel.state.read;
    return Object.values(readStates)
      .filter((state: any) => {
        // Exclude the sender
        if (state.user.id === msg.user.id) return false;
        
        const lastRead = new Date(state.last_read).getTime();
        const msgTime = new Date(msg.created_at).getTime();
        
        return lastRead >= msgTime;
      })
      .map((state: any) => state.user);
  };

  const hasActiveChannel = !!channel;

  return (
    <div className={`yapster-app-layout ${hasActiveChannel ? 'mobile-chat-active' : 'mobile-sidebar-active'}`}>
      {/* Left Sidebar */}
      <aside className="yapster-sidebar">
        <div className="yapster-sidebar-header">
          <div className="logo-section">
            <img src="/logo.png" alt="Yapster Logo" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
            <h1>Yapster</h1>
          </div>
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

        <div className="rooms-actions-panel">
          <button className="btn-action-room create" onClick={() => setShowCreateModal(true)}>
            <span>➕</span> Create Room
          </button>
          <button className="btn-action-room join" onClick={() => setShowJoinModal(true)}>
            <span>🔑</span> Join Room
          </button>
        </div>

        <div className="channel-list-title">Your Active Rooms</div>
        <div className="channel-list-container">
          <ChannelList
            filters={{ members: { $in: [client.userID || ''] } }}
            sort={{ last_message_at: -1 }}
            options={{ limit: 15 }}
            showChannelSearch={false}
          />
        </div>
      </aside>

      {/* Right Chat Main Pane */}
      <main className="yapster-chat-main">
        {hasActiveChannel ? (
          <div className="yapster-chat-viewport">
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
                  <div className="custom-channel-header-info">
                    <h3>{(channel.data as any)?.name || 'Chat Room'}</h3>
                    <span 
                      className="room-code-badge" 
                      onClick={() => handleCopyCode((channel.data as any)?.room_code || channel.id?.toUpperCase() || '')}
                      title="Click to copy room code"
                    >
                      Code: {(channel.data as any)?.room_code || channel.id?.toUpperCase() || ''} 📋
                    </span>
                  </div>
                  <button 
                    className={`btn-toggle-members ${showMembersList ? 'active' : ''}`}
                    onClick={() => setShowMembersList(!showMembersList)}
                    title="View members in group"
                  >
                    👥 {Object.keys(channel.state.members).length}
                  </button>
                </div>
                <div className="chat-content-pane">
                  <div className="chat-messages-area">
                    <MessageList />
                    <MessageComposer />
                  </div>
                  
                  {/* Toggleable Group Members sidebar */}
                  {showMembersList && (
                    <aside className="yapster-members-sidebar">
                      <div className="members-sidebar-header">
                        <h4>Group Members</h4>
                        <button className="btn-close-members" onClick={() => setShowMembersList(false)}>×</button>
                      </div>
                      <div className="members-list">
                        {Object.values(channel.state.members).map((member: any) => {
                          const isOwner = member.user.id === (channel.data as any)?.created_by_id;
                          return (
                            <div key={member.user.id} className="member-item">
                              <div className="member-avatar-wrapper">
                                <img 
                                  src={member.user.image || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(member.user.id)}`} 
                                  alt={member.user.name || member.user.id} 
                                  className="member-avatar"
                                />
                                <span className={`presence-dot ${member.user.online ? 'online' : 'offline'}`} />
                              </div>
                              <div className="member-info">
                                <span className="member-name">{member.user.name || member.user.id}</span>
                                {isOwner ? (
                                  <span className="badge-admin">Admin</span>
                                ) : (
                                  <span className="badge-member">Member</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </aside>
                  )}
                </div>
              </Window>
              <Thread />
            </Channel>
          </div>
        ) : (
          <div className="no-active-chat-screen">
            <div className="no-chat-prompt">
              <h2>Select a Room to Start Yapping</h2>
              <p>Create a new chat room or join an existing one using a code from your friends.</p>
              <div className="no-chat-actions">
                <button className="btn-primary" onClick={() => setShowCreateModal(true)}>Create Room</button>
                <button className="btn-secondary" onClick={() => setShowJoinModal(true)}>Join Room</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Create Room Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create a New Room</h2>
            <form onSubmit={handleCreateRoom}>
              <div className="form-group">
                <label htmlFor="roomName">Room Name</label>
                <input
                  type="text"
                  id="roomName"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="e.g. Secret Hangout, Dev Lounge"
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
                  disabled={isCreating || !newRoomName.trim()}
                >
                  {isCreating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Room Modal */}
      {showJoinModal && (
        <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Join a Room</h2>
            <form onSubmit={handleJoinRoom}>
              <div className="form-group">
                <label htmlFor="roomCode">Room Code</label>
                <input
                  type="text"
                  id="roomCode"
                  value={joinRoomCode}
                  onChange={(e) => setJoinRoomCode(e.target.value)}
                  placeholder="e.g. YAP-H7K9"
                  maxLength={15}
                  required
                  autoFocus
                />
                <span className="field-hint">Ask your friend for the code (format: YAP-XXXX).</span>
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setShowJoinModal(false)}
                  disabled={isJoining}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={isJoining || !joinRoomCode.trim()}
                >
                  {isJoining ? 'Joining...' : 'Join'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Read Info Modal */}
      {infoMessage && (
        <div className="modal-overlay" onClick={() => setInfoMessage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Message Info</h2>
            <div className="message-preview-box">
              <p className="message-preview-text">{infoMessage.text}</p>
              <span className="message-preview-time">
                Sent at {new Date(infoMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            
            <div className="readers-section">
              <h3>Seen By</h3>
              {getReaders(infoMessage).length === 0 ? (
                <p className="no-readers">No one has seen this message yet.</p>
              ) : (
                <div className="readers-list">
                  {getReaders(infoMessage).map((user: any) => (
                    <div key={user.id} className="reader-item">
                      <img 
                        src={user.image || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.id)}`} 
                        alt={user.name} 
                        className="reader-avatar"
                      />
                      <span className="reader-name">{user.name || user.id}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setInfoMessage(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
