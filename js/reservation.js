// class Reservation {
//     constructor () {
//         this.nameUser = $("#nameUser")/*document.getElementById("nameUser")*/,
//         this.firstNameUser = $("#firstName")/*document.getElementById("firstName")*/,
//         this.message = $("#message"),
//         this.info = $("#info"),
//         this.reservation = $("#reservation"),
//         // this.buttonStation = $("#reserve"),
//         this.form = $("#form"),
//         this.stationReserved = $("#stationReserved"),
//         this.countdown = $("#countdown"),
//         this.cancelReservation = $("#cancelReservation"),
//         this.buttonStation = document.getElementById("reserve"),
//         this.nameStation = $("#nameStation"),
//         this.timeInMinutes = 1,
//         this.currentTime = Date.parse(new Date()),
//         this.regexSaisie = /\d/,
//         this.deadlineStorage = sessionStorage.getItem("deadline")
//         // this.tStorage = sessionStorage.getItem("t"),
//         // this.minutesStorage = sessionStorage.getItem("minutes"),
//         // this.secondesStorage = sessionStorage.getItem("secondes"),
//         // this.wordMinutesStorage = sessionStorage.getItem("wordMinutes"),
//         // this.wordSecondesStorage = sessionStorage.getItem("wordSecondes"),
//         // this.nameStorage = sessionStorage.getItem("nameUser"),
//         // this.firstNameStorage = sessionStorage.getItem("firstNameUser"),
//         // this.stationStorage = sessionStorage.getItem("choiceStation"),
//         // this.deadlineStorage = sessionStorage.getItem("deadline"),

//     };
    

//     init () {
//         this.nameUser.blur(this.checkSeizure.bind(this));
//         this.firstNameUser.blur(this.checkSeizure.bind(this));
//         this.form.submit(this.submitForm.bind(this));
//         //this.callCountdown();
//     }

//     checkSeizure (e) {
//         let buttonStation = $("#reserve");
//         //let seizure = e.target.value;
//         if ((this.regexSaisie.test(e.target.value)) || (e.target.value.length < 2)) {
//             this.message.text( "Votre nom et votre prénom doivent contenir au moins une lettre et ne peuvent pas contenir de chiffre.");
//             this.nameUser.val("");
//             this.firstNameUser.val("");            
//         } else {
//             buttonStation.prop("disabled", false);
//         }
//     }

//     submitForm (e) {
//         e.preventDefault();
//         let seizureNameUser = $("#nameUser").val();
//         let seizureFirstNameUser =  $("#firstName").val();
//         let choiceStation = $("#nameStation").text();
//         let deadline = new Date(this.currentTime + this.timeInMinutes * 60 * 1000);
//         sessionStorage.setItem("nameUser", seizureNameUser);
//         sessionStorage.setItem("firstNameUser", seizureFirstNameUser);
//         sessionStorage.setItem("choiceStation", choiceStation);
//         sessionStorage.setItem("deadline", new Date(this.currentTime + this.timeInMinutes * 60 * 1000));
//         let nameStocked = sessionStorage.getItem("nameUser");
//         let firstNameStocked = sessionStorage.getItem("firstNameUser");
//         let stationStocked = sessionStorage.getItem("choiceStation");
//         let deadlineStorage = sessionStorage.getItem("deadline");
//         $("#stationReserved").text(`${nameStocked} ${firstNameStocked} a réservé un vélo à la station ${stationStocked}.`); 
//         console.log($("#stationReserved").text());
//         console.log(deadlineStorage);
//         this.initializeClock(this.reservation, deadlineStorage);
//     }

//     getTimeRemaining (deadlineStorage) {
//         let t = Date.parse(deadlineStorage) - Date.parse(new Date());
        
//         let secondes = Math.floor((t / 1000) % 60);
//         let minutes = Math.floor((t / 1000 / 60) % 60);
//         sessionStorage.setItem("t" , Date.parse(deadlineStorage) - Date.parse(new Date()));
//         sessionStorage.setItem("secondes", Math.floor((t / 1000) % 60));
//         sessionStorage.setItem("minutes",  Math.floor((t / 1000 / 60) % 60));

//         return {
//             t,
//             minutes,
//             secondes
//         };
//     }

//     initializeClock () {
//         this.updateClock();
//         let timeInterval = setInterval(this.updateClock,1000);
//         this.cancelReservation.css("display", "block");
//         this.buttonStation.disabled =  true;
//         this.callCancel(timeInterval);
//     }

//     updateClock () {
//         let t = this.getTimeRemaining(this.deadlineStorage);

//         let wordMinutes = ((t.minutes === 1) || (t.minutes === 0)) ? "minute" : "minutes";
//         let wordSecondes = ((t.secondes === 1) || (t.secondes === 0)) ? "seconde" : "secondes";
//         sessionStorage.setItem("wordMinutes", ((sessionStorage.getItem("minutes") === 1) || (sessionStorage.getItem("minutes") === 0)) ? "minute" : "minutes");
//         sessionStorage.setItem("wordSecondes", ((sessionStorage.getItem("secondes") === 1) || (sessionStorage.getItem("secondes") === 0)) ? "seconde" : "secondes");
//         sessionStorage.setItem("t", t.t);
        

//         if(t.t === 0) {
//             clearInterval(timeInterval);
//             this.stationReserved.text("Votre réservation a éxpirée.");
//             this.countdown.hide();
//             sessionStorage.removeItem("choiceStation");
//             this.cancelReservation.css("display", "none");
//             this.buttonStation.disabled = false;
//             } else {
//                 this.countdown.show();
//                 let secStorage = sessionStorage.getItem("secondes");
//                 let minStorage = sessionStorage.getItem("minutes");
//                 this.countdown.text(`Votre réservation expirera dans ${minStorage} ${wordMinutes} et ${secStorage} ${wordSecondes}.`);
//             }


//         this.countdown.text(`Votre réservation expirera dans ${t.minutes} ${wordMinutes} et ${t.secondes} ${wordSecondes}.`);  
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

//     // callCountdown () {
//     //     if (this.time > 0) {
//     //         this.stationReserved.text(`${this.nameStorage} ${this.firstNameStorage} a réservé un vélo à la station ${this.stationStorage}.`);
//     //         this.countdown.text(`Votre réservation expirera dans ${this.minutesTime} ${this.wordMinutesStorage} et ${this.secondesTime} ${this.wordSecondesStorage}.`);
//     //         let ti = setInterval(this.callCountdown, 1000);
//     //         this.cancelReservation.css("display", "block");
//     //         this.buttonStation.disabled =  true;
//     //         callCancel(ti);
    
//     //     }else if (this.time < 0) {
//     //         clearInterval(this.callCountdown);
//     //         this.stationReserved.text("Votre réservation a éxpirée.");
//     //         this.countdown.hide();
//     //         this.sessionStorage.clear();
//     //         this.cancelReservation.css("display", "none");
//     //         this.buttonStation.disabled = false;
//     //     }
    
//     // }

// }

// let form = $("#form"); 

// function submitForm () {
    
// }

// form.submit(submitForm);




class Reservation {
    constructor () {
        this.nameUser = $("#nameUser"),
        this.firstNameUser = $("#firstName"),
        this.message = $("#message"),
        this.info = $("#info"),
        this.canvas = $("#canvas"),
        this.stationReserved = $("#stationReserved"),
        this.countdown = $("#countdown"),
        this.cancelReservation = $("#cancelReservation"),
        this.reservation = $("#reservation"),
        this.buttonStation = $("#reserve"),
        this.form = $("#form"),
        this.regexSaisie = /\d/
    }

    init () {
        this.nameUser.blur(this.checkSeizure.bind(this));
        this.firstNameUser.blur(this.checkSeizure.bind(this));
        this.form.submit(this.submitForm);
    }

    checkSeizure (e) {
        //let seizure = e.target.value;
        if ((this.regexSaisie.test(e.target.value)) || (e.target.value.length < 2)) {
            this.message.text( "Votre nom et votre prénom doivent contenir au moins une lettre et ne peuvent pas contenir de chiffre.");
            this.nameUser.val("");
            this.firstNameUser.val("");            
        } else {
            this.buttonStation.prop("disabled", false);
        }
    }

    initializeClock(id, endtime) {
        // let clock = document.getElementById(id); // Essayer en mettant du jQuery
        // let endtime = sessionStorage.getItem("deadline");
        this.updateClock(); // run function once at first to avoid delay (éxécuter une fois pour éviter les retards).
        let timeInterval = setInterval(updateClock,1000);
        cancelReservation.css("display", "block");
        buttonStation.prop("disabled", true);
        this.callCancel(timeInterval);
    }
    
    submitForm(e) {
        e.preventDefault();
        let self = this;
        let seizureNameUser = $("#nameUser").val();
        let seizureFirstNameUser =  $("#firstName").val();
        let choiceStation = $("#nameStation").text();
        let stationReserved = $("#stationReserved");
        let deadline = new Date(this.currentTime + this.timeInMinutes * 60 * 1000);
        sessionStorage.setItem("nameUser", seizureNameUser);
        sessionStorage.setItem("firstNameUser", seizureFirstNameUser);
        sessionStorage.setItem("choiceStation", choiceStation);
        sessionStorage.setItem("deadline", new Date(this.currentTime + this.timeInMinutes * 60 * 1000));
        let nameStocked = sessionStorage.getItem("nameUser");
        let firstNameStocked = sessionStorage.getItem("firstNameUser");
        let stationStocked = sessionStorage.getItem("choiceStation");
        let deadlineStorage = sessionStorage.getItem("deadline");
        stationReserved.text(`${nameStocked} ${firstNameStocked} a réservé un vélo à la station ${stationStocked}.`);
        // let timeInMinutes = 1;
        // let currentTime = Date.parse(new Date());        
        self.initializeClock(self.reservation, deadline);
        
    }

    getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        
        let secondes = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        sessionStorage.setItem("t" , Date.parse(endtime) - Date.parse(new Date()));
        sessionStorage.setItem("secondes", Math.floor((t / 1000) % 60));
        sessionStorage.setItem("minutes",  Math.floor((t / 1000 / 60) % 60));

        return {
            t,
            minutes,
            secondes
        };
    }



    updateClock() {
        let t = getTimeRemaining(endtime);

        let wordMinutes = ((t.minutes === 1) || (t.minutes === 0)) ? "minute" : "minutes";
        let wordSecondes = ((t.secondes === 1) || (t.secondes === 0)) ? "seconde" : "secondes";
        sessionStorage.setItem("wordMinutes", ((sessionStorage.getItem("minutes") === 1) || (sessionStorage.getItem("minutes") === 0)) ? "minute" : "minutes");
        sessionStorage.setItem("wordSecondes", ((sessionStorage.getItem("secondes") === 1) || (sessionStorage.getItem("secondes") === 0)) ? "seconde" : "secondes");
        sessionStorage.setItem("t", t.t);
        

        if(t.t === 0) {
            clearInterval(timeInterval);
            stationReserved.text("Votre réservation a éxpirée.");
            countdown.hide();
            sessionStorage.removeItem("choiceStation");
            cancelReservation.css("display", "none");
            buttonStation.disabled = false;
            } else {
                countdown.show();
                let secStorage = sessionStorage.getItem("secondes");
                let minStorage = sessionStorage.getItem("minutes");
                countdown.text(`Votre réservation expirera dans ${minStorage} ${wordMinutes} et ${secStorage} ${wordSecondes}.`);
            }


        countdown.text(`Votre réservation expirera dans ${t.minutes} ${wordMinutes} et ${t.secondes} ${wordSecondes}.`);            
    }

    callCancel (interval) {
        this.cancelReservation.click(function () {
        clearInterval(interval);
        sessionStorage.clear();
        this.stationReserved.text("Vous avez annuler votre réservation.");
        this.countdown.hide();
        this.cancelReservation.css("display", "none");
        })
    }

    callCountdown () {
        if (this.time > 0) {
            this.stationReserved.text(`${this.nameStorage} ${this.firstNameStorage} a réservé un vélo à la station ${this.stationStorage}.`);
            this.countdown.text(`Votre réservation expirera dans ${this.minutesTime} ${this.wordMinutesStorage} et ${this.secondesTime} ${this.wordSecondesStorage}.`);
            let ti = setInterval(this.callCountdown, 1000);
            this.cancelReservation.css("display", "block");
            this.buttonStation.disabled =  true;
            callCancel(ti);
    
        }else if (this.time < 0) {
            clearInterval(this.callCountdown);
            this.stationReserved.text("Votre réservation a éxpirée.");
            this.countdown.hide();
            this.sessionStorage.clear();
            this.cancelReservation.css("display", "none");
            this.buttonStation.disabled = false;
        }
    
    }


}