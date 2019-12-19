class Map {
    constructor () {
        this.mymap = L.map('mapid').setView([43.600247, 1.444700], 13),
        this.apiJcdecaux  = "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=18e9df72cf97bc3cc6bafec0bfdd7ba2e461c99f",
        this.nameStation = document.getElementById("nameStation"),
        this.stateStation = document.getElementById("state"),
        this.adressStation = document.getElementById("adress"),
        this.placesStation = document.getElementById("places"),
        this.bikesStation = document.getElementById("bikes"),
        this.buttonStation = document.getElementById("reserve"),
        this.info = $("#info"),
        this.nameUser = document.getElementById("nameUser"),
        this.firstNameUser = document.getElementById("firstName"),
        this.message = document.getElementById("message")
    };
    

    init () {
        this.initMap();
        this.returnStation();
    }

    initMap () {
        let tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
            maxZoom : 18,
            accessToken : 'pk.eyJ1IjoibmFieWwiLCJhIjoiY2sycHltd2p1MDY5MTNlbW9mODNqdTNhbCJ9.ZBB6hmUZi_JNNjbhURXljw',
            id : 'mapbox.streets'
        })
        tileLayer.addTo(this.mymap);
    }

    returnStation () {
        let query = new XMLHttpRequest();
        query.open("GET", this.apiJcdecaux);
        query.send();
        let self = this;
    
        query.onload = function() {
            if (query.status >= 200 && query.status < 400) { // Le serveur a réussi à traiter la requête
                let stationsListe = JSON.parse(query.responseText);
                stationsListe.forEach( (station) => {
                    // Appeler la fonction qui appelle le marqueur
                    let marker = L.marker([station.position.lat, station.position.lng]).addTo(self.mymap);
                    marker.addEventListener("click", self.clickMarker(station));
                })
            }
        };
    }

    clickMarker (station) {
        this.nameStation.textContent = station.name.split("-").pop();
        this.stateStation.textContent = station.status;
        this.adressStation.textContent = station.address;
        this.placesStation.textContent = station.bike_stands;
        this.bikesStation.textContent = station.available_bikes;
        this.message.textContent = "";
        this.info.css("display", "block");
        if (this.bikesStation.textContent === "0") {
            this.message.textContent = "Plus aucun vélo n'est disponible à cette station, veuillez en choisir une autre.";
            this.nameUser.disabled = true;
            this.firstNameUser.disabled = true;
        } else {
            this.nameUser.disabled = false;
            this.firstNameUser.disabled = false;
        }  
    }
}








// OBJECT MAP 
/*
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

// Création d'une queryuete HTTP
let query = new XMLHttpRequest();
// La requête est asynchrone lorsque le 3ème paramètre vaut true ou est absent
query.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=18e9df72cf97bc3cc6bafec0bfdd7ba2e461c99f");
query.send(query);
let nameStation = document.getElementById("nameStation");
let stateStation = document.getElementById("state");
let adressStation = document.getElementById("adress");
let placesStation = document.getElementById("places");
let bikesStation = document.getElementById("bikes");
let buttonStation = document.getElementById("reserve");
query.addEventListener("load", function() {
    if (query.status >= 200 && query.status < 400) { // Le serveur a réussi à traiter la requête
        //console.log(JSON.parse(query.responseText));
        let stationsListe = JSON.parse(query.responseText);
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
                nameUser.disabled = true;
                firstNameUser.disabled = true;
                info.css("display", "block");
                if (nameStation.textContent === "") {

                }
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
        console.error(query.status + " " + query.statusText);
    }
})*/