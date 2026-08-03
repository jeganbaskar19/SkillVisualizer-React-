# 🧠 Tech Skill Visualizer

An interactive React application that visualizes your technical skills through dynamic, filterable charts — built to showcase proficiency levels across categories at a glance instead of a static list.

## Features

- **Multiple chart types** — switch between Bar Chart, Doughnut Chart, and Radar Chart views of the same skill data
- **Category filtering** — filter skills by Frontend, Backend, DevOps, Tools, or Languages
- **Skill editor** — add, update, and delete skills with a proficiency slider (0–100%), tagged by category
- **AI Tips tab** — contextual tips/insights based on your current skill set
- **Data import/export** — export your full skill set as a JSON file for backup/sharing, and re-import it later to restore your data
- **Dark mode toggle**
- **Fully responsive UI** with a clean, card-based layout

## Tech Stack

- React (Vite)
- Chart.js / Recharts for data visualization
- Client-side state management for skill CRUD operations
- JSON-based import/export (no backend required)

## How It Works

1. **Charts tab** – Visualize all skills (or a filtered category) as a bar, doughnut, or radar chart
2. **Editor tab** – Add a new skill (choose category + name), then adjust its proficiency with a slider; delete any skill from the list
3. **AI Tips tab** – Get suggestions/insights related to your tracked skills
4. **Data tab** – Export your skills to a `.json` file, or import a previously exported file to restore them

## Running Locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Author

**Jegan Baskar**
Portfolio: https://jeganbaskar.netlify.app
GitHub: https://github.com/jeganbaskar19
LinkedIn: https://linkedin.com/in/jegan2705
