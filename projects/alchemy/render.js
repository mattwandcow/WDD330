export default class Render {
	static renderAlchemistStats(alchemy){
		return `
		<p>Name: ${alchemy.name} || Level: ${alchemy.level} </p>
		`;
	}
	static renderMenuOptions(){
		return `
		<button type="button" onclick="menu_potion_status()">View Potion Status</button>
		<button type="button" onclick="menu_examine_inventory()">Examine Inventory</button>
		<button type="button" onclick="menu_prepare_stations()">Prepare Alchemy Stations</button>
		<button type="button" onclick="menu_broswe_shops()">Browse Shops</button>
		<button type="button" onclick="menu_begin_week()">Begin New Week</button>
		`;
	}
	static renderPotionStatus(alchemy){

	}
}