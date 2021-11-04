import Alchemist from "./alchemist.js";
import Render from "./render.js";

let alc = Alchemist.loadFromStorage();
//console.log(alc);
if(alc == null)
{
	//no alchemist in storage
	alc=Alchemist.CreateDefaultAlchemist();
}
const alc2=new Alchemist();
console.log(typeof(alc));
const POTION_LIST = [];

//load potion list
POTION_LIST.push({
	name: 'Potion of Healing',
	complexity: 1
});

alc.saveToStorage();
menu_base_state();

function menu_base_state(){
	document.getElementById('alchemist_stats').innerHTML=Render.renderAlchemistStats(alc);
	document.getElementById('alchemy_display').innerHTML=Render.renderMenuOptions();
}
function menu_potion_status() {
	console.log('potion status');
}
function menu_examine_inventory(){
	console.log('exaimine inventory');
}
function menu_prepare_stations(){
	
	console.log('prepare stations');
}
function menu_broswe_shops(){
	
	console.log('browse shops');
}
function menu_begin_week(){
	console.log('begin week');

}