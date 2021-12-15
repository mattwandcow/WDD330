import Alchemist from "./alchemist.js";
import Render from "./render.js";
import Potion_List from "./potionlist.js";


let alc = Alchemist.loadFromStorage();
//console.log(alc);
if (alc == null) {
	//no alchemist in storage
	alc = Alchemist.CreateDefaultAlchemist();
}

let POTION_LIST = new Potion_List();
POTION_LIST.load_list();

// console.log("POTION_LIST");
console.log(POTION_LIST);



alc.saveToStorage();
POTION_LIST.saveToStorage();

window.addEventListener('hashchange', function () {
	console.log(location.hash);
	loadContent()
})

function loadContent() {
	//console.log(alc);
	let hash = location.hash;
	let second_hash = "";
	if (!hash) {
		// if the page is missing a #, like if its the base URL
		hash = "#home";
	}
	if (hash.includes('&')) {
		let args = hash.split('&');
		console.log(args);
		hash = args[0];
		second_hash = args[1];
	}
	let params = hash.substring(0);
	console.log(params);

	//posts the hash to the page for testing purposes
//	document.getElementById("current_page").innerHTML = hash;
	//console.log(alc);

	//console.log(POTION_LIST);
	switch (hash) {
		case '#admin':
			document.getElementById('alchemy_display').innerHTML = Render.renderAdminMenu();
			break;
		case '#menu':
			//this is the start page. We should have some options to possibly load our alchemist,
			//examine things, etc, before resuming the game.
			document.getElementById('alchemy_display').innerHTML = Render.renderMenuOptions();
			break;
		case '#home':
		case '#begin_week':
			document.getElementById('alchemy_display').innerHTML = Render.renderWeekStart();
			break;
		case '#scripts':
			document.getElementById('alchemy_display').innerHTML = Render.renderScripts(alc, POTION_LIST);
			break;
		case '#stats':
			document.getElementById('alchemy_display').innerHTML = Render.renderAlchemistStatPage(alc, POTION_LIST);
			break;
		case '#inventory':
			document.getElementById('alchemy_display').innerHTML = Render.renderInventory(alc, POTION_LIST);
			break;
		case '#prepare_stations':
			document.getElementById('alchemy_display').innerHTML = Render.renderPrepareStations(alc);
			break;
		case '#restart_week':
			window.location = '#start_week';
			break;
		case '#cheat_gold':
			alc.gold += 100;
			window.location = '#begin_week';
			break;
		case '#start_week':
			alc.run_week(POTION_LIST.potions);
			document.getElementById('alchemy_display').innerHTML = Render.renderWeekLogic(alc);
			break;
		case '#edit_station':
			console.log("Editing specific station....");
			let tags = second_hash.split('=');
			tags[1] = tags[1].replace('_', ' ')

			if (tags[0] == "station") {
				document.getElementById('alchemy_display').innerHTML = Render.renderEditStation(alc, tags[1], POTION_LIST.potions);
				document.getElementById('jobs').addEventListener('change', () => {
					//set station's job to changed value
					alc.setStation(tags[1], document.getElementById('jobs').value)
					alc.saveToStorage();
					loadContent();
				})
				document.getElementById('concoction').addEventListener('change', () => {
					//set station's job to changed value
					alc.setStationPotion(tags[1], document.getElementById('concoction').value)
					console.log(alc);
					alc.saveToStorage();
					loadContent();
				})
				document.getElementById('station_name').addEventListener('change', () => {
					//set station's name to changed value
					alc.setStationName(tags[1], document.getElementById('station_name').value)
					console.log(alc);
					alc.saveToStorage();
					loadContent();
				})
			} else {
				console.log("incorrect tags: " + location.hash);
				window.location = '#home';
			}
			break;
		case '#end_screen':
			document.getElementById('alchemy_display').innerHTML = Render.renderEnd(alc, POTION_LIST.potions);
			break;
		case '#shops':
			document.getElementById('alchemy_display').innerHTML = Render.renderShops(alc);
			break;
		case '#buy_station':
			if (alc.gold>=50) {
				alc.gold-=50
				alc.stations.push({
					name: "New Station",
					job: "do nothing",
					potion: "None",
					status: ""})
			}
			window.location = '#prepare_stations';
			break;
		case '#':
			document.getElementById('alchemy_display').innerHTML = Render.renderInventory(alc);
			break;
		case 'new_potion':
			document.getElementById('alchemy_display').innerHTML = renderNewPotion()
			break;
		case 'new_alchemist':
			document.getElementById('alchemy_display').innerHTML = renderNewAlchemist()
			break;
		default:
			document.getElementById('alchemy_display').innerHTML = "No page Error"
			break;
	}
	document.getElementById('alchemist_stats').innerHTML = Render.renderAlchemistStats(alc);
}
loadContent();