'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatContainer from '@/components/ChatContainer';
import { supabase } from '@/lib/supabase';

export default function ChatPage() {
  const router = useRouter();
  const [session, setSession] = useState<{ userId: string; userName: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check local session
    const savedUserId = sessionStorage.getItem('yapster-user-id');
    const savedUserName = sessionStorage.getItem('yapster-user-name');

    if (!savedUserId || !savedUserName) {
      router.push('/');
      return;
    }

    setSession({ userId: savedUserId, userName: savedUserName });

    // 2. Fetch token from server API route
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: savedUserId }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to authenticate with Chat server');
        }

        const data = await response.json();
        setToken(data.token);
        setApiKey(data.apiKey);
      } catch (err: any) {
        console.error('Authentication error:', err);
        setError(err.message || 'Could not connect to Chat server. Make sure server credentials are set.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error signing out from Supabase:', err);
    }
    sessionStorage.removeItem('yapster-user-id');
    sessionStorage.removeItem('yapster-user-name');
    sessionStorage.removeItem('yapster-user-picture');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading your chat session...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <div className="error-card">
          <h2>⚠️ Connection Error</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button className="btn-retry" onClick={() => window.location.reload()}>
              Retry Connection
            </button>
            <button className="btn-secondary" onClick={handleLogout}>
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!session || !token || !apiKey) {
    return null; // Redirecting
  }

  return (
    <ChatContainer
      userId={session.userId}
      userName={session.userName}
      token={token}
      apiKey={apiKey}
      onLogout={handleLogout}
    />
  );
}
