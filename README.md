# Perplexity Clone

A React + TypeScript web application that replicates the core functionality of Perplexity.ai — an AI-powered conversational search experience, built with Google's Gemini API.

## Features

- AI-powered search with conversational answers (Gemini)
- Conversation history management
- Modern, responsive UI
- Source-style answer presentation
- Client-side React SPA — no backend needed

## Tech Stack

- [React 18](https://reactjs.org/) with TypeScript
- [Vite 5](https://vitejs.dev/) — build tool
- [Tailwind CSS 3](https://tailwindcss.com/) — styling
- [Google Gemini API](https://ai.google.dev/) (`@google/generative-ai`) — AI answers
- lucide-react icons, date-fns, uuid

## Project Structure

```
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .env.example          # VITE_GEMINI_API_KEY=<redacted>
└── src/
    ├── App.tsx          # Main application component
    ├── main.tsx         # Entry point
    ├── index.css        # Global styles
    ├── components/     # React components
    ├── hooks/          # Custom React hooks
    ├── lib/            # Utility functions and Gemini integration (gemini.ts)
    └── types/          # TypeScript type definitions
```

## Quick Start

Requirements: Node.js (LTS) and npm.

1. Clone the repository:

   ```bash
   git clone https://github.com/girishlade111/perplexity.git
   cd perplexity
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/) and create a `.env` file (see `.env.example`):

   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` — starts the development server
- `npm run build` — builds the project for production (`dist/`)
- `npm run preview` — previews the production build locally
- `npm run lint` — runs ESLint

## Environment Variables

- `VITE_GEMINI_API_KEY` — your Gemini API key (required; the app throws at startup without it)

## Deploy Notes

The production build (`npm run build`) is fully static (`dist/`). Deploy it to any static host (GitHub Pages, Cloudflare Pages, Netlify). Set `VITE_GEMINI_API_KEY` as a build-time environment variable on the hosting platform — it is baked into the client bundle at build time.

## Learn More

- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Gemini API Documentation](https://ai.google.dev/)

---

Built by Girish Lade — https://ladestack.in
