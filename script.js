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


// Affichage Carte 

	let mymap = L.map('mapid').setView([43.600247, 1.444700], 13);

	let tuileRue = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	//attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoibmFieWwiLCJhIjoiY2sycHltd2p1MDY5MTNlbW9mODNqdTNhbCJ9.ZBB6hmUZi_JNNjbhURXljw'
})
	tuileRue.addTo(mymap);

// Récupération données stations

// URL recup donnees stations https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=18e9df72cf97bc3cc6bafec0bfdd7ba2e461c99f

// Création d'une requete HTTP
let req = new XMLHttpRequest();
// La requête est asynchrone lorsque le 3ème paramètre vaut true ou est absent
req.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=18e9df72cf97bc3cc6bafec0bfdd7ba2e461c99f");
req.send(req);
let nomStation  = document.getElementById("nomStation");
let statutStation  = document.getElementById("statut");
let adresseStation  = document.getElementById("adresse");
let placesStation  = document.getElementById("places");
let velosStation  = document.getElementById("velos");
let boutonStation  = document.getElementById("reserver");
req.addEventListener("load", function () {
    if (req.status >= 200 && req.status < 400) { // Le serveur a réussi à traiter la requête
		//console.log(JSON.parse(req.responseText));
		let stationsListe = JSON.parse(req.responseText);
		stationsListe.forEach(function(station) {
			// Appeler la fonction qui appelle le marqueur 
			let marker = L.marker([station.position.lat, station.position.lng]).addTo(mymap);
		marker.addEventListener("click", function cliqueMarqueur() {
		nomStation.textContent = station.name.split("-").pop();
		statutStation.textContent = station.status;
		adresseStation.textContent = station.address;
		placesStation.textContent = station.bike_stands;
		velosStation.textContent = station.available_bikes;
		})
		});
    } else {
        // Affichage des informations sur l'échec du traitement de la requête
        console.error(req.status + " " + req.statusText);
    }
});

let nomUtilisateur = document.getElementById("nomUtilisateur");
let prenomUtilisateur = document.getElementById("prenom");
let message = document.getElementById("message");
let canvas = $("canvas");

function verifSaisi (e) {
	let regexSaisie = /\d/;
	let saisie = e.target.value;
	if ((regexSaisie.test(saisie)) || (saisie.length < 2)) {
		message.textContent = "Votre nom et votre prénom doivent contenir au moins une lettre et ne peuvent pas contenir de chiffre.";
		console.log("clique");
		nomUtilisateur.value = "";
		prenomUtilisateur.value = "";
	} else {
		display = getComputedStyle(canvas).display;
		display.textContent = "block";
	}
}

function soumissionForm (e) {
	let saisieNomUtilisateur = e.nomUtilisateur.value;
	let saisiePrenomUtilisateur = e.prenomUtilisateur.value;
	let regexSaisie = /\d/;
	if ((regexSaisie.test(saisieNomUtilisateur)) || (regexSaisie.test(saisiePrenomUtilisateur)) || (saisiePrenomUtilisateur < 2) || (saisieNomUtilisateur < 2)){
		console.log("clique");
		message.textContent = "Votre nom et votre prénom doivent contenir au moins une lettre et ne peuvent pas contenir de chiffre.";
		nomUtilisateur.value = "";
		prenomUtilisateur.value = "";		
	} else {
		canvas.style("display", "block");
	}
}

function enleverMsg () {
	if ((nomUtilisateur.value === "") || (prenomUtilisateur.value === "")) {
		message.textContent = "";
	}
}

nomUtilisateur.addEventListener("blur", verifSaisi);
prenomUtilisateur.addEventListener("blur", verifSaisi);
nomUtilisateur.addEventListener("focus", enleverMsg);
prenomUtilisateur.addEventListener("focus", enleverMsg);

boutonStation.addEventListener("submit", verifSaisi);

		/*display = getComputedStyle(canvas).display;
		display.textContent = "block";		*/