/**
 * TaskFlow &mdash; Workspace Engine (Linear / Notion Minimalist Edition)
 * Final Project: Git & GitHub Duo Workflow
 */

// Application State
const state = {
    tasks: [],
    view: 'all',          // 'all' | 'active' | 'urgent' | 'completed'
    projectFilter: 'all', // 'all' | 'Coursework' | 'Development' | etc.
    searchQuery: '',
    sortBy: 'date-desc',
    theme: 'dark'
};

const STORAGE_KEY = 'taskflow_tasks_v2';
const THEME_KEY = 'taskflow_theme_pref';

// DOM References
const quickAddForm = document.getElementById('quickAddForm');
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const prioritySelect = document.getElementById('prioritySelect');
const dueDateInput = document.getElementById('dueDateInput');
const taskNoteInput = document.getElementById('taskNoteInput');

const taskListContainer = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const currentViewLabel = document.getElementById('currentViewLabel');

const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const sortSelect = document.getElementById('sortSelect');
const projectFilterSelect = document.getElementById('projectFilterSelect');
const viewTabs = document.getElementById('viewTabs');
const clearDoneBtn = document.getElementById('clearDoneBtn');

const statActive = document.getElementById('statActive');
const statCompleted = document.getElementById('statCompleted');
const statRate = document.getElementById('statRate');

const countAll = document.getElementById('countAll');
const countActive = document.getElementById('countActive');
const countUrgent = document.getElementById('countUrgent');
const countCompleted = document.getElementById('countCompleted');

const themeToggle = document.getElementById('themeToggle');
const toastNotification = document.getElementById('toastNotification');

// Authentic Default Tasks
const INITIAL_TASKS = [
    {
        id: 't-101',
        title: 'Complete Git & GitHub Duo Final Project',
        note: 'Multi-branch workflow with atomic commits and PR-style merges.',
        project: 'Coursework',
        priority: 'urgent',
        dueDate: getRelativeDate(2),
        completed: false,
        createdAt: Date.now() - 3600000 * 5
    },
    {
        id: 't-102',
        title: 'Refactor UI to minimalist Linear / Notion layout',
        note: 'Eliminated AI clichés; implemented sleek typography and command capture.',
        project: 'Development',
        priority: 'medium',
        dueDate: getRelativeDate(1),
        completed: true,
        createdAt: Date.now() - 3600000 * 12
    },
    {
        id: 't-103',
        title: 'Review collaborator contributions & documentation',
        note: 'Confirm both team members are credited in README.md and repo history.',
        project: 'Coursework',
        priority: 'none',
        dueDate: getRelativeDate(3),
        completed: false,
        createdAt: Date.now() - 3600000 * 24
    },
    {
        id: 't-104',
        title: 'Submit repository link to bdryshdhy960@gmail.com',
        note: 'Final email delivery with GitHub remote link and branch log.',
        project: 'Coursework',
        priority: 'urgent',
        dueDate: getRelativeDate(4),
        completed: false,
        createdAt: Date.now() - 3600000 * 30
    }
];

// Helper: generate ISO date YYYY-MM-DD offset by days
function getRelativeDate(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
}

// Format date nicely for human display
function formatDueChip(dateStr) {
    if (!dateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const target = new Date(dateStr + 'T00:00:00');
    const diffTime = target - today;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return { text: `${Math.abs(diffDays)}d overdue`, isOverdue: true };
    } else if (diffDays === 0) {
        return { text: 'Today', isOverdue: false };
    } else if (diffDays === 1) {
        return { text: 'Tomorrow', isOverdue: false };
    } else if (diffDays < 7) {
        const weekday = target.toLocaleDateString('en-US', { weekday: 'short' });
        return { text: weekday, isOverdue: false };
    } else {
        const monthDay = target.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return { text: monthDay, isOverdue: false };
    }
}

// ==========================================================================
// Initialization
// ==========================================================================
function init() {
    initTheme();
    loadTasks();
    setupListeners();
    render();
}

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(saved);
}

function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
    const next = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(`Switched to ${next} mode`);
}

// ==========================================================================
// LocalStorage Persistence
// ==========================================================================
function loadTasks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            state.tasks = JSON.parse(stored);
        } else {
            state.tasks = [...INITIAL_TASKS];
            saveTasks();
        }
    } catch (e) {
        console.error('Failed to parse localStorage tasks:', e);
        state.tasks = [...INITIAL_TASKS];
    }
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    } catch (e) {
        console.error('Failed to write tasks to localStorage:', e);
    }
}

// ==========================================================================
// Event Listeners
// ==========================================================================
function setupListeners() {
    // Quick Add Form
    quickAddForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskInput.value.trim();
        if (!title) return;

        const newTask = {
            id: 't-' + Date.now(),
            title: title,
            note: taskNoteInput.value.trim(),
            project: categorySelect.value,
            priority: prioritySelect.value,
            dueDate: dueDateInput.value,
            completed: false,
            createdAt: Date.now()
        };

        state.tasks.unshift(newTask);
        saveTasks();

        taskInput.value = '';
        taskNoteInput.value = '';
        taskInput.focus();

        render();
        showToast('Task added');
    });

    // View Tabs
    viewTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.seg-btn');
        if (!btn) return;

        document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        state.view = btn.dataset.view;
        const viewLabels = {
            all: 'All Tasks',
            active: 'Active',
            urgent: 'Urgent',
            completed: 'Completed'
        };
        currentViewLabel.textContent = viewLabels[state.view] || 'Tasks';
        render();
    });

    // Search Input
    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
        render();
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        state.searchQuery = '';
        clearSearchBtn.style.display = 'none';
        searchInput.focus();
        render();
    });

    // Filters & Sorting
    sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        render();
    });

    projectFilterSelect.addEventListener('change', (e) => {
        state.projectFilter = e.target.value;
        render();
    });

    clearDoneBtn.addEventListener('click', () => {
        const doneCount = state.tasks.filter(t => t.completed).length;
        if (!doneCount) {
            showToast('No completed tasks to clear');
            return;
        }
        state.tasks = state.tasks.filter(t => !t.completed);
        saveTasks();
        render();
        showToast(`Cleared ${doneCount} completed task(s)`);
    });

    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // Ignore if currently typing inside an input/select
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        const isTyping = ['input', 'select', 'textarea'].includes(activeTag);

        if (e.key === 'Escape') {
            if (document.activeElement) document.activeElement.blur();
            if (state.searchQuery) {
                searchInput.value = '';
                state.searchQuery = '';
                clearSearchBtn.style.display = 'none';
                render();
            }
            return;
        }

        if (isTyping) return;

        if (e.key.toLowerCase() === 'n') {
            e.preventDefault();
            taskInput.focus();
        } else if (e.key === '/') {
            e.preventDefault();
            searchInput.focus();
        } else if (e.key.toLowerCase() === 't') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

// ==========================================================================
// Task Actions
// ==========================================================================
function toggleTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;

    task.completed = !task.completed;
    saveTasks();
    render();
    showToast(task.completed ? 'Task marked complete' : 'Task restored');
}

function deleteTask(id) {
    state.tasks = state.tasks.filter(t => t.id !== id);
    saveTasks();
    render();
    showToast('Task deleted');
}

// ==========================================================================
// Filtering & Sorting
// ==========================================================================
function getVisibleTasks() {
    return state.tasks.filter(task => {
        // View filtering
        if (state.view === 'active' && task.completed) return false;
        if (state.view === 'completed' && !task.completed) return false;
        if (state.view === 'urgent' && task.priority !== 'urgent') return false;

        // Project filtering
        if (state.projectFilter !== 'all' && task.project !== state.projectFilter) return false;

        // Search filtering
        if (state.searchQuery) {
            const inTitle = task.title.toLowerCase().includes(state.searchQuery);
            const inNote = task.note && task.note.toLowerCase().includes(state.searchQuery);
            const inProject = task.project.toLowerCase().includes(state.searchQuery);
            if (!inTitle && !inNote && !inProject) return false;
        }

        return true;
    }).sort((a, b) => {
        if (state.sortBy === 'date-desc') {
            return b.createdAt - a.createdAt;
        } else if (state.sortBy === 'date-asc') {
            return a.createdAt - b.createdAt;
        } else if (state.sortBy === 'priority') {
            const rank = { urgent: 3, medium: 2, none: 1 };
            return (rank[b.priority] || 1) - (rank[a.priority] || 1);
        } else if (state.sortBy === 'due-date') {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return a.dueDate.localeCompare(b.dueDate);
        }
        return 0;
    });
}

// ==========================================================================
// DOM Rendering
// ==========================================================================
function render() {
    updateCounters();
    const visibleTasks = getVisibleTasks();

    if (visibleTasks.length === 0) {
        taskListContainer.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    taskListContainer.innerHTML = visibleTasks.map(task => {
        const dueInfo = formatDueChip(task.dueDate);
        const priorityLabels = { urgent: 'Urgent', medium: 'Medium', none: 'Normal' };

        return `
            <div class="task-row ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="checkbox-cell">
                    <button class="check-circle" onclick="toggleTask('${task.id}')" aria-label="Toggle task completion">
                        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </button>
                </div>

                <div class="content-cell">
                    <div class="row-primary">
                        <span class="task-text">${escapeHTML(task.title)}</span>
                    </div>

                    ${task.note ? `<div class="task-inline-note">${escapeHTML(task.note)}</div>` : ''}

                    <div class="row-secondary">
                        <span class="tag-badge tag-project">#${escapeHTML(task.project.toLowerCase())}</span>

                        <span class="priority-indicator priority-${task.priority}">
                            <span class="priority-dot"></span>
                            ${priorityLabels[task.priority] || 'Normal'}
                        </span>

                        ${dueInfo ? `
                            <span class="due-chip ${dueInfo.isOverdue && !task.completed ? 'overdue' : ''}">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                ${dueInfo.text}
                            </span>
                        ` : ''}
                    </div>
                </div>

                <div class="actions-cell">
                    <button class="row-btn btn-delete" onclick="deleteTask('${task.id}')" title="Delete task">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function updateCounters() {
    const total = state.tasks.length;
    const completed = state.tasks.filter(t => t.completed).length;
    const active = total - completed;
    const urgent = state.tasks.filter(t => t.priority === 'urgent' && !t.completed).length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    countAll.textContent = total;
    countActive.textContent = active;
    countUrgent.textContent = urgent;
    countCompleted.textContent = completed;

    statActive.textContent = active;
    statCompleted.textContent = completed;
    statRate.textContent = `${rate}%`;
}

function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

let toastTimer = null;
function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('visible');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toastNotification.classList.remove('visible');
    }, 2200);
}

// Launch
document.addEventListener('DOMContentLoaded', init);
