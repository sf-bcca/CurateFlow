# CurateFlow

CurateFlow is an intelligent video curation engine built with React, TypeScript, and the Google Gemini API. It generates structured YouTube playlists based on user intent, allowing users to specify constraints like duration, depth level, and "vibe". It can also structure content as a logical course syllabus.

## Project Overview

*   **Type:** Frontend Web Application
*   **Framework:** React (v19) + Vite
*   **Language:** TypeScript
*   **AI Model:** Gemini 2.0 Flash (via `@google/genai` SDK)
*   **Styling:** Lucide React (Icons), likely CSS/Tailwind (inferred standard for this stack, though specific CSS files weren't deeply analyzed, `index.css` is typical).

## Architecture

The project follows a simple, modern React architecture:
*   **`services/geminiService.ts`**: The core logic. It uses the `gemini-3-flash-preview` model with structured JSON output to generate playlists. It defines a system instruction for the "CurateFlow" persona.
*   **`components/`**: Reusable UI components (e.g., `VideoCard`, `Controls`).
*   **`types.ts`**: Shared TypeScript definitions, particularly for the AI response structure (`PlaylistResponse`).
*   **`App.tsx`**: The main application controller and view.

## Setup & Development

### Prerequisites
*   Node.js
*   A Google Gemini API Key

### Configuration
1.  Create a `.env.local` file in the root directory.
2.  Add your API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

### Commands

| Command | Description |
| :--- | :--- |
| `npm install` | Install dependencies. |
| `npm run dev` | Start the development server on `http://localhost:3000`. |
| `npm run build` | Build the project for production. |
| `npm run preview` | Preview the production build locally. |

## Key Conventions

*   **Imports:** Uses the `@` alias to refer to the project root (e.g., `import ... from '@/components/...'`).
*   **Environment Variables:** Accessed via `process.env.API_KEY` or `process.env.GEMINI_API_KEY` (injected by Vite config).
*   **AI Integration:** The `geminiService` enforces a strict JSON schema for AI responses to ensure the UI can reliably render the playlist.
