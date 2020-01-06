// //OBJECT RESERVATION; 


// let nameUser = $("#nameUser");
// let firstNameUser = $("#firstName");
// let message = document.getElementById("message");
// let info = $("#info");
// let canvas = $("#canvas");
// let stationReserved = $("#stationReserved");
// let countdown = $("#countdown");
// let cancelReservation = $("#cancelReservation");
// let reservation = $("#reservation");
// let buttonStation = document.getElementById("reserve");


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
//     let seizureNameUser = nameUser.val();
//     let seizureFirstNameUser = firstNameUser.val();
//     let choiceStation = nameStation.textContent;
//     sessionStorage.setItem("nameUser", seizureNameUser);
//     sessionStorage.setItem("firstNameUser", seizureFirstNameUser);
//     sessionStorage.setItem("choiceStation", choiceStation);
//     let nameStocked = sessionStorage.getItem("nameUser");
//     let firstNameStocked = sessionStorage.getItem("firstNameUser");
//     let stationStocked = sessionStorage.getItem("choiceStation");
//     e.preventDefault();
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
