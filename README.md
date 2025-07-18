# 🛒 Wally – AI-Powered Smart Shopping Assistant

**Wally** is your intelligent, AI-driven shopping companion that helps users explore, compare, and manage products through natural conversation. Built for the Walmart Sparkathon, Wally blends conversational UX with smart cart and category-based insights – all with offline-first design in mind.

## 🔥 Features

- 💬 **AI Chat** – Ask Wally anything, from product searches to gift ideas
- 🧠 **Semantic Prompt Categorization** – Your queries are grouped into smart categories (e.g., "Gadgets", "Wellness", "Essentials")
- 🛍️ **Smart Cart & Compare** – Add items to cart or comparison tray, complete with mini badges and persistent state
- 💡 **Recent Prompts by Category** – View and revisit past queries in each category
- 💾 **Offline-First Experience** – Prompts and results persist via `localStorage` even on refresh
- 🌗 **Light/Dark Theme Toggle**

## ⚙️ Tech Stack

- **Frontend**: React, TailwindCSS, React Router, Context API
- **Backend**: Node.js, Express, Cohere AI API (for embeddings)
- **Storage**: localStorage (frontend), `categoryEmbeddings.json` (backend)

## 🔮 Future Scope

Wally has been designed with extensibility in mind. Planned future enhancements include:

- 📦 **Live Product Search Integration** – Connect Wally with real-time Walmart APIs or affiliate product APIs to fetch actual product listings.
- 🧑‍🤝‍🧑 **User Accounts** – Allow users to log in and save carts, comparisons, and prompt histories across devices.
- 🗣️ **Voice-Based Queries** – Enable microphone input for hands-free product discovery.
- 📱 **PWA Support** – Make Wally installable as a Progressive Web App for a native mobile experience.
- ✨ **AI Image Shopping** – Let users upload product images (or moodboards) to get intelligent product suggestions.

These features are modular and can be added iteratively for deployment-ready scalability.

## Made with ❤️ for Walmart Sparkathon

🎥 [Watch the full demo on YouTube] (https://youtu.be/2T-aeaSCeiM)
