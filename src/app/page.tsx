'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already logged in, redirect to chat page
  useEffect(() => {
    const savedUserId = localStorage.getItem('yapster-user-id');
    if (savedUserId) {
      router.push('/chat');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMessage('');

    // Clean user ID: alphanumeric, lowercase, hyphens only
    const cleanUserId = nickname
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, '-');

    if (!cleanUserId) {
      setErrorMessage('Nickname must contain valid letters or numbers.');
      setIsLoading(false);
      return;
    }

    try {
      // Save user session details locally
      localStorage.setItem('yapster-user-id', cleanUserId);
      localStorage.setItem('yapster-user-name', fullName.trim() || nickname.trim());
      
      // Navigate to chat
      router.push('/chat');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg-decor">
        <div className="decor-circle circle-1"></div>
        <div className="decor-circle circle-2"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="logo-badge">🚀</div>
          <h1>Welcome to Yapster</h1>
          <p>Real-time chat powered by Stream</p>
        </div>

        {errorMessage && (
          <div className="error-alert">
            <span>⚠️</span> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nickname">Choose a Nickname</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="e.g. coding_wizard"
              maxLength={20}
              required
              disabled={isLoading}
              autoComplete="off"
            />
            <span className="field-hint">Alphanumeric, underscores, or hyphens.</span>
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Display Name (Optional)</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Alex Smith"
              maxLength={30}
              disabled={isLoading}
              autoComplete="name"
            />
          </div>

          <button type="submit" className="btn-login-submit" disabled={isLoading}>
            {isLoading ? (
              <span className="btn-loading">
                <span className="mini-spinner"></span> Connecting...
              </span>
            ) : (
              'Enter Chat Lounge'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
