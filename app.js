let taskInput = document.getElementById('todo__add__input'),
  addButton = document.querySelector('.todo__btn'),
  incompleteTaskHolder = document.getElementById('todo__list__incomplete'),
  completedTasksHolder = document.getElementById('todo__list__complete');

let createNewTaskElement = function (taskString) {
  let listItem = document.createElement('li'),
    checkBox = document.createElement('input'),
    label = document.createElement('label'),
    editInput = document.createElement('input'),
    editButton = document.createElement('button'),
    deleteButton = document.createElement('button'),
    deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'todo__task__title';
  listItem.className = 'todo__list__item';
  checkBox.className = 'todo__checkbox';
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'todo__task__input';
  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.classList = 'todo__btn todo__edit';
  deleteButton.classList = 'todo__btn todo__delete';
  deleteButtonImg.src = './remove.svg';

  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

let addTask = function () {
  console.log('Add Task...');
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

let editTask = function () {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  let listItem = this.parentNode,
    editInput = listItem.querySelector('.todo__task__input'),
    label = listItem.querySelector('.todo__task__title'),
    editBtn = listItem.querySelector('.todo__edit'),
    containsClass = listItem.classList.contains('todo__list__item_edit-mode');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('todo__list__item_edit-mode');
};

let deleteTask = function () {
  console.log('Delete Task...');
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
};

let taskCompleted = function () {
  console.log('Complete Task...');
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

let taskIncomplete = function () {
  console.log('Incomplete Task...');
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

let ajaxRequest = function () {
  console.log('AJAX Request');
};

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
  let checkBox = taskListItem.querySelector('input[type=checkbox]'),
      editButton = taskListItem.querySelector('.todo__edit'),
      deleteButton = taskListItem.querySelector('.todo__delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
