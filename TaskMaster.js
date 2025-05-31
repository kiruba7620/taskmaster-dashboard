const taskContainer = document.getElementById('taskContainer');
const addTaskBtn = document.getElementById('addTask');
const toggleDarkBtn = document.getElementById('toggleDark');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskContainer.innerHTML = '';
  tasks.forEach((task, index) => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4';

    const card = document.createElement('div');
    card.className = `card border-start border-5 mb-3 priority-${task.priority}`;
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title ${task.status === 'Completed' ? 'text-decoration-line-through text-muted' : ''}">${task.title}</h5>
        <p class="card-text">Status: ${task.status}</p>
        <p class="card-text">Due: ${task.dueDate}</p>
        <div class="d-flex justify-content-end gap-2">
          <button onclick="completeTask(${index})" class="btn btn-sm btn-success" title="Mark as completed"><i class="fas fa-check"></i></button>
          <button onclick="deleteTask(${index})" class="btn btn-sm btn-danger" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
    col.appendChild(card);
    taskContainer.appendChild(col);
  });
}

window.completeTask = (index) => {
  tasks[index].status = 'Completed';
  saveTasks();
  renderTasks();
};

window.deleteTask = (index) => {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
};

addTaskBtn.addEventListener('click', () => {
  const title = document.getElementById('taskTitle').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const dueDate = document.getElementById('dueDate').value;

  if (!title || !dueDate) return alert('Please fill in all fields');

  tasks.push({ title, priority, status: 'Pending', dueDate });
  saveTasks();
  renderTasks();

  document.getElementById('taskTitle').value = '';
  document.getElementById('dueDate').value = '';
});

toggleDarkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.add('show');
  sidebarBackdrop.classList.add('show');
});

sidebarClose.addEventListener('click', () => {
  sidebar.classList.remove('show');
  sidebarBackdrop.classList.remove('show');
});

sidebarBackdrop.addEventListener('click', () => {
  sidebar.classList.remove('show');
  sidebarBackdrop.classList.remove('show');
});

renderTasks();
