# 🚀 TaskFlow &mdash; Modern Productivity & Task Management Web App

[![GitHub Repo](https://img.shields.io/badge/Repository-TaskFlow-blue?style=for-the-badge&logo=github)](https://github.com/A7medFR/SoftwareMAINFINALPRO)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)]()
[![Git Workflow](https://img.shields.io/badge/Git-Multi--Branch%20Workflow-orange?style=for-the-badge&logo=git)](https://git-scm.com/)

> A sleek, responsive, and feature-rich productivity dashboard crafted as a collaborative Final Project. Built using clean vanilla HTML5, CSS3, and JavaScript, strictly adhering to modern Git and GitHub branching workflows.

---

## 👥 Duo Team Contributors

This project was built collaboratively as a **Duo Team** following best practices in distributed version control:

| # | Contributor Name | Role & Core Responsibilities | Contact / Profile |
|---|------------------|------------------------------|-------------------|
| **1** | **Ahmed Farzdag** | Frontend Architecture, UI Layout, Git Repo Setup, LocalStorage Engine | `a7medfarzdag@gmail.com` |
| **2** | **[Partner Name]** | Task Filtering, Dark Mode Theming, QA Testing & Documentation | `[partner.email@example.com]` |

> *Note: If submitting with your team partner, you can quickly update the table above with your duo partner's exact name and student ID.*

---

## 🎯 1. Purpose of the Project

In today's fast-paced academic and professional environments, keeping track of daily responsibilities, deadlines, and priorities can quickly become overwhelming. 

**TaskFlow** was developed to provide an intuitive, zero-friction, and visually engaging productivity suite that helps individuals and students:
1. **Organize Responsibilities:** Categorize tasks into distinct domains (Study / University, Work, Personal, and Health).
2. **Prioritize Effectively:** Instantly spot urgent obligations via color-coded priority indicators (High, Medium, Low).
3. **Monitor Productivity:** Track real-time completion progress with automated productivity analytics and dynamic progress bars.
4. **Ensure Persistence:** Retain all tasks and user theme preferences locally in the browser with zero cloud or database overhead.

---

## ✨ 2. Key Features

### 📋 Intelligent Task Management (CRUD)
- **Add Tasks:** Create tasks with titles, detailed notes, categories, priorities, and specific due dates.
- **Toggle Completion:** Mark tasks as done with instant visual feedback (strikethrough and opacity changes).
- **Delete Tasks:** Remove individual tasks with responsive toast notifications, or batch-clear all completed tasks with one click.

### 🌓 Dark & Light Theme Switcher
- Full dark mode support using CSS custom properties (`data-theme="dark"`).
- Automatically remembers the user's selected appearance across browser sessions using `localStorage`.
- High-contrast accessibility and eye-comfort design for night study sessions.

### 🔍 Real-Time Search & Multi-Criteria Filtering
- **Instant Search:** Dynamic live search by task title or description notes with an instant reset button.
- **Filter Tabs:** Filter on demand by status (`All`, `Pending`, `Completed`), urgency (`High Priority`), or domain (`Study`, `Work`, `Personal`).
- **Flexible Sorting:** Sort tasks dynamically by newest, oldest, highest priority, or upcoming due dates.

### 📊 Live Analytics & Productivity Metrics
- **Total Tasks Counter:** Live total count of active and archived items.
- **Pending vs. Completed Counters:** Clear breakdown of remaining work.
- **Productivity Score (%):** Visual percentage completion bar that updates dynamically as you check off items.

### 🔔 Interactive Toast Notification System
- Responsive floating alerts for task creation, status updates, deletions, and theme changes.

---

## 🛠️ Tech Stack & Architecture

- **Markup:** Semantic HTML5 with accessibility attributes (`aria-labels`, responsive viewport).
- **Styling:** Minimalist CSS3 inspired by Linear and Notion, featuring dark/light custom properties, compact list rows, and zero bloated frameworks.
- **Typography & Icons:** Inter typography, JetBrains Mono for metadata/keys, and inline SVG icons.
- **Scripting:** Pure Vanilla JavaScript (ES6+) with modular state handling, keyboard shortcuts, and native Browser `localStorage` API.
- **Version Control:** Git & GitHub (Multi-branch feature & refactor workflow).

---

## 🌿 3. Git Workflow & Branching Strategy

In compliance with the project guidelines, this repository follows a **Feature Branch Workflow**, ensuring that every significant update was developed in isolation before being merged into the `main` production branch:

```text
main ─────────────────●──────────●──────────●──────────●──────────●──── (Production Ready)
                       \        /  \        /  \        /  \        /
feature/ui-dashboard ───●──────●    \      /    \      /    \      /
                                     \    /      \    /      \    /
feature/task-crud-storage ────────────●──●        \  /        \  /
                                                   \ /          \/
feature/theme-filters-stats ────────────────────────●──●        /\
                                                        \      /  \
docs/project-documentation ──────────────────────────────●────●    \
                                                                    \
refactor/linear-minimalist-ui ───────────────────────────────────────●
```

### 📌 Branch Log & Milestones

1. **`main` (Root):** Initial repository scaffolding and `.gitignore` setup.
2. **`feature/ui-dashboard-layout`:** Created semantic `index.html` structure, CSS reset, color themes, responsive grid, and form controls. *(Merged via PR/no-ff)*
3. **`feature/task-crud-storage`:** Implemented core task creation, deletion, status toggling, and `localStorage` persistence in `app.js`. *(Merged via PR/no-ff)*
4. **`feature/theme-filters-stats`:** Added dark/light mode toggle, dynamic search engine, category filter tabs, sorting algorithm, and productivity score bar. *(Merged via PR/no-ff)*
5. **`docs/project-documentation`:** Crafted comprehensive documentation, project purpose, team contributor credits, and setup guide. *(Merged via PR/no-ff)*
6. **`refactor/linear-minimalist-ui`:** Complete UI/UX overhaul to a sleek, developer-grade Linear / Notion minimalist design with command-style quick capture and keyboard shortcuts. *(Merged via PR/no-ff)*

---

## 🚀 4. How to Run Locally

Because TaskFlow is built with native web technologies, **no installation or build tools (like npm or Node.js) are required**:

1. Clone or download this repository:
   ```bash
   git clone <YOUR-GITHUB-REPO-URL>
   cd SoftwareMAINFINALPRO
   ```
2. Open `index.html` directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari):
   - **Windows:** Double-click `index.html` or run:
     ```powershell
     Start-Process index.html
     ```
   - **Mac/Linux:**
     ```bash
     open index.html
     ```

---

## 🌐 5. Deploying to GitHub Pages (Free 1-Click Hosting)

You can share a live working demo of your project with your instructor:

1. Push this repository to GitHub.
2. In your GitHub repository, go to **Settings** > **Pages** (in the left sidebar).
3. Under **Branch**, select `main` and root folder `/ (root)`, then click **Save**.
4. GitHub will generate a live URL (e.g., `https://<username>.github.io/<repo-name>/`) within minutes!

---

## 📬 Submission Information

- **Course Assignment:** Git & GitHub Collaborative Final Project
- **Format:** Duo Team Collaboration
- **Submission Destination:** `bdryshdhy960@gmail.com`
- **Submitted Deliverables:** 
  - GitHub Repository Link (with full commit & merge history)
  - Live GitHub Pages Link (optional but recommended)

---

&copy; 2026 **TaskFlow Project** &bull; Created with ❤️ by Ahmed Farzdag & Duo Partner.
