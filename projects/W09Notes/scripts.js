//Window
console.log(window.location);

const popup = window.open('https://mad-matt.com', 'Matt\'s Madness', 'width=400,height=400,resizable=yes');
window.setTimeout(() => {
	popup.close();
}, 3000);
//HTML 5 and API
function youAreHere(position) {
	console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
}
navigator.geolocation.getCurrentPosition(youAreHere);

function notify() {
	if (window.Notification) {
		Notification.requestPermission().then((permission) => {
			if (Notification.permission === 'granted') {
				new Notification('Hello Javascript!')
			}
		});
	}
};

function canvas_draw() {
	const canvasElement = document.getElementById('canvas');
	const context = canvasElement.getContext('2d');
	context.fillStyle = "#0000cc"; // a blue fill color 
	context.strokeStyle = "#ccc"; // a gray stroke color
	context.lineWidth = 4;
	context.fillRect(10, 10, 100, 50);
	context.fillStyle = '#0c0'; // a blue fill color
	context.font = 'bold 26px sans-serif';
	context.fillText('Hello', 20, 200);
}