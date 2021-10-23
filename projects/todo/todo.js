const MODE_ALL = 1;
const MODE_DONE = 2;
const MODE_OPEN = 3;
let CURRENT_MODE = MODE_ALL;

const taskList = [];



function firstLoad() {
	document.getElementById('new-task-button').addEventListener('click', () => {
		addTask();
	})
	let storedList = JSON.parse(localStorage.getItem('taskList'));
	console.log(storedList);
	if (storedList == undefined) {
		storedList=[];
		storedList.push({
			task: "Sample Item",
			strike: false,
			id: Date.now()
		}, {
			task: "Sample Finished Item",
			strike: true,
			id: Date.now()
		});
	}
	//loads testing list. Replace with history
	storedList.forEach(element => {
		taskList.push(element);
	});
	loadList();
}

function loadList() {
	console.log("Loading list, Mode #" + CURRENT_MODE)
	let templist = taskList;
	if (CURRENT_MODE == MODE_DONE) {
		templist = taskList.filter(element => element.strike);
	}
	if (CURRENT_MODE == MODE_OPEN) {
		templist = taskList.filter(element => !element.strike);
	}
	document.getElementById('td-list').innerHTML = '';
	templist.forEach(element => {
		document.getElementById('td-list').appendChild(renderListItem(element));
	});
	document.getElementById('td-list').appendChild(renderListConsole(templist.length));
}

function renderListItem(element) {
	lItem = document.createElement('div');
	lItem.setAttribute('id', element.id);
	lItem.setAttribute('class', 'td-listitem');
	strikeBtn = document.createElement('button');
	if (element.strike)
	{
		lItem.classList.add('td-strike');
		//strikeBtn.innerHTML = "Strike Icon"
		//strikeBtn.innerHTML = '<img src="task_done.png" alt="Task Complete!" class="task-bar-img" >'
		strikeBtn.classList="task-button strike"
	}
	else{
		//strikeBtn.innerHTML = '<img src="task.png" alt="Task Remains!" class="task-bar-img">'
		strikeBtn.classList="task-button"
	}
	strikeBtn.addEventListener('click', () => {
		strikeTask(element)
	})
	lItem.appendChild(strikeBtn);
	let spanItem = document.createElement('span')
	spanItem.innerHTML = element.task;

	lItem.appendChild(spanItem);

	delBtn = document.createElement('button');
	//delBtn.innerHTML = "delete-button";
	delBtn.classList = "delete-button";
	delBtn.addEventListener('click', () => {
		deleteTask(element)
	})
	lItem.appendChild(delBtn);
	return lItem;
}

function renderListConsole(lenght, mode) {
	lItem = document.createElement('div');
	lItem.id="task-console";
	countSpan = document.createElement('span');

	btnAll = document.createElement('button');
	btnAll.innerHTML = 'All';
	btnAll.addEventListener('click', () => {
		CURRENT_MODE = MODE_ALL;
		loadList();
	})

	btnDone = document.createElement('button');
	btnDone.innerHTML = 'Completed';
	btnDone.addEventListener('click', () => {
		CURRENT_MODE = MODE_DONE;
		loadList();
	})

	btnOpen = document.createElement('button');
	btnOpen.innerHTML = 'Remaining';
	btnOpen.addEventListener('click', () => {
		CURRENT_MODE = MODE_OPEN;
		loadList();
	})
	switch (mode) {
		case MODE_OPEN:
			countSpan.innerHTML = "Tasks left: " + lenght;
			btnOpen.classList.add('active');
			break;
		case MODE_ALL:
			countSpan.innerHTML = "Tasks left: " + lenght;
			btnAll.classList.add('active');
			break;
		case MODE_DONE:
			countSpan.innerHTML = "Completed Task: " + lenght;
			btnDone.classList.add('active');
			break;

	}
	lItem.appendChild(countSpan);
	lItem.appendChild(btnAll);
	lItem.appendChild(btnOpen);
	lItem.appendChild(btnDone);

	return lItem;

}

function addTask() {
	newTask = document.getElementById('new-task');
	console.log("Adding Task: " + newTask.value);
	if (newTask == '') {
		console.log("Added task was blank");
	} else {

		taskList.push({
			task: newTask.value,
			strike: false,
			id: Date.now()
		});
		localStorage.setItem('taskList', JSON.stringify(taskList));
		loadList();
	}
}

function deleteTask(element) {
	console.log("Trying to delete: " + element);
	const index = taskList.indexOf(element);
	if (index > -1) {
		taskList.splice(index, 1);
		localStorage.setItem('taskList', JSON.stringify(taskList));
		loadList();
	}

}

function strikeTask(element) {
	console.log(element);
	element.strike ^= true;
	localStorage.setItem('taskList', JSON.stringify(taskList));
	loadList();
}