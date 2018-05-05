//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners(); 

//Load all event listeners
function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask); 
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear even button
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks events
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS 
function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
    tasks.forEach(function(task){
      // create li element 
      const li = document.createElement('li');
      // add class
      li.className = 'collection-item';
      // create text node append to li 
      li.appendChild(document.createTextNode(task));
      // create new link element
      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      // Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // Append the link to li
      li.appendChild(link);
      // Append the li to the ul
      taskList.appendChild(li);
    })
}


//Add task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }
    // create li element 
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node append to li 
    li.appendChild(document.createTextNode(taskInput.value)); 
    // create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append the li to the ul
    taskList.appendChild(li);

    // store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input
    taskInput.value = '';

  e.preventDefault(); 
}

// Store task in LS
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove tasks
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    
    // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

  function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
      tasks.forEach(function(task, index){
        if(taskItem.textContent == task){
          tasks.splice(index,1);
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

// clear tasks
function clearTasks(e){
  while(taskList.firstChild){
     taskList.removeChild(taskList.firstChild);
   }
}

// filter thourgh tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
      const item = task.firstChild.textContent; 
      if(item.toLowerCase().indexOf(text)!= -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
}