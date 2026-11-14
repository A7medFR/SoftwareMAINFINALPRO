# TaskFlow &mdash; Modern Productivity & Task Management Web App

[![GitHub Repo](https://img.shields.io/badge/Repository-TaskFlow-blue?style=for-the-badge&logo=github)](https://github.com/A7medFR/SoftwareMAINFINALPRO)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)]()
[![Git Workflow](https://img.shields.io/badge/Git-Multi--Branch%20Workflow-orange?style=for-the-badge&logo=git)](https://git-scm.com/)

> A sleek, responsive, and feature-rich productivity workspace crafted as a collaborative Final Project. Built using clean vanilla HTML5, CSS3, and JavaScript, strictly adhering to modern Git and GitHub branching workflows.

---

## Duo Team Contributors

This project was built collaboratively as a **Duo Team** following best practices in distributed version control:

| # | Contributor Name | Role & Core Responsibilities | Contact / Profile |
|---|------------------|------------------------------|-------------------|
| **1** | **Ahmed Farzdag** | Frontend Architecture, UI Layout, Git Repo Setup, LocalStorage Engine | `a7medfarzdag@gmail.com` |
| **2** | **Mustafa Altayeb** | Task Filtering, Dark Mode Theming, QA Testing & Documentation | `[mustafa@gmail.com]` |

> *Note: If submitting with your team partner, update the table above with your duo partner's exact name and student ID.*

---

## 1. Purpose of the Project

In academic and professional environments, keeping track of daily responsibilities, deadlines, and priorities can quickly become overwhelming. 

**TaskFlow** was developed to provide an intuitive, zero-friction productivity suite that helps individuals and students:
1. **Organize Responsibilities:** Categorize tasks into distinct domains (Coursework, Development, General, and Personal).
2. **Prioritize Effectively:** Instantly spot urgent obligations via priority indicators (Urgent, Medium, Normal).
3. **Monitor Productivity:** Track real-time completion progress with automated productivity analytics and dynamic progress bars.
4. **Ensure Persistence:** Retain all tasks and user theme preferences locally in the browser with zero cloud or database overhead.

---

## 2. Key Features

### Task Management (CRUD)
- **Add Tasks:** Create tasks with titles, brief notes, projects, priorities, and specific due dates.
- **Toggle Completion:** Mark tasks as done with instant visual feedback (strikethrough and opacity changes).
- **Delete Tasks:** Remove individual tasks with responsive toast notifications, or batch-clear all completed tasks with one click.

### Dark and Light Theme Switcher
- Full dark mode support using CSS custom properties (`data-theme="dark"`).
- Automatically remembers the user's selected appearance across browser sessions using `localStorage`.
- High-contrast accessibility and eye-comfort design.

### Real-Time Search and Multi-Criteria Filtering
- **Instant Search:** Dynamic live search by task title, note, or project name with an instant reset button.
- **Filter Views:** Filter on demand by status (`All`, `Active`, `Urgent`, `Completed`) or project category.
- **Flexible Sorting:** Sort tasks dynamically by newest, oldest, highest priority, or upcoming due dates.

### Live Analytics and Productivity Metrics
- **Active and Completed Counters:** Clear breakdown of remaining work and completed tasks.
- **Productivity Rate (%):** Visual percentage completion calculated dynamically as tasks are checked off.

### Keyboard Shortcuts
- Quick-capture input shortcut (<kbd>N</kbd>), live search focus (<kbd>/</kbd>), and theme switcher (<kbd>T</kbd>).

---

## Tech Stack and Architecture

- **Markup:** Semantic HTML5 with accessibility attributes (`aria-labels`, responsive viewport).
- **Styling:** Minimalist CSS3 inspired by Linear and Notion, featuring dark/light custom properties, compact list rows, and zero bloated frameworks.
- **Typography & Icons:** Inter typography, JetBrains Mono for metadata/keys, and inline SVG icons.
- **Scripting:** Pure Vanilla JavaScript (ES6+) with modular state handling, keyboard shortcuts, and native Browser `localStorage` API.
- **Version Control:** Git & GitHub (Multi-branch feature & refactor workflow).

---

## 3. Git Workflow and Branching Strategy

In compliance with the project guidelines, this repository follows a **Feature Branch Workflow**, ensuring that every significant update was developed in isolation before being merged into the `main` production branch:

```text
main -----------------o----------o----------o----------o----------o---- (Production Ready)
                       \        /  \        /  \        /  \        /
feature/ui-dashboard ---o------o    \      /    \      /    \      /
                                     \    /      \    /      \    /
feature/task-crud-storage ------------o--o        \  /        \  /
                                                   \ /          \/
feature/theme-filters-stats ------------------------o--o        /\
                                                        \      /  \
docs/project-documentation ------------------------------o----o    \
                                                                    \
refactor/linear-minimalist-ui ---------------------------------------o
```

### Branch Log and Milestones

1. **`main` (Root):** Initial repository scaffolding and `.gitignore` setup.
2. **`feature/ui-dashboard-layout`:** Created semantic `index.html` structure, CSS reset, color themes, responsive grid, and form controls. *(Merged via PR/no-ff)*
3. **`feature/task-crud-storage`:** Implemented core task creation, deletion, status toggling, and `localStorage` persistence in `app.js`. *(Merged via PR/no-ff)*
4. **`feature/theme-filters-stats`:** Added dark/light mode toggle, dynamic search engine, category filter tabs, sorting algorithm, and productivity score bar. *(Merged via PR/no-ff)*
5. **`docs/project-documentation`:** Crafted comprehensive documentation, project purpose, team contributor credits, and setup guide. *(Merged via PR/no-ff)*
6. **`refactor/linear-minimalist-ui`:** Complete UI/UX overhaul to a sleek, developer-grade Linear / Notion minimalist design with command-style quick capture and keyboard shortcuts. *(Merged via PR/no-ff)*

---

## 4. How to Run Locally

Because TaskFlow is built with native web technologies, **no installation or build tools (like npm or Node.js) are required**:

1. Clone or download this repository:
   ```bash
   git clone https://github.com/A7medFR/SoftwareMAINFINALPRO.git
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

## 5. Deploying to GitHub Pages (Free 1-Click Hosting)

You can share a live working demo of your project with your instructor:

1. In your GitHub repository, go to **Settings** > **Pages** (in the left sidebar).
2. Under **Branch**, select `main` and root folder `/ (root)`, then click **Save**.
3. GitHub will generate a live URL (e.g., `https://a7medfr.github.io/SoftwareMAINFINALPRO/`) within minutes.

---

## Submission Information

- **Course Assignment:** Git & GitHub Collaborative Final Project
- **Format:** Duo Team Collaboration
- **Submission Destination:** `bdryshdhy960@gmail.com`
- **Submitted Deliverables:** 
  - GitHub Repository Link (with full commit & merge history)
  - Live GitHub Pages Link (optional but recommended)

---

&copy; 2026 **TaskFlow Project** &bull; Developed by Ahmed Farzdag & Duo Partner.
