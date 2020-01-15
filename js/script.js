// SLIDER EN PROCEDURAL 
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






// MAP EN PROCEDURAL 

// let mymap = L.map('mapid').setView([43.600247, 1.444700], 13);

// let tuileRue = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1IjoibmFieWwiLCJhIjoiY2sycHltd2p1MDY5MTNlbW9mODNqdTNhbCJ9.ZBB6hmUZi_JNNjbhURXljw'
// })
// tuileRue.addTo(mymap);

// // Récupération données stations

// // URL recup donnees stations https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=18e9df72cf97bc3cc6bafec0bfdd7ba2e461c99f

// // Création d'une queryuete HTTP
// let query = new XMLHttpRequest();
// // La requête est asynchrone lorsque le 3ème paramètre vaut true ou est absent
// query.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=18e9df72cf97bc3cc6bafec0bfdd7ba2e461c99f");
// query.send(query);
// letnameUser = document.getElementById("nameUser");
// let firstNameUser = document.getElementById("firstName");
// let nameStation = document.getElementById("nameStation");
// let stateStation = document.getElementById("state");
// let adressStation = document.getElementById("adress");
// let placesStation = document.getElementById("places");
// let bikesStation = document.getElementById("bikes");
// let buttonStation = document.getElementById("reserve");
// query.onload = function() {
//     if (query.status >= 200 && query.status < 400) { // Le serveur a réussi à traiter la requête
//         //console.log(JSON.parse(query.responseText));
//         let stationsListe = JSON.parse(query.responseText);
//         stationsListe.forEach(function(station) {
//             // Appeler la fonction qui appelle le marqueur 
//             let marker = L.marker([station.position.lat, station.position.lng]).addTo(mymap);
//             //console.log(marker);
//             marker.addEventListener("click", function clickMarker () {
//                 nameStation.textContent = station.name.split("-").pop();
//                 stateStation.textContent = station.status;
//                 adressStation.textContent = station.address;
//                 placesStation.textContent = station.bike_stands;
//                 bikesStation.textContent = station.available_bikes;
//                 message.textContent = "";
//                 if (bikesStation.textContent === "0") {
//                     message.textContent = "Plus aucun vélo n'est disponible à cette station, veuillez en choisir une autre.";
//                     nameUser.disabled = true;
//                     firstNameUser.disabled = true;
//                 } else {
//                     nameUser.disabled = false;
//                     firstNameUser.disabled = false;
//                 }  
//             });
//             return stationsListe;
//         }) 
//     }else {
//         // Affichage des informations sur l'échec du traitement de la requête
//         console.error(query.status + " " + query.statusText);
//     }
// };








// RESERVATION  EN PROCEDURAL 


// let nameUser = $("#nameUser");
// let firstNameUser = $("#firstName");
// let message = document.getElementById("message");
// let info = $("#info");
// let canvas = $("#canvas");
// let stationReserved = $("#stationReserved");
// let countdown = $("#countdown");
// let cancelReservation = $("#cancelReservation");
// let reservation = $("#reservation");
// let buttonStation = document.getElementById("submitButton");

// function checkSeizure(e) { //verifierSaisie
//     let regexSaisie = /\d/;
//     let seizure = e.target.value;
    
//     if ((regexSaisie.test(seizure)) || (seizure.length < 2)) {
//         message.textContent = "Votre nom et votre prénom doivent contenir au moins une lettre et ne peuvent pas contenir de chiffre.";
//         nameUser.value = "";
//         firstNameUser.value = "";
//     } else {
//         buttonStation.disabled = false;
//     }
// }

// function submitForm(e) {
//     e.preventDefault();

//     let seizureNameUser = nameUser.val();
//     let seizureFirstNameUser = firstNameUser.val();
//     let choiceStation = nameStation.textContent;
//     sessionStorage.setItem("nameUser", seizureNameUser);
//     sessionStorage.setItem("firstNameUser", seizureFirstNameUser);
//     sessionStorage.setItem("choiceStation", choiceStation);
//     let nameStocked = sessionStorage.getItem("nameUser");
//     let firstNameStocked = sessionStorage.getItem("firstNameUser");
//     let stationStocked = sessionStorage.getItem("choiceStation");
//     stationReserved.text(`${nameStocked} ${firstNameStocked} a réservé un vélo à la station ${stationStocked}.`);

//     let timeInMinutes = 1;
//     let currentTime = Date.parse(new Date());
            
//     let deadline = new Date(currentTime + timeInMinutes * 60 * 1000);
//     sessionStorage.setItem("deadline", new Date(currentTime + timeInMinutes * 60 * 1000));
            
//     function getTimeRemaining(endtime) {
//         let t = Date.parse(endtime) - Date.parse(new Date());
        
//         let secondes = Math.floor((t / 1000) % 60);
//         let minutes = Math.floor((t / 1000 / 60) % 60);
//         sessionStorage.setItem("t" , Date.parse(endtime) - Date.parse(new Date()));
//         sessionStorage.setItem("secondes", Math.floor((t / 1000) % 60));
//         sessionStorage.setItem("minutes",  Math.floor((t / 1000 / 60) % 60));

//         return {
//             t,
//             minutes,
//             secondes
//         };
//     }
    
//     function initializeClock(id, endtime) {
//         //let clock = document.getElementById(id); // Essayer en mettant du jQuery
//         function updateClock() {
//             let t = getTimeRemaining(endtime);

//             let wordMinutes = ((t.minutes === 1) || (t.minutes === 0)) ? "minute" : "minutes";
//             let wordSecondes = ((t.secondes === 1) || (t.secondes === 0)) ? "seconde" : "secondes";
//             sessionStorage.setItem("wordMinutes", ((sessionStorage.getItem("minutes") === 1) || (sessionStorage.getItem("minutes") === 0)) ? "minute" : "minutes");
//             sessionStorage.setItem("wordSecondes", ((sessionStorage.getItem("secondes") === 1) || (sessionStorage.getItem("secondes") === 0)) ? "seconde" : "secondes");
//             sessionStorage.setItem("t", t.t);
            

//             if(t.t === 0) {
//                 clearInterval(timeInterval);
//                 stationReserved.text("Votre réservation a éxpirée.");
//                 countdown.hide();
//                 sessionStorage.removeItem("choiceStation");
//                 cancelReservation.css("display", "none");
//                 buttonStation.disabled = false;
//                 } else {
//                     countdown.show();
//                     let secStorage = sessionStorage.getItem("secondes");
//                     let minStorage = sessionStorage.getItem("minutes");
//                     countdown.text(`Votre réservation expirera dans ${minStorage} ${wordMinutes} et ${secStorage} ${wordSecondes}.`);
//                 }

//             countdown.text(`Votre réservation expirera dans ${t.minutes} ${wordMinutes} et ${t.secondes} ${wordSecondes}.`);            
//         }
//         updateClock(); // run function once at first to avoid delay (éxécuter une fois pour éviter les retards).
//         let timeInterval = setInterval(updateClock,1000);
//         cancelReservation.css("display", "block");
//         buttonStation.disabled =  true;
//         callCancel(timeInterval);
//     }

//     initializeClock(reservation, deadline);

// }


// function callCancel (interval) {
//     cancelReservation.click(function() {
//         clearInterval(interval);
//         sessionStorage.clear();
//         stationReserved.text("Vous avez annuler votre réservation.");
//         countdown.hide();
//         cancelReservation.css("display", "none");
//     })
// }



// function callCountdown () {

//     let tStorage = sessionStorage.getItem("t");
//     let minutesStorage = sessionStorage.getItem("minutes");
//     let secondesStorage = sessionStorage.getItem("secondes");
//     let wordMinutesStorage = sessionStorage.getItem("wordMinutes");
//     let wordSecondesStorage = sessionStorage.getItem("wordSecondes");
//     let nameStorage = sessionStorage.getItem("nameUser");
//     let firstNameStorage = sessionStorage.getItem("firstNameUser");
//     let stationStorage = sessionStorage.getItem("choiceStation");
//     let deadlineStorage = sessionStorage.getItem("deadline");
//     let time = Date.parse(deadlineStorage) - Date.parse(new Date());
//     let secondesTime = Math.floor((time / 1000) % 60);
//     let minutesTime = Math.floor((time / 1000 / 60) % 60);
//     let buttonStation = document.getElementById("reserve");

//     if (time > 0) {
//         stationReserved.text(`${nameStorage} ${firstNameStorage} a réservé un vélo à la station ${stationStorage}.`);
//         countdown.text(`Votre réservation expirera dans ${minutesTime} ${wordMinutesStorage} et ${secondesTime} ${wordSecondesStorage}.`);
//         let ti = setInterval(callCountdown, 1000);
//         cancelReservation.css("display", "block");
//         buttonStation.disabled =  true;
//         callCancel(ti);

//     }else if ( time < 0 ) {
//         clearInterval(callCountdown)
//         stationReserved.text("Votre réservation a éxpirée.");
//         countdown.hide();
//         sessionStorage.clear();
//         cancelReservation.css("display", "none");
//         buttonStation.disabled = false;
//     }

// }

// callCountdown();



// let form = document.getElementById("form");
// nameUser.blur(checkSeizure);
// firstNameUser.blur(checkSeizure);
// form.addEventListener("submit", submitForm);
