class Reservation {
    constructor () {
        this.nameUser = $("#nameUser");
        this.firstNameUser = $("#firstName");
        this.message = $("#message");
        this.info = $("#info");
        this.reservation = $("#reservation");
        this.form = $("#form");
        this.stationReserved = $("#stationReserved");
        this.countdown = $("#countdown");
        this.cancel = $("#cancelReservation");
        this.buttonStation = $("#submitButton");
        this.nameStation = $("#nameStation");
        this.canvasDiv = $("#canvasDiv");
        this.messageCanvas = $("#messageCanvas");
        this.clearCanvas = $("#clearCanvas");
        this.timeInterval = null;
        this.self = this;
        this.allInputs = $("form#form:input");
    };


    init () {
        this.nameUser.blur(this.checkSeizure.bind(this));
        this.firstNameUser.blur(this.checkSeizure.bind(this));

        this.form.submit(this.store.bind(this));
        this.form.submit(this.checkSeizure.bind(this));
        this.form.submit(this.checkSeizure.bind(this));
        this.callCountdown();
        this.recoverStorage();
    }

    checkSeizure (e) {
        let regexSaisie = /\d/;
        let seizure = e.target;
        if ((regexSaisie.test(seizure.value)) || (seizure.value.length < 2)) {
            this.message.text(`Votre ${seizure.name} doit contenir au moins 3 lettres et ne peut pas contenir de chiffre.`);
            this.buttonStation.prop("disabled" , true);
            this.messageCanvas.text("");  
            this.canvasDiv.css("pointer-events", "not-allowed");
            this.clearCanvas.css("display", "none");
        } else {
            this.message.text("");
            this.canvasDiv.css("pointer-events", "auto");
            this.messageCanvas.text("Veuillez signer votre réservation.");
            this.clearCanvas.css("display", "block"); 
        }
console.log("OK");

        // if(this.allInputs.val() == "" || this.allInputs.val() == " ") {
        //     this.clearCanvas.css("display", "none");
        //     this.messageCanvas.text("");  
        //     this.canvasDiv.css("pointer-events", "not-allowed");
        //     this.buttonStation.prop("disabled" , true);
        //     this.message.text("Veuillez remplir correctement tous les champs.");
        // }
// console.log(this.allInputs);

//         this.allInputs.each(function() {
//             let input = $(this);
//     console.log(input);
//         })
    }

    store (e) {
        e.preventDefault();

        let timeInMinutes = 20;
        let currentTime = Date.parse(new Date());

        localStorage.setItem("nameUser", $("#nameUser").val());
        localStorage.setItem("firstNameUser", $("#firstName").val());
        sessionStorage.setItem("choiceStation", $("#nameStation").text());
        sessionStorage.setItem("deadline", new Date(currentTime + timeInMinutes * 60 * 1000));

        this.display();
    }

    display () {
        this.stationReserved.text(`${localStorage.getItem("nameUser")} ${localStorage.getItem("firstNameUser")} a réservé un vélo à la station ${sessionStorage.getItem("choiceStation")}.`);
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
            self.buttonStation.prop("disabled", true);
        })
    }

    callCountdown () {
        let deadlineStorage = sessionStorage.getItem("deadline");
        let time = Date.parse(deadlineStorage) - Date.parse(new Date());

        // Réservation en cours
            if (time > 0) {
                this.timeInterval = setInterval(() => {this.callCountdown();}, 1000);
                this.stationReserved.text(`${localStorage.getItem("nameUser")} ${localStorage.getItem("firstNameUser")} a réservé un vélo à la station ${sessionStorage.getItem("choiceStation")}.`);
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
            // Avant première réservation sinon le bouton ne sera pas disabled 
            if (deadlineStorage == undefined) {
                this.buttonStation.prop("disabled", true);
                this.stationReserved.text("Aucune réservation en cours.");
            }

            // if ((time <= 0) && (this.nameUser.val() === null) || (this.firstNameUser.val() === null)) {
            //     //this.buttonStation.prop("disabled", true);
            //     this.message.text("Veuillez remplir les champs requis.")
            // }
    }

    recoverStorage () {
        this.nameUser.val(localStorage.getItem("nameUser"));
        this.firstNameUser.val(localStorage.getItem("firstNameUser"));
    }
}