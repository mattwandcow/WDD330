import Alchemist from "./alchemist.js";
import Render from "./render.js";



let alc = Alchemist.loadFromStorage();
//console.log(alc);
if (alc == null) {
	//no alchemist in storage
	alc = Alchemist.CreateDefaultAlchemist();
}
const alc2 = new Alchemist();
console.log(typeof (alc));
const POTION_LIST = [];

//load potion list
POTION_LIST.push({
	name: 'Potion of Healing',
	complexity: 1
});

alc.saveToStorage();

window.addEventListener('hashchange', function () {
	console.log(location.hash);
	loadContent()
})

function loadContent() {
	if (!location.hash) {
		location.hash = "#home";
	}
	document.getElementById("current_page").innerHTML = location.hash;

	switch (location.hash) {
		case '#home':
			console.log();
			document.getElementById('alchemy_display').innerHTML = Render.renderMenuOptions();
			break;
		case '#inventory':
			document.getElementById('alchemy_display').innerHTML = Render.renderInventory(alc);
			break;
		default:
			document.getElementById('alchemy_display').innerHTML = "No page Error"
			break;
	}
}
loadContent();