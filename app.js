/**
 * TaskFlow - Core Task Management & LocalStorage Engine
 * Part of Final Project: Git & GitHub Duo Workflow
 */

// Application State
const state = {
    tasks: [],
    currentFilter: 'all',
    searchQuery: '',
    sortBy: 'newest',
    theme: 'light'
};

const STORAGE_KEY = 'taskflow_data_v1';
const THEME_KEY = 'taskflow_theme';

// DOM Element References
const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskCategoryInput = document.getElementById('taskCategory');
const taskPriorityInput = document.getElementById('taskPriority');
const taskDueDateInput = document.getElementById('taskDueDate');
const taskDescInput = document.getElementById('taskDesc');
const taskListContainer = document.getElementById('taskList');
const emptyStateElement = document.getElementById('emptyState');

// Initial Sample Data (Demonstrates capability on first visit)
const DEFAULT_TASKS = [
    {
        id: 'task-1',
        title: 'Complete Git & GitHub Duo Final Project',
        description: 'Implement multi-branch workflow, detailed Readme.md, and merge into main branch.',
        category: 'Study',
        priority: 'high',
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        completed: false,
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
        id: 'task-2',
        title: 'Review Pull Request & Documentation',
        description: 'Verify project purpose, key features, and contributor names in README.md.',
        category: 'Work',
        priority: 'medium',
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        completed: true,
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
    },
    {
        id: 'task-3',
        title: 'Submit Repository Link to Instructor',
        description: 'Send GitHub repository link to bdryshdhy960@gmail.com upon project completion.',
        category: 'Study',
        priority: 'high',
        dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
        completed: false,
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
    }
];

// Initialize Application
function initApp() {
    loadTasks();
    setupCoreEventListeners();
    renderTasks();
}

// Load tasks from LocalStorage or default
function loadTasks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            state.tasks = JSON.parse(stored);
        } else {
            state.tasks = [...DEFAULT_TASKS];
            saveTasks();
        }
    } catch (e) {
        console.error('Error loading tasks from localStorage', e);
        state.tasks = [...DEFAULT_TASKS];
    }
}

// Persist tasks to LocalStorage
function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    } catch (e) {
        console.error('Error saving tasks to localStorage', e);
    }
}

// Setup form submission and listeners
function setupCoreEventListeners() {
    if (taskForm) {
        taskForm.addEventListener('submit', handleTaskSubmit);
    }
}

// Handle Task Creation
function handleTaskSubmit(e) {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    if (!title) {
        showToast('Please enter a task title.', 'warning');
        return;
    }

    const newTask = {
        id: 'task-' + Date.now(),
        title: title,
        category: taskCategoryInput.value,
        priority: taskPriorityInput.value,
        dueDate: taskDueDateInput.value,
        description: taskDescInput.value.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };

    state.tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    taskForm.reset();

    showToast(`Task "${title}" created successfully!`, 'success');
}

// Toggle Task Completion Status
function toggleTaskCompletion(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    saveTasks();
    renderTasks();

    const message = task.completed ? 'Task marked as completed!' : 'Task restored to pending.';
    showToast(message, 'info');
}

// Delete Task
function deleteTask(taskId) {
    const taskIndex = state.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const taskTitle = state.tasks[taskIndex].title;
    state.tasks.splice(taskIndex, 1);
    saveTasks();
    renderTasks();

    showToast(`Deleted task: "${taskTitle}"`, 'delete');
}

// Filter and Sort Tasks
function getFilteredTasks() {
    return state.tasks.filter(task => {
        // Status & Category filters
        if (state.currentFilter === 'pending' && task.completed) return false;
        if (state.currentFilter === 'completed' && !task.completed) return false;
        if (state.currentFilter === 'high' && task.priority !== 'high') return false;
        if (['Study', 'Work', 'Personal', 'Health'].includes(state.currentFilter)) {
            if (task.category !== state.currentFilter) return false;
        }

        // Search query filter
        if (state.searchQuery) {
            const query = state.searchQuery.toLowerCase();
            const titleMatch = task.title.toLowerCase().includes(query);
            const descMatch = task.description && task.description.toLowerCase().includes(query);
            if (!titleMatch && !descMatch) return false;
        }

        return true;
    }).sort((a, b) => {
        if (state.sortBy === 'newest') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (state.sortBy === 'oldest') {
            return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (state.sortBy === 'priority') {
            const weights = { high: 3, medium: 2, low: 1 };
            return weights[b.priority] - weights[a.priority];
        } else if (state.sortBy === 'dueDate') {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return 0;
    });
}

// Render Tasks to DOM
function renderTasks() {
    const filteredTasks = getFilteredTasks();

    if (filteredTasks.length === 0) {
        taskListContainer.innerHTML = '';
        emptyStateElement.style.display = 'block';
    } else {
        emptyStateElement.style.display = 'none';
        taskListContainer.innerHTML = filteredTasks.map(task => {
            const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date(new Date().toDateString());
            const safeTitle = escapeHTML(task.title);
            const safeDesc = escapeHTML(task.description || '');

            return `
                <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                    <div class="task-checkbox-wrapper">
                        <input type="checkbox" 
                               class="task-checkbox" 
                               ${task.completed ? 'checked' : ''} 
                               onchange="toggleTaskCompletion('${task.id}')"
                               aria-label="Mark task complete">
                    </div>
                    <div class="task-content">
                        <div class="task-header-row">
                            <span class="task-title">${safeTitle}</span>
                            <div class="task-actions">
                                <button class="btn-icon delete" 
                                        onclick="deleteTask('${task.id}')" 
                                        title="Delete task"
                                        aria-label="Delete task">
                                    <i class="fa-regular fa-trash-can"></i>
                                </button>
                            </div>
                        </div>

                        ${safeDesc ? `<p class="task-desc">${safeDesc}</p>` : ''}

                        <div class="task-meta-row">
                            <span class="tag tag-category">${task.category}</span>
                            <span class="tag tag-priority-${task.priority}">Priority: ${task.priority}</span>
                            ${task.dueDate ? `
                                <span class="task-due-date ${isOverdue ? 'overdue' : ''}">
                                    <i class="fa-regular fa-calendar"></i>
                                    ${task.dueDate} ${isOverdue ? '(Overdue)' : ''}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Trigger stats update if function exists (expanded in feature branch)
    if (typeof updateStatsDisplay === 'function') {
        updateStatsDisplay();
    }
}

// Utility: Escape HTML to prevent injection
function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Toast Notification System
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = {
        success: 'fa-solid fa-circle-check',
        info: 'fa-solid fa-circle-info',
        warning: 'fa-solid fa-triangle-exclamation',
        delete: 'fa-solid fa-trash'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// Auto-run initialization on script load
document.addEventListener('DOMContentLoaded', initApp);
