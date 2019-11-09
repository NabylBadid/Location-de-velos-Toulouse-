// Fonction Diapo
/*
let i = 0;

let images = ["img1.jpg", "img2.jpg", "img3.jpg"];

let temps = 5000;

document.slide.src = images[i];

function changeImg() {

	if (i < images.length - 1) {
		i++;
	} else {
		i = 0;
	}

	document.slide.src = images[i];

}

	let interval = null; 

window.onload = changerEtat; 


// Bouton Pause

let bPause = document.getElementById("bDiapo");

function arreter() {
	console.log(interval);
	clearInterval(interval);
	bPause.innerHTML = "";
	bPause.textContent = "Jouer";
};

function jouer() {
		interval = setInterval("changeImg()", temps);
		console.log(interval);
		bPause.innerHTML = "";
		bPause.textContent = "Pause";
};

let etatSlide = false;

function changerEtat () {
	if (etatSlide) {
		arreter();
		etatSlide = false;
	} else {
		jouer();
		etatSlide = true;
	}
}

bPause.addEventListener("click" , changerEtat);

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

*/


























// ORIENTE OBJET 

let diapo = {

i : 0,
images : ["img1.jpg", "img2.jpg", "img3.jpg"],
temps : 5000,
interval : null,
bPause : document.getElementById("bPause"),
etatSlide : false,
bGauche : document.getElementById("flecheG"),
bDroite : document.getElementById("flecheD"),
slide : document.slide,

init : function() {
	this.slide.src = this.images[this.i];
	window.onload = this.changerEtat.bind(this); 
	this.bPause.addEventListener("click" , this.changerEtat.bind(this));
	this.bGauche.addEventListener("click", this.reculer.bind(this));
	this.bDroite.addEventListener("click", this.avancer.bind(this));
	document.addEventListener("keydown", this.appuyer.bind(this));
},
changeImg : function() {
	if (this.i < this.images.length - 1) {
		this.i++;
	} else {
		this.i = 0;
	}
	this.slide.src = this.images[this.i];
},
// Bouton Pause
arreter : function() {
	clearInterval(this.interval);
	this.bPause.innerHTML = "";
	this.bPause.textContent = "Jouer";
},
jouer : function() {
		this.interval = setInterval(this.changeImg.bind(this), this.temps);
		this.bPause.innerHTML = "";
		this.bPause.textContent = "Pause";
},
changerEtat : function() {
	if (this.etatSlide) {
		this.arreter();
		this.etatSlide = false;
	} else {
		this.jouer();
		this.etatSlide = true;
	}
},
// Clique gauche et droit 
reculer : function() {

	this.slide.src = this.images[this.i];

	if ((this.i <= this.images.length - 1) && (this.i !== 0)) {
		this.i--;
	} else {
		this.i = this.images.length - 1;
	}
},
avancer : function() {

	this.slide.src = this.images[this.i];

	if ( (this.i === 0) || (this.i < this.images.length - 1) ) {
		this.i++;
	} else {
		this.i = 0
	}
},
// Appui sur les flèches de gauche et de droite
appuyer : function(e) {
	if (e.keyCode === 37) {
		this.reculer();
	} else if (e.keyCode === 39) 
		this.avancer();
 },

};

diapo.init();


/*
function a(callback) {

	callback("salut");

}

function b(message){
	alert(message);
}

a(b);
*/


/* Carte */

	let mymap = L.map('mapid').setView([51.505, -0.09], 13);

	let tuileRue = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoibmFieWwiLCJhIjoiY2sycHltd2p1MDY5MTNlbW9mODNqdTNhbCJ9.ZBB6hmUZi_JNNjbhURXljw'
})
	tuileRue.addTo(mymap);



