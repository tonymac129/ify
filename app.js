document.addEventListener("DOMContentLoaded", function() {
  const todoInput = document.getElementById('task-input');
const saveTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const audio = document.getElementById("ding");

 saveTaskBtn.addEventListener('click', function() {
    const taskText = todoInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        const remove = document.createElement('span');
        remove.classList.add('remove');
        remove.innerHTML = '<i class=\"fa-solid fa-trash fa-bounce\" style=\"color: #ffffff;\"></i>';
        
        taskItem.innerHTML = "<span class=\"complete\">◯</span>"+taskText;
        taskItem.setAttribute('data-task', taskText);
        
        
        taskList.appendChild(taskItem);
        taskItem.appendChild(remove);
        todoInput.value = "";

        saveTasksToStorage();
    }
});

taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('fa-solid')) {
        const taskItem = event.target.closest('li');
        taskList.removeChild(taskItem);

        const taskText = taskItem.getAttribute('data-task');
        const text = taskItem.innerText;
        console.log(text);
        removeTaskFromStorage(taskText);
    }
    if (event.target.classList.contains('complete')) {
        audio.play();
        const taskItem = event.target.closest('li');
        taskList.removeChild(taskItem);
        const taskText = taskItem.getAttribute('data-task');
        removeTaskFromStorage(taskText);
        
    }
});



function removeTaskFromStorage(taskText) {
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskIndexToDelete = tasks.findIndex(task => task === taskText);

if (taskIndexToDelete !== -1) {
  tasks.splice(taskIndexToDelete, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
}


function loadTasksFromStorage() {
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach(taskText => {
const taskItem = document.createElement('li');
const remove = document.createElement('span');
remove.classList.add('remove');
remove.innerHTML = '<i class=\"fa-solid fa-trash\" style=\"color: #ffffff;\"></i>';

taskItem.innerHTML = "<span class=\"complete\">◯</span>" + taskText;
taskItem.setAttribute('data-task', taskText);

taskList.appendChild(taskItem);
taskItem.appendChild(remove);
});
}


function saveTasksToStorage() {
const tasks = [];
const taskItems = document.querySelectorAll('#task-list li');
taskItems.forEach(taskItem => tasks.push(taskItem.getAttribute('data-task')));
localStorage.setItem('tasks', JSON.stringify(tasks));
}

loadTasksFromStorage();

})
