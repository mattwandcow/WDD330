const MODE_ALL = 1;
const MODE_DONE = 2;
const MODE_OPEN = 3;
let CURRENT_MODE = MODE_ALL;

const taskList = [];

const testList = [{
	task: "Item 1",
	strike: false
}, {
	task: "Item 2",
	strike: true
}, {
	task: "Item 3",
	strike: false
}];

function firstLoad() {
	document.getElementById('new-task-button').addEventListener('click', () => {
		addTask();
	})
	//loads testing list. Replace with history
	testList.forEach(element => {
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
	if (element.strike)
		lItem.classList.add('td-strike');
	strikeBtn = document.createElement('button');
	strikeBtn.innerHTML = "Strike Icon"
	strikeBtn.addEventListener('click', () => {
		strikeTask(element)
	})
	lItem.appendChild(strikeBtn);
	let spanItem = document.createElement('span')
	spanItem.innerHTML = element.task;

	lItem.appendChild(spanItem);

	delBtn = document.createElement('button');
	delBtn.innerHTML = "Delete Icon"
	delBtn.addEventListener('click', () => {
		deleteTask(element)
	})
	lItem.appendChild(delBtn);
	return lItem;
}

function renderListConsole(lenght, mode) {
	lItem = document.createElement('div');
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
			countSpan.textContent = "Tasks left: " + lenght;
			btnOpen.classList.add('active');
			break;
		case MODE_ALL:
			countSpan.textContent = "Tasks left: " + lenght;
			btnAll.classList.add('active');
			break;
		case MODE_DONE:
			countSpan.textContent = "Completed Task: " + lenght;
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
		loadList();
	}
}

function deleteTask(element) {
	console.log("Trying to delete: " + element);
	const index = taskList.indexOf(element);
	if (index > -1) {
		taskList.splice(element, 1);
		loadList();
	}

}

function strikeTask(element) {
	console.log(element);
	element.strike ^= true;
	loadList();
}