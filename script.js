// Fonction Diapo

let i = 0;

let images = ["img1.jpg", "img2.jpg", "img3.jpg"];

let temps = 5000;

function changeImg() {

	document.slide.src = images[i];

	if (i < images.length - 1) {
		i++;
	} else {
		i = 0;
	}

}

	let interval = setInterval("changeImg()", temps); 


window.onload = changeImg; 

// Bouton Pause

let bPause = document.getElementById("bDiapo");

function pause() {
	clearInterval(interval);
	bPause.innerHTML = "";
	bPause.textContent = "Jouer";
};

bPause.addEventListener("click" , pause);