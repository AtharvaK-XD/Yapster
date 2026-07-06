# 💬 Yapster — Next-Gen Real-Time Chat Room Console

Yapster is a premium, real-time chat application built on Next.js, Stream Chat, and Supabase. Crafted with modern, fluid, and immersive visual design aesthetics, it features custom 3D animations, a glassmorphic layout, and secure, container-isolated server integrations.

---

## ✨ Features & Aesthetics

### 🎨 Visual Design & Micro-Interactions
- **🌌 Ambient Dark Mode**: Immersive dark theme warmed by a top-centered radial indigo gradient glow.
- **🛹 3D Parallax Tilt Card**: A login card that tracks the user's cursor dynamically, tilting on multiple axes with distinct Z-depth layers (floating logo, lifted title, and pop-out buttons).
- **🏝️ Dynamic Island Composer**: A message input composer shaped as a floating pill that hovers directly over the chat history with outer rectangular box containers completely removed.
- **🗃️ 3D Sidebar Room Previews**: Chat list previews configured as individual rounded cards that scale and lift vertically (`translateY`/`translateZ`) on hover and active states.
- **🌀 Tactile Spring Animations**: Custom elastic swing entries for modals (`rotateX`) and springy, expanding message bubble additions.
- **📜 Premium Scrollbars**: Custom, ultra-thin semi-transparent indigo scrollbar tracks designed to prevent default thick browser scrollbars.

### 🔒 Security & Performance
- **🔑 Enforced Login Verification**: Authentication tokens and user metadata are bound to `sessionStorage`. Closing a tab or window automatically clears the session, forcing login on fresh visits to protect private communications.
- **⚡ Server-Side Operations**: Room creation and join requests are securely routed through serverless Next.js API endpoints (`/api/create-room` and `/api/join-room`) using administrative SDK credentials.

---

## 🛠️ Tech Stack

- **Core Framework**: [Next.js](https://nextjs.org/) (App Router & Serverless Routes)
- **Database & Auth**: [Supabase](https://supabase.com/) (OAuth Google login / mock authentication)
- **Chat Infrastructure**: [Stream Chat SDK](https://getstream.io/chat/) (Livestream channel models)
- **Styling Engine**: Pure Vanilla CSS (custom variables, cubic-bezier transition curves, and CSS 3D transforms)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Environment Setup
Create a `.env.local` file in the root directory and configure the following credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stream Chat Configuration
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

### 3. Installation
Install the project dependencies:
```bash
npm install
```

### 4. Run Development Server
Run the local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience the application.

---

## 📦 Production Deployment & Build

To compile a production-ready optimized build:
```bash
npm run build
```

To run the built production bundle:
```bash
npm run start
```
