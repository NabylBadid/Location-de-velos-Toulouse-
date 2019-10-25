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

function arreter() {
	clearInterval(interval);
	bPause.innerHTML = "";
	bPause.textContent = "Jouer";
};
/*
function jouer() {
		setInterval("changeImg()", temps);
		bPause.innerHTML = "";
		bPause.textContent = "Pause";
};*/

bPause.addEventListener("click" , arreter);
//bPause.removeEventListener("click", jouer);

// Clique gauche et droit 

let bGauche = document.getElementById("flecheG");
let bDroite = document.getElementById("flecheD");

function reculer() {

	document.slide.src = images[i];

	if ((i <= images.length - 1) && (i !== 0)) {
		i--;
	} else {
		i = images.length - 1;
	}
}

function avancer() {

	document.slide.src = images[i];

	if ( (i === 0) || (i < images.length - 1) ) {
		i++;
	} else {
		i = 0
	}
}

bGauche.addEventListener("click", reculer);
bDroite.addEventListener("click", avancer);

// Appui sur les flèches de gauche et de droite

function appuyer(e) {
	if (e.keyCode === 37) {
		reculer();
	} else if (e.keyCode === 39) 
		avancer();
 }

document.addEventListener("keydown", appuyer);




console.log(images.length);