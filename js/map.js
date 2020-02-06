class Map {
    constructor () {
        this.mymap = L.map('mapid').setView([43.600247, 1.444700], 13);
        this.apiJcdecaux  = "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=18e9df72cf97bc3cc6bafec0bfdd7ba2e461c99f";
        this.nameStation = $("#nameStation");
        this.stateStation = $("#state");
        this.adressStation = $("#adress");
        this.placesStation = $("#places");
        this.bikesStation = $("#bikes");
        this.buttonStation = $("#submitButton");
        this.info = $("#info");
        this.nameUser = $("#nom");
        this.firstNameUser = $("#prénom");
        this.message = $("#message");
    };

    init () {
        this.initMap();
        this.returnStation();
    }

    // Appel l'affichage de la map
    initMap () {
        let tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibmFieWwiLCJhIjoiY2sycHltd2p1MDY5MTNlbW9mODNqdTNhbCJ9.ZBB6hmUZi_JNNjbhURXljw'
        })
        tileLayer.addTo(this.mymap);
    }

    // Renvoie les données de la station
    returnStation () {
        $.getJSON(this.apiJcdecaux, (data) => {
            $.each(data, (i) => {
            let station = data[i];
            // on stocke dans station toutes les infos et fonction d'appel au click
            L.marker([station.position.lat, station.position.lng], {"station": station})   
                .on('click', this.clickMarker)
                .addTo(this.mymap);
            });
        });
    }
    
    // Affiche, au clique, les informations liées à la station
    clickMarker (event) {
        //Récupère la station depuis event (faire un console.log pour voir event)
        let station = event.target.options.station;
        let message = $("#message");
        let nameUser = $("#nom");
        let firstNameUser = $("#prénom");
        let bikes = $("#bikes");
        bikes.text(station.available_bikes);
        //Mise à jour des informations de la station
        $("#nameStation").text(station.name.split("-").pop());
        $("#state").text(station.status);
        //Mettre 2 d à address dans ton html et ici
        $("#adress").text(station.address);
        $("#places").text(station.bike_stands);

        if (bikes.text() === "0") {
            message.text("Plus aucun vélo n'est disponible à cette station, veuillez en choisir une autre.");
            nameUser.prop("disabled", true);
            firstNameUser.prop("disabled", true);
        } else {
            message.text("Veuillez renseigner votre nom et votre prénom.");
            nameUser.prop("disabled", false);
            firstNameUser.prop("disabled", false);
        }    
    }
}