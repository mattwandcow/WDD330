export default class Potion_List {
	constructor() {
		this.potions = [];
		this.addPotion = function (potion) {
			this.potions.push(potion)
			//console.log("Push pot, Arrlen: " + this.potions.length);
			this.saveToStorage();
		}
	}

	load_list() {
		console.log("Loading List...");
		let oldlist=JSON.parse(localStorage.getItem('potions'));
		if(oldlist==null)
		{
		console.log("No Old List...");	
		this.addPotion({
			name: "Potion of Heals",
			rarity: "common",
			desc: "Heals, yo!"
		});
		fetch('https://api.open5e.com/magicitems/?search=potion')
			.then(response => response.json())
			.then(data => {
				this.importJSON(data.results);
			})
			.catch((err) => console.log(err));
		}
		else{
			//there was a list...
			console.log("Old List Found...");
			// console.log(oldlist);
			this.potions=oldlist.potions;
		}
	}
	importJSON(data) {
		console.log("Importing JSON...");
		console.log(data);
		data.forEach(element => {
			if (element.rarity != "varies") {
				this.addPotion({
					name: element.name,
					desc: element.desc,
					rarity: element.rarity
				})
			}

		});
	}
	saveToStorage() {
		// console.log("Saving Potions...");
		//console.log(JSON.stringify(this));
		localStorage.setItem('potions', JSON.stringify(this));
		//		console.log(JSON.parse(localStorage.getItem('potions')));

	}
}