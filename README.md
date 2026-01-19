<div align="center">
  <img src="public/logo.svg" alt="CurateFlow Logo" width="200" height="200" />
  <h1>CurateFlow</h1>
  <p><strong>Stop Scrolling. Start Curating.</strong></p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  ![GitHub repo size](https://img.shields.io/github/repo-size/sf-bcca/CurateFlow)
  ![GitHub stars](https://img.shields.io/github/stars/sf-bcca/CurateFlow?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/sf-bcca/CurateFlow?style=social)
  ![GitHub issues](https://img.shields.io/github/issues/sf-bcca/CurateFlow)

  <p>
    An AI-powered video curation engine that transforms your intent into structured, purposeful playlists.
    Bypass the algorithm trap and build the perfect flow for learning, working, or relaxing.
  </p>

  <a href="#getting-started">Get Started</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a>
</div>

---

## 🚀 Introduction

CurateFlow isn't just a playlist generator; it's a **learning path architect**. Powered by Google's Gemini AI, it understands not just *what* you want to watch, but *how* you want to experience it. 

Whether you need an **"ELI5" introduction to Quantum Physics** or a **high-energy HIIT workout flow**, CurateFlow builds a cohesive sequence of videos, complete with context and reasoning for every selection.

## ✨ Features

- **🧠 Intelligent Curation:** Go beyond keywords. Describe your goal (e.g., "Learn to bake sourdough from scratch in a weekend") and get a tailored result.
- **🎚️ Depth Control:** Adjust the complexity level to match your expertise:
  - `ELI5` (Explain Like I'm 5)
  - `Beginner`
  - `Intermediate`
  - `Advanced`
  - `Academic/Technical`
- **🌊 Vibe Check:** Set the tone for your session:
  - Educational (Fast-Paced)
  - High Energy
  - Relaxing/ASMR
  - Deep Dive
- **🎓 Course Mode:** Automatically structures videos into a progressive curriculum (Intro → Concepts → Advanced Application).
- **📝 Contextual Reasoning:** AI explains *why* each video was chosen and how it fits into your flow.

## 🛠️ Tech Stack

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **AI:** [Google GenAI SDK](https://www.npmjs.com/package/@google/genai) (Gemini Models)
- **Styling:** Tailwind CSS (implied usage via class names)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- A **Google Gemini API Key** (Get one [here](https://aistudio.google.com/))

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/CurateFlow.git
    cd CurateFlow
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env.local` file in the root directory and add your API key:
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```
    *(Note: This key is used in `vite.config.ts` to populate `process.env.API_KEY`)*

4.  **Run the application:**
    ```bash
    npm run dev
    ```

5.  **Open in Browser:**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.