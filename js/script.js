/*
function a(callback) {

	callback("salut");

}

function b(message){
	alert(message);
}

a(b);
*/


// OBJECT MAP 

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
let nameStation = document.getElementById("nameStation");
let stateStation = document.getElementById("state");
let adressStation = document.getElementById("adress");
let placesStation = document.getElementById("places");
let bikesStation = document.getElementById("bikes");
let buttonStation = document.getElementById("reserve");
req.addEventListener("load", function() {
    if (req.status >= 200 && req.status < 400) { // Le serveur a réussi à traiter la requête
        //console.log(JSON.parse(req.responseText));
        let stationsListe = JSON.parse(req.responseText);
        stationsListe.forEach(function(station) {
            // Appeler la fonction qui appelle le marqueur 
            let marker = L.marker([station.position.lat, station.position.lng]).addTo(mymap);
            marker.addEventListener("click", function clickMarker() {
                nameStation.textContent = station.name.split("-").pop();
                stateStation.textContent = station.status;
                adressStation.textContent = station.address;
                placesStation.textContent = station.bike_stands;
                bikesStation.textContent = station.available_bikes;
                message.textContent = "";
                info.css("display", "block");
                if (bikesStation.textContent === "0") {
                    message.textContent = "Plus aucun vélo n'est disponible à cette station, veuillez en choisir une autre.";
                    nameUser.disabled = true;
                    firstNameUser.disabled = true;
                } else {
                    nameUser.disabled = false;
                    firstNameUser.disabled = false;
                }  
            })
        });
    } else {
        // Affichage des informations sur l'échec du traitement de la requête
        console.error(req.status + " " + req.statusText);
    }
});

// OBJECT RESERVATION 

let nameUser = document.getElementById("nameUser");
let firstNameUser = document.getElementById("firstName");
let message = document.getElementById("message");
let info = $("#info");
let canvas = $("#canvas");

function checkSeizure(e) { //verifierSaisie
    let regexSaisie = /\d/;
    let seizure = e.target.value;
    if ((regexSaisie.test(seizure)) || (seizure.length < 2)) {
        message.textContent = "Votre nom et votre prénom doivent contenir au moins une lettre et ne peuvent pas contenir de chiffre.";
        nameUser.value = "";
        firstNameUser.value = "";
    } else {
        buttonStation.disabled = false;
    }
}

function submitForm(e) {
    let seizureNameUser = nameUser.value;
    let seizureFirstNameUser = firstNameUser.value;
    let choiceStation = [nameStation.textContent, stateStation.textContent, adressStation.textContent, placesStation.textContent, bikesStation.textContent, buttonStation.textContent];
    let stationReserved = $("#stationReserved");
    stationReserved.text(`${seizureNameUser} ${seizureFirstNameUser} a réservé un vélo à la station ${choiceStation[0]}.`);

    e.preventDefault();

    let timeInMinutes = 20;
    let currentTimeStocked = sessionStorage.currentTime = Date.parse(new Date());
    //let currentTime = Date.parse(new Date());
    let deadlineStocked = sessionStorage.deadline = new Date(currentTimeStocked + timeInMinutes * 60 * 1000);    
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        let secondes = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        return {
            t,
            minutes,
            secondes
        };
    }
    
    function initializeClock(id, endtime) {
        //let clock = document.getElementById(id); // Essayer en mettan du jQuery
        function updateClock() {
            let t = getTimeRemaining(endtime);
            console.log(t);
            let wordMinutes = "minutes";
            let wordSecondes = "secondes";
            let countdown = $("#countdown");

            let wordMinutes2 = ((t.secondes === 1) || (t.minutes === 0)) ? "minute" : "minutes";
            console.log(wordMinutes2);
            

            if(t.total <= 0) {
                countdown.text("Votre réservation a éxpirée.");
            }
            
            if(t.minutes === 1) {
                wordMinutes = "minute";
            } else if(t.minutes === 0) {
                wordMinutes = "";
                minutes = "";
            }
            
            if(t.secondes <= 1) {
                wordSecondes = "seconde";
            }
            countdown.text(`Votre réservation expirera dans ${t.minutes} ${wordMinutes} et ${t.secondes} ${wordSecondes}.`);            
        }
        //sessionStorage.setItem('countdown', countdown);
        updateClock(); // run function once at first to avoid delay (éxécuter une fois pour éviter les retards)
        let timeInterval = setInterval(updateClock,1000);
    }

    initializeClock("reservation", deadlineStocked);
}



let form = document.getElementById("form");
nameUser.addEventListener("blur", checkSeizure);
firstNameUser.addEventListener("blur", checkSeizure);
form.addEventListener("submit", submitForm);
/*  display = getComputedStyle(canvas).display;
display.textContent = "block";      */
