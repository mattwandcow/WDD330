const buttons = document.getElementsByClassName('key');
// console.log(buttons[0]);
window.addEventListener('keypress', logKey => {
	// console.log(logKey);
	playBeat(logKey.key);
})
for (var i = 0; i < 9; i++) {
	let words = buttons[i].innerText.split('\n');
	console.log(words);
	buttons[i].addEventListener('click', e => {
		// console.log(words[0]);
		playBeat(words[0]);
	})
	// console.log("Attached "+words[0]+" to:");
	// console.log(buttons[i]);
}

const audioFiles = [
	new Audio('sounds/clap.wav'),
	new Audio('sounds/hihat.wav'),
	new Audio('sounds/kick.wav'),
	new Audio('sounds/openhat.wav'),
	new Audio('sounds/boom.wav'),
	new Audio('sounds/ride.wav'),
	new Audio('sounds/snare.wav'),
	new Audio('sounds/tom.wav'),
	new Audio('sounds/tink.wav')
]


function playBeat(char) {
	switch (char) {
		case 'a':
		case 'A':
			console.log("Letter A Pressed");
			audioFiles[0].currentTime=0;
			audioFiles[0].play();
			break;
		case 's':
		case 'S':
			console.log("Letter S Pressed");
			audioFiles[1].currentTime=0;
			audioFiles[1].play();
			break;
		case 'd':
		case 'D':
			console.log("Letter D Pressed");
			audioFiles[2].currentTime=0;
			audioFiles[2].play();
			break;
		case 'f':
		case 'F':
			console.log("Letter F Pressed");
			audioFiles[3].currentTime=0;
			audioFiles[3].play();
			break;
		case 'g':
		case 'G':
			console.log("Letter G Pressed");
			audioFiles[4].currentTime=0;
			audioFiles[4].play();
			break;
		case 'h':
		case 'H':
			console.log("Letter H Pressed");
			audioFiles[5].currentTime=0;
			audioFiles[5].play();
			break;
		case 'J':
		case 'j':
			console.log("Letter J Pressed");
			audioFiles[6].currentTime=0;
			audioFiles[6].play();
			break;
		case 'k':
		case 'K':
			console.log("Letter K Pressed");
			audioFiles[7].currentTime=0;
			audioFiles[7].play();
			break;
		case 'l':
		case 'L':
			console.log("Letter L Pressed");
			audioFiles[8].currentTime=0;
			audioFiles[8].play();
			break;
	}
}