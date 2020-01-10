class Reservation {
    constructor () {
        this.nameUser = $("#nameUser"),
        this.firstNameUser = $("#firstName"),
        this.message = $("#message"),
        this.info = $("#info"),
        this.reservation = $("#reservation"),
        this.form = $("#form"),
        this.stationReserved = $("#stationReserved"),
        this.countdown = $("#countdown"),
        this.cancel = $("#cancelReservation"),
        this.buttonStation = $("#submitButton"),
        this.nameStation = $("#nameStation"),
        this.timeInterval = null,
        this.self = this
    };


    init () {
        this.nameUser.blur(this.checkSeizure.bind(this));
        this.firstNameUser.blur(this.checkSeizure.bind(this));

        this.form.submit(this.store.bind(this));
        this.callCountdown();
        this.recoverStorage();
    }

    checkSeizure (e) {
        let regexSaisie = /\d/;
        let seizure = e.target;

        // filedValue = lastName
        // if fieldValue == firstname alors fieldValue == firstName

        if ((seizure.name === "nameUser") && (regexSaisie.test(seizure.value)) || (seizure.value.length < 2)) {
            this.message.text("Votre nom doit contenir au moins 3 lettres et ne peut pas contenir de chiffre.");
            this.nameUser.val("");
            this.buttonStation.prop("disabled" , true);
        } else if ((seizure.name === "firstName") && (regexSaisie.test(seizure.value)) || (seizure.value.length < 2)) {
            this.message.text("Votre prénom doit contenir au moins 3 lettres et ne peut pas contenir de chiffre.");
            this.firstNameUser.val("");
            this.buttonStation.prop("disabled" , true);
        } else {
            this.buttonStation.prop("disabled" , false);
            this.message.text("");
        }
    }

    store (e) {
        e.preventDefault();

        let timeInMinutes = 0.2;
        let currentTime = Date.parse(new Date());

        sessionStorage.setItem("nameUser", $("#nameUser").val());
        sessionStorage.setItem("firstNameUser", $("#firstName").val());
        sessionStorage.setItem("choiceStation", $("#nameStation").text());
        sessionStorage.setItem("deadline", new Date(currentTime + timeInMinutes * 60 * 1000));

        this.display();
    }

    display () {
        this.stationReserved.text(`${sessionStorage.getItem("nameUser")} ${sessionStorage.getItem("firstNameUser")} a réservé un vélo à la station ${sessionStorage.getItem("choiceStation")}.`);
        this.clockInitialize();
    }

    getTimeRemaining () {

        let remainingTime = Date.parse(sessionStorage.getItem("deadline")) - Date.parse(new Date());
        let secondes = Math.floor((remainingTime / 1000) % 60);
        let minutes = Math.floor((remainingTime / 1000 / 60) % 60);

        return {
            remainingTime,
            minutes,
            secondes
        };
    }

    clockInitialize () {
        this.updateClock(); // exécuter une fois pour éviter le retard
        this.timeInterval = setInterval(() => {this.updateClock();}, 1000);
        this.cancel.css("display", "block");
        this.buttonStation.prop("disabled", true);
        this.self.callCancel(this.timeInterval);
    }

    updateClock () {
        let remainingTimeObject = this.getTimeRemaining();

        let wordMinutes = ((remainingTimeObject.minutes === 1) || (remainingTimeObject.minutes === 0)) ? "minute" : "minutes";
        let wordSecondes = ((remainingTimeObject.secondes === 1) || (remainingTimeObject.secondes === 0)) ? "seconde" : "secondes";
        
        sessionStorage.setItem("wordMinutes", wordMinutes);
        sessionStorage.setItem("wordSecondes", wordSecondes);

console.log(remainingTimeObject.remainingTime);
        
        // Reservation expirée 
        if (remainingTimeObject.remainingTime <= 0) {
            clearInterval(this.timeInterval);
            this.stationReserved.text("Votre réservation a expiré.");
            this.countdown.hide();
            sessionStorage.removeItem("deadline");
            this.cancel.css("display", "none");
            this.buttonStation.prop("disabled", false);
        // Réservation en cours
        } else {
            this.buttonStation.prop("disabled", true);
            this.countdown.show();
            this.countdown.text(`Votre réservation expirera dans ${remainingTimeObject.minutes} ${wordMinutes} et ${remainingTimeObject.secondes} ${wordSecondes}.`);
        }
    }

    callCancel (interval) {
         let self = this;
            this.cancel.click(function () {
            clearInterval(interval);
            sessionStorage.clear();
            self.stationReserved.text("Vous avez annuler votre réservation.");
            self.countdown.hide();
            self.cancel.css("display", "none");
        })
    }

    callCountdown () {
    let time = Date.parse(sessionStorage.getItem("deadline")) - Date.parse(new Date());
console.log(time);


        // Réservation en cours
        if (time > 0) {
            this.timeInterval = setInterval(() => {this.callCountdown();}, 1000);
            this.stationReserved.text(`${sessionStorage.getItem("nameUser")} ${sessionStorage.getItem("firstNameUser")} a réservé un vélo à la station ${sessionStorage.getItem("choiceStation")}.`);
            this.countdown.text(`Votre réservation expirera dans ${Math.floor((time / 1000 / 60) % 60)} ${sessionStorage.getItem("wordMinutes")} et ${Math.floor((time / 1000) % 60)} ${sessionStorage.getItem("wordSecondes")}.`);
            this.cancel.css("display", "block");
            this.buttonStation.prop("disabled", true);
            this.self.callCancel(this.timeInterval);
        // Réservation expiré
        }else {
            clearInterval(this.timeInterval);
            this.timeInterval = null;
            this.stationReserved.text("Votre réservation a expiré.");
            this.countdown.hide();
            sessionStorage.removeItem("deadline");
            this.cancel.css("display", "none");
            this.buttonStation.prop("disabled", false);
        }

        if ((time <= 0) && (this.nameUser.val() === null) || (this.firstNameUser.val() === null)) {
            this.buttonStation.prop("disabled", true);
            this.message.text("Veuillez remplir les champs requis.")
console.log("ok");
        }
    }

    recoverStorage () {
        this.nameUser.val(sessionStorage.getItem("nameUser"));
        this.firstNameUser.val(sessionStorage.getItem("firstNameUser"));
        $("#nameStation").text(sessionStorage.getItem("choiceStation"));        
    }
}


//     callCountdown () {

//         let reservationText = $("#stationReserved");
//         let countdown = $("#countdown");
//         let cancel = $("#cancelReservation");
//         let buttonStation = $("#submitButton");
        
//         let time = sessionStorage.getItem("t");
// console.log(time);

//         if (time > 0) {
 
//             let interval = setInterval(this.callCountdown, 1000);
//             cancel.css("display", "block");
//             $("#submitButton").prop("disabled", true);
//             reservation.callCancel(interval);
//             reservationText.text(`${sessionStorage.getItem("nameUser")} ${sessionStorage.getItem("firstNameUser")} a réservé un vélo à la station ${sessionStorage.getItem("choiceStation")}.`);
//             countdown.text(`Votre réservation expirera dans ${Math.floor((time / 1000 / 60) % 60)} ${sessionStorage.getItem("wordMinutes")} et ${Math.floor((time / 1000) % 60)} ${sessionStorage.getItem("wordSecondes")}.`);
// console.log("jjjj");


//         }else if ( time < 0 ) {
// console.log("ok");

//             clearInterval(this.callCountdown)
//             reservationText.text("Votre réservation a éxpirée.");
//             countdown.hide();
//             sessionStorage.clear();
//             cancel.css("display", "none");
//             buttonStation.prop("disabled", true);
//         }




















//     callCountdown () {
//         let reservationText = $("#stationReserved");
//         let countdown = $("#countdown");
//         let cancel = $("#cancelReservation");
//         let buttonStation = $("#submitButton");
//         let time = sessionStorage.getItem("t");
// console.log(time);


//         if (time > 0) {
//             let ti = setInterval(this.callCountdown, 1000);
//     console.log(ti);
//             reservationText.text(`${sessionStorage.getItem("nameUser")} ${sessionStorage.getItem("firstNameUser")} a réservé un vélo à la station ${sessionStorage.getItem("choiceStation")}.`);
//             countdown.text(`Votre réservation expirera dans ${Math.floor((time / 1000 / 60) % 60)} ${sessionStorage.getItem("wordMinutes")} et ${Math.floor((time / 1000) % 60)} ${sessionStorage.getItem("wordSecondes")}.`);
//             cancel.css("display", "block");
//             buttonStation.prop("disabled", true);
//             reservation.callCancel(ti);
//         }else if ((time < 0) || (time === "NaN")) {
//             clearInterval(this.callCountdown);
//             reservationText.text("Votre réservation a éxpirée.");
//             countdown.hide();
//             sessionStorage.clear();
//             cancel.css("display", "none");
//             buttonStation.prop("disabled", false);
//         }

//         if (time === "NaN") {
//             countdown.hide();
//         }
//     }


// let form = $("#form");

// function submitForm () {

// }

// form.submit(submitForm);




// class Reservation {
//     constructor () {
//         this.nameUser = $("#nameUser"),
//         this.firstNameUser = $("#firstName"),
//         this.message = $("#message"),
//         this.info = $("#info"),
//         this.canvas = $("#canvas"),
//         this.stationReserved = $("#stationReserved"),
//         this.countdown = $("#countdown"),
//         this.cancel = $("#cancelReservation"),
//         this.reservation = $("#reservation"),
//         this.buttonStation = $("#reserve"),
//         this.form = $("#form"),
//         this.regexSaisie = /\d/
//     }

//     init () {
//         this.nameUser.blur(this.checkSeizure.bind(this));
//         this.firstNameUser.blur(this.checkSeizure.bind(this));
//         this.form.submit(this.submitForm);
//     }

//     checkSeizure (e) {
//         //let seizure = e.target.value;
//         if ((this.regexSaisie.test(e.target.value)) || (e.target.value.length < 2)) {
//             this.message.text( "Votre nom et votre prénom doivent contenir au moins une lettre et ne peuvent pas contenir de chiffre.");
//             this.nameUser.val("");
//             this.firstNameUser.val("");
//         } else {
//             this.buttonStation.prop("disabled", false);
//         }
//     }

//     getTimeRemaining(endtime) {
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


//     updateClock() {
//         let t = getTimeRemaining(endtime);

//         let wordMinutes = ((t.minutes === 1) || (t.minutes === 0)) ? "minute" : "minutes";
//         let wordSecondes = ((t.secondes === 1) || (t.secondes === 0)) ? "seconde" : "secondes";
//         sessionStorage.setItem("wordMinutes", ((sessionStorage.getItem("minutes") === 1) || (sessionStorage.getItem("minutes") === 0)) ? "minute" : "minutes");
//         sessionStorage.setItem("wordSecondes", ((sessionStorage.getItem("secondes") === 1) || (sessionStorage.getItem("secondes") === 0)) ? "seconde" : "secondes");
//         sessionStorage.setItem("t", t.t);


//         if(t.t === 0) {
//             clearInterval(timeInterval);
//             stationReserved.text("Votre réservation a éxpirée.");
//             countdown.hide();
//             sessionStorage.removeItem("choiceStation");
//             cancelReservation.css("display", "none");
//             buttonStation.disabled = false;
//             } else {
//                 countdown.show();
//                 let secStorage = sessionStorage.getItem("secondes");
//                 let minStorage = sessionStorage.getItem("minutes");
//                 countdown.text(`Votre réservation expirera dans ${minStorage} ${wordMinutes} et ${secStorage} ${wordSecondes}.`);
//             }


//         countdown.text(`Votre réservation expirera dans ${t.minutes} ${wordMinutes} et ${t.secondes} ${wordSecondes}.`);
//     }

//     clockInitialize(id, endtime) {
//         // let clock = document.getElementById(id); // Essayer en mettant du jQuery
//         // let endtime = sessionStorage.getItem("deadline");
//         this.updateClock(); // run function once at first to avoid delay (éxécuter une fois pour éviter les retards).
//         let timeInterval = setInterval(updateClock,1000);
//         cancelReservation.css("display", "block");
//         buttonStation.prop("disabled", true);
//         this.callCancel(timeInterval);
//     }

//     submitForm(e) {
//         e.preventDefault();
//         let seizureNameUser = $("#nameUser").val();
//         let seizureFirstNameUser =  $("#firstName").val();
//         let choiceStation = $("#nameStation").text();
//         let stationReserved = $("#stationReserved");
//         let currentTime = Date.parse(new Date());
//         let timeInMinutes = 1;
//         let deadline = new Date(currentTime + timeInMinutes * 60 * 1000);
//         sessionStorage.setItem("nameUser", seizureNameUser);
//         sessionStorage.setItem("firstNameUser", seizureFirstNameUser);
//         sessionStorage.setItem("choiceStation", choiceStation);
//         sessionStorage.setItem("deadline", new Date(currentTime + timeInMinutes * 60 * 1000));
//         let nameStocked = sessionStorage.getItem("nameUser");
//         let firstNameStocked = sessionStorage.getItem("firstNameUser");
//         let stationStocked = sessionStorage.getItem("choiceStation");
//         let deadlineStorage = sessionStorage.getItem("deadline");
//         console.log(deadlineStorage);

//         stationReserved.text(`${nameStocked} ${firstNameStocked} a réservé un vélo à la station ${stationStocked}.`);
//         this.clockInitialize(this.reservation, deadline).bind(this);
//     }

//     callCancel (interval) {
//         this.cancelReservation.click(function () {
//         clearInterval(interval);
//         sessionStorage.clear();
//         this.stationReserved.text("Vous avez annuler votre réservation.");
//         this.countdown.hide();
//         this.cancelReservation.css("display", "none");
//         })
//     }

//     callCountdown () {
//         if (this.time > 0) {
//             this.stationReserved.text(`${this.nameStorage} ${this.firstNameStorage} a réservé un vélo à la station ${this.stationStorage}.`);
//             this.countdown.text(`Votre réservation expirera dans ${this.minutesTime} ${this.wordMinutesStorage} et ${this.secondesTime} ${this.wordSecondesStorage}.`);
//             let ti = setInterval(this.callCountdown, 1000);
//             this.cancelReservation.css("display", "block");
//             this.buttonStation.disabled =  true;
//             callCancel(ti);

//         }else if (this.time < 0) {
//             clearInterval(this.callCountdown);
//             this.stationReserved.text("Votre réservation a éxpirée.");
//             this.countdown.hide();
//             this.sessionStorage.clear();
//             this.cancelReservation.css("display", "none");
//             this.buttonStation.disabled = false;
//         }

//     }


// }

