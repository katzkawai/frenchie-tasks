// Task management
let tasks = [];
let currentFilter = 'all';

// DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const remainingTasksEl = document.getElementById('remainingTasks');
const filterBtns = document.querySelectorAll('.filter-btn');
const speechBubble = document.getElementById('speechBubble');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
    updateStats();
});

// Add task event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Filter button event listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderTasks();
    });
});

// Add a new task
function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        showMessage('タスクを入力してね！🐶');
        taskInput.focus();
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.unshift(task);
    saveTasks();
    taskInput.value = '';
    renderTasks();
    updateStats();
    showMessage('タスクを追加したよ！🦴');
    taskInput.focus();
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
        
        if (task.completed) {
            showMessage('よくできました！🎉');
        } else {
            showMessage('がんばって！💪');
        }
    }
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
    showMessage('削除したよ！👋');
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        taskList.style.display = 'none';
    } else {
        emptyState.classList.remove('show');
        taskList.style.display = 'block';
        
        filteredTasks.forEach(task => {
            const li = createTaskElement(task);
            taskList.appendChild(li);
        });
    }
}

// Create task element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;
    
    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));
    
    // Task text
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '削除';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    
    return li;
}

// Get filtered tasks
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

// Update statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const remaining = total - completed;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    remainingTasksEl.textContent = remaining;
}

// Show message in speech bubble
function showMessage(message) {
    speechBubble.textContent = message;
    speechBubble.style.animation = 'none';
    setTimeout(() => {
        speechBubble.style.animation = 'fadeIn 0.5s ease-in';
    }, 10);
    
    // Reset to default message after 3 seconds
    setTimeout(() => {
        speechBubble.textContent = 'がんばって！🦴';
    }, 3000);
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('frenchie-tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const saved = localStorage.getItem('frenchie-tasks');
    if (saved) {
        try {
            tasks = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load tasks:', e);
            tasks = [];
        }
    }
}

// Add some encouraging messages based on progress
function getEncouragingMessage() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    
    if (total === 0) {
        return 'タスクを追加してね！🐾';
    }
    
    if (completed === total) {
        return 'すべて完了！すごい！🎉';
    }
    
    const percentage = (completed / total) * 100;
    
    if (percentage >= 75) {
        return 'もう少しだ！がんばって！💪';
    } else if (percentage >= 50) {
        return '順調だね！👍';
    } else if (percentage >= 25) {
        return 'いい感じ！🌟';
    } else {
        return 'がんばって！🦴';
    }
}

// Update encouraging message periodically
setInterval(() => {
    if (speechBubble.textContent === 'がんばって！🦴') {
        speechBubble.textContent = getEncouragingMessage();
    }
}, 10000);
