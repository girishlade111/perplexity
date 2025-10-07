# Perplexity Clone

A React-based web application that replicates the core functionality of Perplexity.ai, featuring AI-powered search capabilities.

## Features

- AI-powered search functionality
- Conversation history management
- Modern UI with responsive design
- Integration with Gemini AI API

## Tech Stack

- React with TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- Gemini AI API

## Project Structure

```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and API integrations
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/girishlade111/perplexity.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the project for production
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint for code quality checks

## Environment Variables

- `VITE_GEMINI_API_KEY` - Your Gemini API key for AI functionality

## Learn More

- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Gemini API Documentation](https://ai.google.dev/)

## Deployment

This project can be deployed on platforms like Vercel, Netlify, or GitHub Pages.