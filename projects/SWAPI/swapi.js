API_URL = 'https://swapi.dev/api/planets';

function firstLoad() {
	getPage(API_URL);

}

function getPage(url) {
	list = document.createElement('ul');
	nextBtn = document.createElement('button');
	nextBtn.innerHTML = 'Next';
	prevBtn = document.createElement('button');
	prevBtn.innerHTML = 'Previous';
	fetch(url).then(res => {
		//console.log(res);
		if (res.ok) {
			return res.json()
		}
	}).then(res => {
		console.log(res);
		res.results.forEach(element => {
			//console.log(element.name);
			li = document.createElement('li')
			li.innerHTML = element.name
			li.addEventListener('click', () => {
				getDetails(element.name, url)
			})
			list.appendChild(li)
		});
		nextBtn.addEventListener('click', () => {
			getPage(res.next)
		})
		prevBtn.addEventListener('click', () => {
			getPage(res.previous)
		})
		return
	})
	document.getElementById('list-box').innerHTML = "";
	document.getElementById('list-box').appendChild(list);
	document.getElementById('list-box').appendChild(prevBtn);
	document.getElementById('list-box').appendChild(nextBtn);
}

function getDetails(planet, url) {
	btnReturn = document.createElement('button');
	btnReturn.innerHTML = 'Return to list';
	btnReturn.addEventListener('click', () => {
		getPage(url)
	})
	fetch(API_URL + '/?search=' + planet).then(res => {
		if (res.ok) {
			return res.json()
		}
	}).then(res => {
		console.log(res.results[0]);
		pop = res.results[0].population
		popFormated = parseInt(pop)
		if (isNaN(popFormated))
			popFormated = pop;
		else
			popFormated = popFormated.toLocaleString('en-US');
		document.getElementById('list-box').innerHTML = `
		<h2>${res.results[0].name}</h>
		<p>Population: ${popFormated}</p>
		<p>Climate: ${res.results[0].climate}</p>
		<p>Terrain: ${res.results[0].terrain}</p>
		`;
		document.getElementById('list-box').appendChild(btnReturn);
	})
}