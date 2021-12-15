export default class Alchemist {
	constructor(name = 'Nicki Flamel') {
		this.name = name;
		this.level = 1;
		this.gold = 500;
		this.life_gold = 500;
		this.life_pots = 0;
		this.life_secrets = 0;
		this.life_scripts = 1;
		this.exp = 0;
		this.int = 1;
		this.profBonus = 2;
		this.stations = [{
			name: "Station 1",
			job: "researching",
			potion: "Potion of Heals",
			status: ""
		}];
		this.weeks = 0;
		this.scripts = {
			"Glue": {
				name: "Glue",
				rarity: "common",
				secrets: 0,
				successes: 0,
				unlocked: true
			}
		};
		this.inventory_tally = 1,
			this.inventory = {
				"Glue": {
					count: 1
				}
			}
		this.saveToStorage = function () {
			localStorage.setItem('alchemist', JSON.stringify(this));
		}
		this.inventory_status = ""
	}
	static loadFromStorage() {
		let loader = new Alchemist()
		let oldalchemist = JSON.parse(localStorage.getItem('alchemist'));
		if (oldalchemist == null) {
			return null;
		}
		loader.name = oldalchemist.name;
		loader.level = oldalchemist.level
		loader.gold = oldalchemist.gold;
		loader.life_gold = oldalchemist.life_gold;
		loader.life_pots = oldalchemist.life_pots;
		loader.inventory_tally = oldalchemist.inventory_tally;
		loader.life_secrets = oldalchemist.life_secrets;
		loader.life_scripts = oldalchemist.life_scripts;
		loader.exp = oldalchemist.exp;
		loader.int = oldalchemist.int;
		loader.profBonus = oldalchemist.profBonus;
		loader.stations = oldalchemist.stations;
		loader.weeks = oldalchemist.weeks;
		loader.scripts = oldalchemist.scripts;
		loader.inventory = oldalchemist.inventory;
		return loader;
	}
	static CreateDefaultAlchemist() {
		return new Alchemist();
	}

	run_week(potion_cat) {
		this.weeks += 1;
		//###	Run Stations 	###
		this.stations.forEach(station => {
			console.log("Starting week process for " + station.name);
			console.log(station);
			let alc_roll;
			switch (station.job) {
				case "researching":
					if (station.potion == "" || station.potion == "None") {
						console.log("Someone forgot to set this to research a useful potion...");
					} else {
						//Research time!
						if (this.gold >= 25) {
							if (!this.scripts[station.potion]) {
								console.log("No research so far...");
								this.scripts[station.potion] = {
									name: station.potion,
									secrets: 0,
									successes: 0
								}
								console.log(this.scripts[station.potion]);
							}
							alc_roll = Math.floor(Math.random() * 20) + 1; //d20 roll
							alc_roll += this.int + this.profBonus; //Relvant modifiers
							console.log("Rolled a " + alc_roll + " on the Alchemy Roll");
							if (alc_roll < 10) {
								station.status = "No new information acquired.";
							} else
							if (alc_roll < 18) {
								station.status = "One success acquired.";
								this.scripts[station.potion].successes += 1;
							} else {
								station.status = "Two success acquired.";
								this.scripts[station.potion].successes += 2;
							}
							let rareInt = cheapEnum(station.potion, potion_cat);
							let success_needed = 0;
							if (this.scripts[station.potion].unlocked) {
								success_needed = rareInt * 2 + this.scripts[station.potion].secrets * 3 * rareInt;
							} else {
								success_needed = rareInt * 3;
							}
							if (this.scripts[station.potion].successes >= success_needed) {
								this.scripts[station.potion].successes = this.scripts[station.potion].successes - success_needed;
								if (this.scripts[station.potion].unlocked) {
									this.scripts[station.potion].secrets += 1;
									station.status = " You've unlocked a new secret for this potion!";
									this.life_secrets += 1
									this.exp += 25 * cheapEnum(station.potion, potion_cat);
								} else {
									this.scripts[station.potion].unlocked = true;
									station.status = " This potion has been unlocked for crafting!";
									this.life_scripts += 1;
									this.exp += 50 * cheapEnum(station.potion, potion_cat);
								}

							}
							this.gold -= 25;
							console.log("Line 107: " + station.status);
							station.status += " 25 gold spent."
							console.log("Line 109: " + station.status);
						} else {
							//uh, we broke
							station.status = "Not enough funds to run this station this week."
						}
					}
					//End of Research Block
					break;
				case "crafting":
					if (station.potion == "" || station.potion == "None") {
						console.log("Someone forgot to set this to research a useful potion...");
					} else {
						if (this.gold >= 25) {
							if (!this.inventory[station.potion]) {
								console.log("Oh, hey, is this a potion to keep in stock?");
								this.inventory[station.potion] = {
									count: 0
								}
							}
							alc_roll = Math.floor(Math.random() * 20) + 1; //d20 roll
							alc_roll += this.int + this.profBonus; //Relvant modifiers
							console.log("Rolled a " + alc_roll + " on the Alchemy Roll before secrets");
							let secrets_bonus = 0;
							for (let i = 0; i < this.scripts[station.potion].secrets; i++) {
								secrets_bonus += Math.floor(Math.random() * 6) + 1;
							}
							console.log("Bonus from secrets: " + secrets_bonus);
							let craft_result = alc_roll + secrets_bonus;

							console.log("Total Result: " + craft_result);
							console.log("Potion DC: " + potionDcCalc(station.potion, potion_cat));
							craft_result -= potionDcCalc(station.potion, potion_cat);
							if (craft_result < 0) {
								//duds are currently not a thing
								console.log("Alc roll failed: " + craft_result);
								station.status = "No potion concocted.";
							} else {
								console.log("Alc roll success: " + craft_result);
								let potion_count = Math.floor(craft_result / 5) + 1;
								this.life_pots += potion_count;
								this.exp += potion_count * cheapEnum(station.potion, potion_cat)
								this.inventory_tally += potion_count;
								if (potion_count == 1) {
									station.status = "1 potion concocted.";
								} else {
									station.status = potion_count + " potions concocted.";
								}
								console.log("Old Inventory count: " + this.inventory[station.potion].count);
								this.inventory[station.potion].count += potion_count;
								console.log("New Inventory count: " + this.inventory[station.potion].count);
							}

							this.gold -= 25;
							console.log("Line 153: " + station.status);
							station.status += " 25 gold spent."
							console.log("Line 155: " + station.status);
						} else {
							//uh, we broke
							station.status = "Not enough funds to run this station this week."
						}
					}
					//end of crafting block
					break;
				default:
					console.log("Ran useless week on " + station.name);
			}

			console.log(this.scripts[station.potion]);

		});


		let inv_status = ""
		//###	Run the shop	###
		//You know, this being here means we can sell potions hot off the presses. I think that's okay for now....
		Object.entries(this.inventory).forEach(element => {

			//how many are we selling?
			let sold = decramentalRoll(element[1].count);
			if (sold > 0) {

				//decrease the inventory by sold
				element[1].count -= sold;
				this.inventory_tally -= sold;
				//gain some gold
				let coin_gain = sold * Math.floor(potionPricecalc(element[0], potion_cat) * ((50 + this.level) / 100))
				this.gold += coin_gain
				this.life_gold += coin_gain
				inv_status = `<p>Earned ${coin_gain} gold by selling ${sold} ${element[0]} this week</p>`
			}

		}) 
		if (inv_status == "") {
			inv_status = "<p>No potion sales this week</p>"
		}
		this.inventory_status = inv_status
		//Check Level Up
		console.log("XP to next level: " + level_chart[this.level]);
		console.log("current XP: " + this.exp);
		if (this.level < 20 && level_chart[this.level] <= this.exp) {
			//ding!
			this.level += 1
			switch (this.level) {
				case 1:
				case 2:
				case 3:
					this.int = 1
					this.profBonus = 2
					break
				case 4:
					this.int = 2
					this.profBonus = 2
					break
				case 5:
					this.int = 2
					this.profBonus = 3
					break
				case 6:
				case 7:
				case 8:
					this.int = 3
					this.profBonus = 3
					break
				case 9:
					this.int = 3
					this.profBonus = 4
					break
				case 10:
				case 11:
				case 12:
					this.int = 4
					this.profBonus = 4
					break
				case 13:
					this.int = 4
					this.profBonus = 5
					break
				case 14:
				case 15:
				case 16:
					this.int = 5
					this.profBonus = 5
					break
				case 17:
					this.int = 5
					this.profBonus = 6
					break
				case 18:
				case 19:
				case 20:
					break
				default:
					console.log("Somehting has gone with the level up mechanic!");
					console.log(this);
			}
		}
		//Check Game Loss
		if (this.inventory_tally == 0 && this.gold < 25) {
			//Not sure if this needs to be in run week, moving it to render week logic as well
		}
		//Other Week activities




		this.saveToStorage();
	}
	research(potion) {
		console.log(potion);
	}

	setStation(station, value) {
		let index = this.stations.findIndex(item => item.name == station);
		if (index == -1) //oops, some how got past the last check
		{
			console.log("Bad station from Alchemist.SetStation");
			console.log("Station: " + station)
			console.log("Value: " + value)
			window.location.assign("#home");
		} else {
			console.log("Station found at index:" + index);
			this.stations[index].job = value;
			if (value == "do nothing")
				this.stations[index].potion = "None";
		}

	}
	setStationPotion(station, value) {
		let index = this.stations.findIndex(item => item.name == station);
		if (index == -1) //oops, some how got past the last check
		{
			console.log("Bad station from Alchemist.SetStationPotion");
			console.log("Station: " + station)
			console.log("Value: " + value)
			window.location.assign("#home");
		} else {
			this.stations[index].potion = value;
			console.log("Station set to process " + value);
		}
	}
	setStationName(station, value) {
		let index = this.stations.findIndex(item => item.name == station);
		if (index == -1) //oops, some how got past the last check
		{
			console.log("Bad station from Alchemist.SetStationName");
			console.log("Station: " + station)
			console.log("Value: " + value)
			window.location.assign("#home");
		} else {
			this.stations[index].name = value;
			console.log("Station renamed " + value);
		}

	}
}

function cheapEnum(potion, potion_cat) {
	let index = potion_cat.findIndex(item => item.name == potion);
	if (index == -1) //oops, some how got past the last check
	{
		console.log("Potion not in list at Alchemist.CheapEnum");
		console.log("potion: " + potion)
		window.location.assign("#home");
	}
	switch (potion_cat[index].rarity) {
		case 'common':
			return 1;
		case 'uncommon':
			return 2;
		case 'rare':
			return 3;
		case 'very rare':
			return 4;
		case 'legendary':
			return 5;
		default:
			console.log("Error: rarity out of bounds in switch. Attempted Rarity: " + potion_cat[index].rarity);
			return 1;
	}
}

function potionPricecalc(potion, potion_cat) {
	let index = potion_cat.findIndex(item => item.name == potion);
	if (index == -1) //oops, some how got past the last check
	{
		console.log("Potion not in list at Alchemist.potionPricecalc");
		console.log("potion: " + potion)
		return 50
	}
	switch (potion_cat[index].rarity) {
		case 'common':
			return 50;
		case 'uncommon':
			return 250;
		case 'rare':
			return 2500;
		case 'very rare':
			return 25000;
		case 'legendary':
			return 50000;
		default:
			console.log("Error: rarity out of bounds in switch. Attempted Rarity: " + potion_cat[index].rarity);
			return 50;
	}
}

function potionDcCalc(potion, potion_cat) {
	let rarity = cheapEnum(potion, potion_cat);
	return 10 + 5 * rarity;
}

function decramentalRoll(number) {
	console.log("Decremental roll for " + number);
	if (number < 1) {
		return 0
	}
	for (let i = 0; i <= number; i++) {
		let roll = Math.floor(Math.random() * 100) + 1;
		if (roll < 75) {
			return i
		}
	}
	return number;
}

let level_chart = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000]