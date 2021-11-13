export default class Render {
	static renderAlchemistStats(alchemy){
		return `
		<p>Name: ${alchemy.name} || Level: ${alchemy.level} </p>
		`;
	}
	static renderMenuOptions(){
		return `
		<a href="#potion_status">View Potion Status</a>
		<a href="#inventory">Examine Inventory</a>
		<a href="#prepare_stations">Prepare Alchemy Stations</a>
		<a href="#shops">Browse Shops</a>
		<a href="#begin_week">Begin New Week</a>
		`;
	}
	static renderPrepareStations(alchemy){
		
	}
	static renderInventory(alchemy){
		return `
		<a href="#home">Back to Menu</a>
		<p>Number of Alchemy Stations: ${alchemy.stations}</p>
		<p>Available Gold: ${alchemy.gold}</p>
		<p>Available Alchemy Supplies: ${alchemy.supplies}</p>
		`;
	}
}