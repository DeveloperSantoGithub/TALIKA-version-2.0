//==> Selectors :
const todoInput = document.querySelector('.todoInputField');
const addTodoBtn = document.querySelector('.addTodo');
const todoList = document.querySelector('.todoList');
const numTodo = todoList.children;
const todoCounter = document.querySelector('.todoListCounter b');
const deleteAllTaskBtn = document.querySelector('.deleteAllTodosBtn');
const filterOption = document.querySelector('.todoFilter');

// Total List Of Tasks
// let todo = JSON.parse(localStorage.getItem('todos')) || [];

//==> Eventlistner :
document.addEventListener('DOMContentLoaded', getLocalTodos);
addTodoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', checkEditDelete);
deleteAllTaskBtn.addEventListener('click', deleteAllTodos);
filterOption.addEventListener('click', todoFilter);

//==> Functions :

// ||====> Items Creating Function Start <=====||
function addTodo(event) {
	//|=> Preventing from Auto submitting form:
	event.preventDefault();

	// |=> Create new Todo Div:
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');

	// |=> Create Li :
	const newTodo = document.createElement('li');
	newTodo.classList.add('newTodoItem');

	//==> Prevent Null or "" value input:
	const inputFieldValue = todoInput.value;

	if (inputFieldValue == '' || inputFieldValue == null) {
		openPopup();
		return false;
	} else {
		newTodo.innerText = todoInput.value;
	}

	//||=> Count Total Number of Task:
	todoCounter.innerText = ` : ${numTodo.length + 1}`;

	//|=> Li append to todoDiv:
	todoDiv.appendChild(newTodo);

	//||=> Save Todos to Local Storage:
	saveLocalTodos(todoInput.value);

	//===> Check, Trash, Edit & Save Btn:

	//1.|=> Check Button:
	const completeBtn = document.createElement('button');
	completeBtn.classList.add('completeBtn');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	//|=> Append to todoDiv:
	todoDiv.appendChild(completeBtn);

	// 2.|=> Edit & Save Button:
	const editSaveBtn = document.createElement('button');
	editSaveBtn.classList.add('editSaveBtn');
	editSaveBtn.innerHTML = '<i class="fas fa-pen-to-square"></i>';

	//|=> Append to todoDiv:
	todoDiv.appendChild(editSaveBtn);

	//3.|=> Trash Button:
	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('deleteBtn');
	deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

	//|=> Append to todoDiv:
	todoDiv.appendChild(deleteBtn);

	//===> Append to List:
	todoList.appendChild(todoDiv);

	//|=> Set Input value default:
	todoInput.value = '';
}
// ||====> Items Creating Function End <=====||

// ||====> Items Check, Edit Save, Delete  Function Start <=====||
function checkEditDelete(event) {
	const item = event.target;

	//||=> Delete Todo:
	if (item.classList[0] === 'deleteBtn') {
		const todo = item.parentElement;

		// Delete Animation:
		todo.classList.add('deleteAnimation');

		// Remove Data From Local Storage:
		removeLocalTodos(todo);

		// Remove Item:
		todo.addEventListener('transitionend', () => {
			todo.remove();

			//||=> Count Total Number of Task:
			todoCounter.innerText = ` : ${numTodo.length}`;
		});
	}

	//||=> Check or Complete Todo:
	if (item.classList[0] === 'completeBtn') {
		const todo = item.parentElement;

		todo.classList.toggle('completed');
	}

	//||=> Edit And Save todo:
	if (
		item.classList[0] === 'editSaveBtn' &&
		event.target !== event.currentTarget
	) {
		console.log('editBtnWork');

		const todo = item.parentElement;
		todo.toggleAttribute('contenteditable');
		if (todo.contenteditable) {
			todo.focus();
		}
		// replaceLocalTodos(todo);
	}
}

// ||====> Items Check, Edit Save, Delete  Function End <=====||

// ||====> Alart Popup Start <=====||
const popup = document.getElementById('popup');
const popupBackdrop = document.getElementById('backdrop');

function openPopup() {
	popup.classList.add('openPopup');
	popupBackdrop.classList.add('backdrop');
}
function closePopup() {
	popup.classList.remove('openPopup');
	popupBackdrop.classList.remove('backdrop');
}
// ||====> Alart Popup End <=====||

// ||========>> Save , Get , Remove Data From Local Storage <<===========||

//====> Save Data to Local Storage:

function saveLocalTodos(todo) {
	// |---> Check if any data alrady exists or Not:
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

//====> Get Data from Local Storage:

function getLocalTodos() {
	// |---> Check if any data alrady exists or Not:
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach((todo) => {
		// |=> Create new Todo Div:
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo');

		// |=> Create Li :
		const newTodo = document.createElement('li');
		newTodo.classList.add('newTodoItem');
		newTodo.innerText = todo;

		//||=> Count Total Number of Task:
		todoCounter.innerText = ` : ${numTodo.length + 1}`;

		//|=> Li append to todoDiv:
		todoDiv.appendChild(newTodo);

		//1.|=> Check Button:
		const completeBtn = document.createElement('button');
		completeBtn.classList.add('completeBtn');
		completeBtn.innerHTML = '<i class="fas fa-check"></i>';

		//|=> Append to todoDiv:
		todoDiv.appendChild(completeBtn);

		// 2.|=> Edit & Save Button:
		const editSaveBtn = document.createElement('button');
		editSaveBtn.classList.add('editSaveBtn');
		editSaveBtn.innerHTML = '<i class="fas fa-pen-to-square"></i>';

		//|=> Append to todoDiv:
		todoDiv.appendChild(editSaveBtn);

		//3.|=> Trash Button:
		const deleteBtn = document.createElement('button');
		deleteBtn.classList.add('deleteBtn');
		deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

		//|=> Append to todoDiv:
		todoDiv.appendChild(deleteBtn);

		//===> Append to List:
		todoList.appendChild(todoDiv);
	});
}

//====> Remove Data from Local Storage:
function removeLocalTodos(todo) {
	let todos;

	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
}

//====> Replace Data from Local Storage:
// function replaceLocalTodos(todo) {
// 	let todos;

// 	todos = JSON.parse(localStorage.getItem('todos'));

// 	todos.push(todo);
// 	localStorage.setItem('todos', JSON.stringify(todos));
// 	JSON.parse(localStorage.getItem('todos'));

// 	// const todoIndex = todo.children[0].innerText;
// 	// todos.splice(todos.indexOf(todoIndex), 1, todo.value);
// 	// localStorage.setItem('todos', JSON.stringify(todos));
// }

//====> Delete All Todos:
function deleteAllTodos(event) {
	//|=> Preventing from Auto submitting form:
	event.preventDefault();

	let todos = JSON.parse(localStorage.getItem('todos')) || [];

	if (todos.length > 0) {
		todos = [];
		localStorage.setItem('todos', JSON.stringify(todos));
		return showTasksList();
	}
}

//==> Show Task List Function:

function showTasksList() {
	todoList.innerHTML = '';

	const todos = JSON.parse(localStorage.getItem('todos')) || [];

	if (todos.length === 0) {
		deleteAllTaskBtn.disabled = true;
	}

	deleteAllTaskBtn.disabled = false;

	//||=> Count Total Number of Task:
	todoCounter.innerText = ` : ${numTodo.length}`;
}

//||====> Task Filter  Start<====||
function todoFilter(e) {
	e.stopPropagation();

	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
		}
	});
}
//||====> Task Filter  End<====||
