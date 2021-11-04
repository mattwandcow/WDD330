export default class Alchemist {
	constructor(name='Nicki Flamel'){
		this.name=name;
		this.level=1;
		this.exp=0;
		this.int=1;
		this.profBonus=2;
		this.gold=500;
		this.stations=1;
		this.saveToStorage = function () {
			localStorage.setItem('alchemist',JSON.stringify(this));
			console.log("hate");}
	}
	static loadFromStorage() {
		let loader=new Alchemist()
		let oldalchemist= JSON.parse(localStorage.getItem('alchemist'));
		loader.name=oldalchemist.name;
		loader.level=oldalchemist.level
		loader.exp=oldalchemist.exp;
		loader.int=oldalchemist.int;
		loader.profBonus=oldalchemist.profBonus;
		loader.gold=oldalchemist.gold;
		loader.stations=oldalchemist.stations;
		return loader;
	}
	static CreateDefaultAlchemist(){
		return new Alchemist();
	}

}