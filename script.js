document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;

            // Mark task as completed
            if (task.completed) {
                li.classList.add('completed');
            }

            // Toggle task completion on click
            li.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the toggle completion
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add new task
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newTask = {
            text: todoInput.value,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        todoInput.value = '';
    });

    // Initial render
    renderTasks();
});
