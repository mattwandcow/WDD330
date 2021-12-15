export default class Render {
	static renderAlchemistStats(alchemy) {
		return `
		<ul class="menu">
		<li><a href="#stats">Stats</a></li>
		<li><a href="#inventory">Inventory</a></li>
		<li><a href="#scripts">Scripts</a></li>
		<li><a href="#admin">Admin Menu</a></li>
		<li><a href="https://experimentaldnd.wordpress.com/creations/">Get Rules</a></li>
		</ul>
		<p>Name: ${alchemy.name} || Level: ${alchemy.level} || Weeks: ${alchemy.weeks}|| Gold: ${alchemy.gold}</p>
		`;
	}
	static renderMenuOptions() {
		return `
		<a href="#begin_week">Resume Game</a>
		`;
	}
	static renderAdminMenu() {
		return `<div>
		<div class="run_btn"><a href="#cheat_gold">Add Gold</a></div>
		<div class="run_btn"><a href="#begin_week">Done</a></div>
		</div>`;
	}
	static renderPrepareStations(alchemy) {
		if (alchemy.stations.length > 0) {
			let html_str = '';
			alchemy.stations.forEach(station => {
				html_str += `<div class="station_card">`
				html_str += `<h3>${station.name}</h3>`
				switch (station.job) {
					case 'researching':
						html_str += `<p>Set to <span class="job">${station.job}</span> the Script for <span class="pot_name">${station.potion}</span>.</p>`;
						if (!alchemy.scripts[station.potion]) {
							html_str += `<p>The Script for this concotion has no progress.</p>`;
						} else
						if (alchemy.scripts[station.potion].unlocked) {
							html_str += `<p>The Script for this concotion has been finished. There are ${alchemy.scripts[station.potion].secrets} Secrets discovered, and there are ${alchemy.scripts[station.potion].successes} Success on the way to discovering new Secrets`;
						} else {
							html_str += `<p>The Script for this concotion has not been finished. There have been ${alchemy.scripts[station.potion].successes} Success on the way to completing the Script`;
						}
						break;
					case 'crafting':
						html_str += `<p>Set to <span class="job">${station.job}</span> the Script for <span class="pot_name">${station.potion}</span>.</p>`;
						break;
					case 'do nothing':
						html_str += `This station is set to do nothing`;
				}
				html_str += `<p><a href='#edit_station&station=${station.name.replace(' ','_')}'>Edit Station</a></p>`;
				html_str += `</div>`;

			});
			
			html_str += `<div class="run_btn"><a href="#begin_week">Done</a></div>`;
			return html_str;
		} else {
			return `No station Error`;
		}
	}
	static renderAlchemistStatPage(alchemy) {
		let html_str = ""
		html_str += `<div><div class="run_btn"><a href="#begin_week">Done</a></div>`

		html_str += `<div class="stat_box">`
		html_str += `<h1>Alchemist Statistics</h1>`
		html_str += `<ul>`
		html_str += `<li>Name: ${alchemy.name}</li>`
		html_str += `<li>Level: ${alchemy.level}</li>`
		html_str += `<li>Experience: ${alchemy.exp}</li>`
		html_str += `<li>Intelligence Modifier: ${alchemy.int}</li>`
		html_str += `<li>Proficency Bonus: ${alchemy.profBonus}</li>`
		html_str += `<li>Current gold: ${alchemy.gold}</li>`
		html_str += `<li>Craftable Scripts: ${alchemy.life_scripts}</li>`

		html_str += `</ul>`
		html_str += `<h2>Lifetime Stats</h2>`
		html_str += `<ul>`

		html_str += `<li>Lifetime Gold: ${alchemy.life_gold}</li>`
		html_str += `<li>Potions Crafted: ${alchemy.life_pots}</li>`
		html_str += `<li>Secrets Acquired: ${alchemy.life_secrets}</li>`
		html_str += `</ul>`
		html_str += `</div>`

		html_str += `<div class="run_btn"><a href="#begin_week">Done</a></div></div>`
		return html_str
	}
	static renderInventory(alchemy, potion_cat) {
		let html_str = ""
		html_str += `<div><div class="run_btn"><a href="#begin_week">Done</a></div>`
		html_str += `<div class="script_catalog">`
		let inv_bool = false
		Object.entries(alchemy.inventory).forEach(element => {
			console.log(element);
			if (element[1].count > 0) {
				html_str += `<div class="inventory_card">`
				html_str += `<h2>${element[0]}</h2>`
				html_str += `<p>Stock: ${element[1].count}</p>`
				html_str += `<p>Rarity: ${getRarity(element[0], potion_cat)}</p>`
				html_str += `</div>`
				inv_bool = true;
			}
		})
		if (!inv_bool) {
			html_str += `<div class="inventory_card">`
			html_str += `<p>No concoctions presently in inventory...</p>`
			html_str += `</div>`
		}
		html_str += `</div>`
		html_str += `<div class="run_btn"><a href="#begin_week">Done</a></div></div>`
		return html_str
	}
	static renderScripts(alchemy, potion_cat) {
		console.log(alchemy);
		let html_str = ""
		html_str += `<div class="run_btn"><a href="#begin_week">Done</a></div>`
		html_str += `<div class="script_catalog">`
		Object.entries(alchemy.scripts).forEach(element => {
			console.log("in loop");
			html_str += `<div class="script_card">`
			html_str += `<h2>Concoction: ${element[1].name}</h2>`
			html_str += `<p>Rarity: ${getRarity(element[1].name, potion_cat)}</p>`
			let rarity_val = cheapEnum(element[1].name, potion_cat);
			if (element[1].unlocked) {
				html_str += `<p>This concoction can be crafted</p>`
				html_str += `<p>Secrets Unlocked: ${element[1].secrets}</p>`
				let success_needed = rarity_val * 2 + element[1].secrets * 3 * rarity_val - element[1].successes;
				html_str += `<p>Successes to next secret: ${success_needed}</p>`

			} else {
				html_str += `<p>More research is needed before this can be crafted</p>`
				let success_needed = rarity_val * 3 - element[1].successes;
				html_str += `<p>Successes to unlock: ${success_needed}</p>`
			}
			html_str += `</div>`

		});
		html_str += `</div>`
		html_str += `<div class="run_btn"><a href="#begin_week">Done</a></div>`
		return html_str
	}
	static renderWeekStart() {
		return `
		<div class="run_btn">
			<a href="#prepare_stations">Review Alchemy Stations</a>
		</div>
		<div class="run_btn">
			<a href="#shops">Browse Shop</a>
		</div>
		<div class="run_btn">
			<a href="#start_week">Begin Week</a>
		</div>
		`;
	}
	static renderWeekLogic(alchemy) {
		let html_str = "";
		html_str += `<div id="week_logic">`;
		alchemy.stations.forEach(station => {
			if (station.job=="do nothing") {
				
				html_str += `<p><span class="station">${station.name}</span> was set to <span class="job">${station.job}</span></p>`
			}
			else
				html_str += `<p><span class="station">${station.name}</span> was <span class="job">${station.job}</span> the Script for <span class="pot_name">${station.potion}</span>. ${station.status}</p>`
			station.status = "";
		});
		html_str += alchemy.inventory_status
		alchemy.inventory_status = ""
		console.log(alchemy.inventory_tally);
		console.log(alchemy.gold);

		if (alchemy.inventory_tally == 0 && alchemy.gold < 25) {
			html_str += `<h2>Not enough gold to continue. Game Over</h2>`;
			html_str += `<a href="#end_screen"><button>See Score</button></a>`;
		} else {
			html_str += `<a href="#restart_week"><button>Run another week</button></a>`;
			html_str += `<a href="#begin_week"><button>Menu</button></a>`;
		}
		html_str += `</div>`;
		return html_str;
	}
	static renderEditStation(alchemy, stationName, potions) {
		let index = alchemy.stations.findIndex(item => item.name == stationName);
		let html_str = "";
		html_str += `<div id="edit_station_card">`
		if (index == -1) {
			console.log("Bad station from Render.RenderEditStation");
			console.log("Alchemist:")
			console.log(alchemy)
			console.log("Station: " + stationName)
			window.location.assign("#prepare_stations");
		} else {
			var cheap_mode_switch;
			switch (alchemy.stations[index].job) {
				case "crafting":
					html_str += `<p><input type="text" id="station_name" value="${alchemy.stations[index].name}"> is <span class="job">${alchemy.stations[index].job}</span> the Script for <span class="pot_name">${alchemy.stations[index].potion}</span>.</p>`;
					cheap_mode_switch = 2;
					break;
				case "researching":
					html_str += `<p><input type="text" id="station_name" value="${alchemy.stations[index].name}"> is <span class="job">${alchemy.stations[index].job}</span> the Script for <span class="pot_name">${alchemy.stations[index].potion}</span>.</p>`;
					cheap_mode_switch = 1;
					break;
				case "do nothing":
					html_str += `<p><input type="text" id="station_name" value="${alchemy.stations[index].name}"> is <span class="job">${alchemy.stations[index].job}</span>.</p>`;
					cheap_mode_switch = 0;
					break;
				default:
					html_str += `<p>Feature not yet implemented</p>`
			}
			html_str += `<p>Set to <select name="jobs" id="jobs">`
			stationJobs.forEach(job => {
				if (alchemy.stations[index].job == job) {
					html_str += `<option value = "${job}" selected> ${job}</option>`;
				} else {
					html_str += `<option value = "${job}"> ${job}</option>`;
				}
			});
			html_str += `</p></select>`;
			switch (cheap_mode_switch) {
				case 0: //aka Do nothing

					break;
				case 1: //aka Researching
					html_str += `<p>Set station to ${alchemy.stations[index].job} <select name="concoction" id="concoction">`
					if (alchemy.stations[index].potion == "None") {
						html_str += `<option value = "" disabled selected hidden> Please select...</option>`;
					}
					potions.forEach(potion => {
						if (alchemy.stations[index].potion == potion.name) {
							html_str += `<option value = "${potion.name}" selected> ${potion.name}</option>`;
						} else {
							html_str += `<option value = "${potion.name}"> ${potion.name}</option>`;
						}
					});
					html_str += `</p></select>`;
					break;
				case 2: //aka Crafting
					html_str += `<p>Set station to ${alchemy.stations[index].job} <select name="concoction" id="concoction">`
					if (alchemy.stations[index].potion == "None") {
						html_str += `<option value = "" disabled selected hidden> Please select...</option>`;
					}
					Object.values(alchemy.scripts).forEach(potion => {
						if (potion.unlocked) {
							if (alchemy.stations[index].potion == potion.name) {
								html_str += `<option value = "${potion.name}" selected> ${potion.name}</option>`;
							} else {
								html_str += `<option value = "${potion.name}"> ${potion.name}</option>`;
							}
						}
					});
					html_str += `</p></select>`;
					break;
			}
		};
		html_str += `<div class="run_btn"><a href="#begin_week">Done</a></div></div>`
		return html_str;
	}
	static renderEnd(alchemy, potion_cat) {
			console.log(alchemy);
			let high_score_list = JSON.parse(localStorage.getItem('highscore'));
			console.log(high_score_list);
			let this_score = alchemy.exp + alchemy.life_gold
			if(!high_score_list)
			{
				high_score_list=[[alchemy.name, alchemy.level, this_score]]
			}
			else
			{
				console.log(typeof(high_score_list));
				high_score_list.push([alchemy.name, alchemy.level, this_score])
			}
			high_score_list.sort((first, second) => {
				if (first[2] < second[2])
					return -1
				else
					return 1
			})
			let html_str = "<h2>Game Over</h2>"
			html_str += "<p>You are out of funds to continue. Perhaps next time you will fare better?</p>"
			let score_message = `<p>${alchemy.name}, Level ${alchemy.level}, total score: ${this_score}.`
			let table_str = ""
			table_str += `<table class="high_score_table">`
			table_str += `<thead>
			<tr>
				<td>
					Rank
				</td>
				<td>
					Name
				</td>
				<td>
					Level
				</td>
				<td>
					Score
				</td>
			</tr> 
		</thead><tbody>`

			for (let i = 0; i < high_score_list.length; i++) {
				if (high_score_list[i][0] == alchemy.name && high_score_list[i][2] == this_score) {
					table_str += `<tr class="current_run">`
					score_message+=` You reached rank ${i+1}</p>`
				} else {
					table_str += `
				<tr>`
				}
				table_str += `
					<td>
						${i+1}
					</td>
					<td>
						${high_score_list[i][0]}
					</td>
					<td>
						${high_score_list[i][1]}
					</td>
					<td>
						${high_score_list[i][2]}
					</td>
				</tr>` 
		}
		table_str+=`</tbody>`
		html_str+=score_message
		html_str+=table_str
		html_str += `<a href="#new_alchemist"><button>Start a new game</button></a>`;
		localStorage.setItem('highscore', JSON.stringify(high_score_list))
		return html_str
	}
	static renderNewAlchemist()
	{
		let html_str=""
		html_str+=`<form></form>`
	}
	static renderNewPotion()
	{
		let html_str=""
		html_str+=`<form></form>`
	}
	static renderShops(alchemy)
	{
		let station_max=alchemy.profBonus+alchemy.int
		let current_stations=alchemy.stations.length

		let html_str=""
		html_str+=`<div id="shop_page">`
		html_str+=`<p>At your current level, you could run ${station_max} at once. You are currently running ${current_stations} stations.</p>`
		if (station_max != current_stations) {
			html_str+=`<a href="#buy_station"><button>Buy a Station for 50 gp</button></a>`
		}
		else
		{
			html_str+=`<p>You cannot purchase any new stations at this time</p>`
		}
		html_str+=`<a href="#begin_week"><button>Return</button></a>`
		html_str+=`</div>`
		return html_str
	}
}

let stationJobs = ['researching', 'crafting', 'do nothing'];

function cheapEnum(potion, potion_cat) {
	let index = potion_cat.potions.findIndex(item => item.name == potion);
	if (index == -1) //oops, some how got past the last check
	{
		console.log("Potion not in list at Render.CheapEnum");
		console.log("potion: " + potion)
		return 1;
	}
	switch (potion_cat.potions[index].rarity) {
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

function getRarity(potion, potion_cat) {
	let index = potion_cat.potions.findIndex(item => item.name == potion);
	if (index == -1) //oops, some how got past the last check
	{
		return 'unknown';
	}
	switch (potion_cat.potions[index].rarity) {
		case 'common':
			return 'common';
		case 'uncommon':
			return 'uncommon';
		case 'rare':
			return 'rare';
		case 'very rare':
			return 'very rare';
		case 'legendary':
			return 'legendary';
		default:
			console.log("Error: rarity out of bounds in switch. Attempted Rarity: " + potion_cat[index].rarity);
			return 'unknown';
	}
}