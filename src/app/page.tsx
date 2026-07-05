'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isConfigured, setIsConfigured] = useState(true);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Check if credentials are set
  useEffect(() => {
    if (!clientId || clientId === 'your_google_client_id_here') {
      setIsConfigured(false);
    } else {
      setIsConfigured(true);
    }
  }, [clientId]);

  // If already logged in, redirect to chat page
  useEffect(() => {
    const savedUserId = localStorage.getItem('yapster-user-id');
    if (savedUserId) {
      router.push('/chat');
    }
  }, [router]);

  const handleCredentialResponse = async (response: any) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const idToken = response.credential;
      if (!idToken) throw new Error('No credential returned from Google');

      // Decode the JWT token safely
      const base64Url = idToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decodedPayload = JSON.parse(jsonPayload);

      const googleUserId = decodedPayload.sub;
      const googleName = decodedPayload.name;
      const googlePicture = decodedPayload.picture;

      if (!googleUserId) {
        throw new Error('Google User ID (sub) not found in token');
      }

      const cleanUserId = `google-${googleUserId}`;

      localStorage.setItem('yapster-user-id', cleanUserId);
      localStorage.setItem('yapster-user-name', googleName);
      localStorage.setItem('yapster-user-picture', googlePicture || '');
      
      router.push('/chat');
    } catch (error: any) {
      console.error('Google Sign-in failed:', error);
      setErrorMessage(error.message || 'Google Sign-in failed. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isConfigured) return;

    const initGoogleSignIn = () => {
      const g = (window as any).google;
      if (g) {
        g.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });
        g.accounts.id.renderButton(
          document.getElementById('google-signin-btn'),
          { 
            theme: 'filled_blue', 
            size: 'large', 
            width: '320',
            text: 'signin_with',
            shape: 'pill'
          }
        );
      }
    };

    if ((window as any).google) {
      initGoogleSignIn();
    } else {
      const checkInterval = setInterval(() => {
        if ((window as any).google) {
          initGoogleSignIn();
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }
  }, [isConfigured, clientId]);

  const handleMockLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockId = Math.floor(100000 + Math.random() * 900000).toString();
      const mockUserId = `google-mock-${mockId}`;
      const mockName = `Developer Account #${mockId.slice(-3)}`;
      const mockPicture = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${mockUserId}`;

      localStorage.setItem('yapster-user-id', mockUserId);
      localStorage.setItem('yapster-user-name', mockName);
      localStorage.setItem('yapster-user-picture', mockPicture);
      
      router.push('/chat');
    }, 600);
  };

  return (
    <div className="login-container">
      {isConfigured && (
        <Script 
          src="https://accounts.google.com/gsi/client" 
          strategy="afterInteractive"
        />
      )}

      <div className="login-card">
        <div className="login-header">
          <div className="logo-badge">
            <img src="/logo.png" alt="Yapster Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          </div>
          <h1>Welcome to Yapster</h1>
          <p>Real-time chat powered by Stream & Google</p>
        </div>

        {errorMessage && (
          <div className="error-alert">
            <span>⚠️</span> {errorMessage}
          </div>
        )}

        <div className="login-oauth-section">
          {isConfigured ? (
            <div id="google-signin-btn" className="google-btn-wrapper"></div>
          ) : (
            <button 
              onClick={handleMockLogin} 
              className="btn-google-login-custom"
              disabled={isLoading}
            >
              <svg className="google-icon-svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.78-2.35-.78-4.7 0-7.05z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>
          )}
          
          {isLoading && (
            <div className="oauth-loading">
              <span className="mini-spinner"></span> Connecting...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
