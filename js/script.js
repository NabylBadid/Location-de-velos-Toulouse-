/*
function a(callback) {

	callback("salut");

}

function b(message){
	alert(message);
}

a(b);
*/




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

    let timeInMinutes = 1;
    let currentTime = Date.parse(new Date());
    //console.log(currentTime);
    //sessionStorage.setItem("currentT" , Date.parse(new Date()));
    //console.log(sessionStorage.getItem("currentT"));
    
    
    let deadline = new Date(currentTime + timeInMinutes * 60 * 1000);
    //console.log(deadline);
    
    //sessionStorage.setItem("deadline2", Date.parse(currentTime * 60 * 1000));
    //console.log(sessionsStorage.getItem("deadline2"));
    
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
        //let clock = document.getElementById(id); // Essayer en mettant du jQuery
        function updateClock() {
            let t = getTimeRemaining(endtime);
            console.log(t);
            //let wordMinutes = "minutes";
            //let wordSecondes = "secondes";
            let countdown = $("#countdown");

            let wordMinutes = ((t.minutes === 1) || (t.minutes === 0)) ? "minute" : "minutes";
            let wordSecondes = ((t.secondes === 1) || (t.secondes === 0)) ? "seconde" : "secondes";

            if(t.t === 0) {
                clearInterval(timeInterval);
                countdown.text("Votre réservation a éxpirée.");
            }
            
            /*if(t.minutes === 1) {
                wordMinutes = "minute";
            } else if(t.minutes === 0) {
                wordMinutes = "";
                minutes = "";
            }
            
            if(t.secondes <= 1) {
                wordSecondes = "seconde";
            }*/
            countdown.text(`Votre réservation expirera dans ${t.minutes} ${wordMinutes} et ${t.secondes} ${wordSecondes}.`);            
        }
        //sessionStorage.setItem('countdown', countdown);
        updateClock(); // run function once at first to avoid delay (éxécuter une fois pour éviter les retards).
        let timeInterval = setInterval(updateClock,1000);
    }

    initializeClock("reservation", deadline);
}



let form = document.getElementById("form");
nameUser.addEventListener("blur", checkSeizure);
firstNameUser.addEventListener("blur", checkSeizure);
form.addEventListener("submit", submitForm);
/*  display = getComputedStyle(canvas).display;
display.textContent = "block";      */
