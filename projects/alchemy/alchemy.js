let ALCHEMIST = {};
const POTION_LIST = [];
let PAGE_SWITCH;

function firstLoad() {
	PAGE_SWITCH = 0;
	//load potion list
	POTION_LIST.push({
		name: 'Potion of Healing',
		complexity: 1
	});

	//see if there is a old save
	ALCHEMIST = JSON.parse(localStorage.getItem('alchemist_stats'));

	render();
	//##Check alchemist to make sure there's no non-existant potions on the list
}

function render() {
	dbox = document.getElementById('alchemy_display');
	menu_box = document.createElement('div');
	switch (PAGE_SWITCH) {
		case 0: //splash Page
			console.log("Rendering Splash Page");
			h2 = document.createElement('h2');
			deleteAlchemistBtn = document.createElement('button');
			deleteAlchemistBtn.name = "btn-delete";
			deleteAlchemistBtn.classList = "splash-btn";
			deleteAlchemistBtn.innerText = "Delete Alchemist";

			deleteAlchemistBtn.addEventListener('click', () => {
				PAGE_SWITCH = 1;
				render();
			})

			newAlchemistBtn = document.createElement('button');
			newAlchemistBtn.name = "btn-new";
			newAlchemistBtn.classList = "splash-btn";
			newAlchemistBtn.innerText = "Start New Alchemist";
			newAlchemistBtn.addEventListener('click', () => {
				PAGE_SWITCH = 2;
				render();
			})

			resumeGameBtn = document.createElement('button');
			resumeGameBtn.name = "btn-resume";
			resumeGameBtn.classList = "splash-btn";
			resumeGameBtn.innerText = "Resume Game";
			resumeGameBtn.addEventListener('click', () => {
				PAGE_SWITCH = 3;
				render();
			})

			if (ALCHEMIST == null) {
				console.log("No previous alchemist");
				h2.innerText = "Welcome new Alchemist!"
				menu_box.appendChild(newAlchemistBtn);
			} else {
				console.log("Previous alchemist");
				h2.innerText = "Welcome " + ALCHEMIST.name + "!"
				menu_box.appendChild(resumeGameBtn);
				menu_box.appendChild(deleteAlchemistBtn);
			}
			dbox.appendChild(h2);
			dbox.appendChild(menu_box);
			break;
		case 1: //delete alchemist
			console.log("Delete Alchemist");
			
			break;
		case 2: //Create new alchemist
			console.log("Create new Alchemist");
			//form
			//name
			break;
	}

}