import {
	getJSON,
	getLocation
} from "./w10utilities.js";

let sample_url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';

function youAreHere(position) {
	console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
}

function run_load() {
	console.log("Loaded and running!");
	let query =
	this.baseUrl +
	`&latitude=${position.lat}&longitude=${position.lon}&maxradiuskm=${radius}`;
	

}

run_load()