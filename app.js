document.getElementById('formTask').addEventListener('submit', saveTasks);

function saveTasks(e) {

	let title = document.getElementById('title').value;

	let description = document.getElementById('description').value;

	const TASK_DATA = {

		title,
		description
	};

	if (localStorage.getItem('tasks_array') === null) {

		let tasks_array = [];

		tasks_array.push(TASK_DATA);
		localStorage.setItem( 'tasks_array', JSON.stringify(tasks_array) );
	
	} else {

		let tasks = JSON.parse( localStorage.getItem('tasks_array') );
		tasks.push(TASK_DATA);

		localStorage.setItem( 'tasks_array', JSON.stringify(tasks) );	
	}

	getTasks();
	document.getElementById('formTask').reset();
	e.preventDefault();
}

function getTasks() {

	let tasks = JSON.parse( localStorage.getItem('tasks_array') );
	let tasksView = document.getElementById('tasks');

	tasksView.innerHTML = '';

	for(let i = 0; i < tasks.length; i++) {

		let title = tasks[i].title;
		let description = tasks[i].description;

		tasksView.innerHTML += 
		
		`<div class="card  mb-3">
		   <div class="car-body">
		     <p>${title} - ${description}</p>
		     <a class="btn  btn-danger" onclick="delTasks('${title}')">Delete</a>
		   </div>  
		</div>`
	}
}

function delTasks(title) {

	let tasks = JSON.parse( localStorage.getItem('tasks_array') );
	
	for(let i = 0; i < tasks.length; i++) {

		if (tasks[i].title == title) {

			tasks.splice(i, 1);
		}
	}
	
	localStorage.setItem( 'tasks_array', JSON.stringify(tasks) );
	getTasks();
}

getTasks();