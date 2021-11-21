function clicker() {
	//starts get Hero
	getHero();
}
async function getHero() { //or heroine. No gatekeeping
	console.log("getting hero");
	destination = document.getElementById('Hero-box');
	fetch('stick.txt').then(
		response => response.text()).then(text=>{
			console.log(text);
			destination.innerText=text;
		});
}

const form  = document.getElementsByTagName('form')[1];
const userid=document.getElementById("userid");
const useridError=document.querySelector('#userid + span.error');
userid.addEventListener('input', function (event){
if(userid.validity.valid)
{
	useridError.textContent='' 	//emptys message
	useridError.className='error';

}
else{
	showError();				//displ;ays message
}
})

form.addEventListener('submit', function (event){
	if (!userid.validity.valid)
	{
		console.log("Invalid Submit!");
		showError();			//displays the message

		event.preventDefault(); //cancels the submit
	}
})

function showError(){
	console.log("Adding Error...");
	if(userid.validity.valueMissing){
		useridError.textContent="No Username!!!"
	}
	else if(userid.validity.tooShort) {
		useridError.textContent = "Username needs to be longer!";
	  }
	useridError.className='error active';
}