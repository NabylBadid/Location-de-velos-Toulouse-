class Canvas {
    constructor () {
        this.canvas = $("#canvas");
        this.context = this.canvas[0].getContext("2d"); // récupère le contexte de l'objet 
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.window = $(window);
        this.fieldset = $("#info");
        this.clearCanvas = $("#clearCanvas");
        this.buttonStation = $("#submitButton");
        this.messageCanvas = $("#messageCanvas");
        this.paint = false;
        this.painted = false;
        this.finger = false;
        this.startX = 0;
        this.startY = 0;  
        this.color = "#d90075";
    };

    init () {
        this.canvas.mousedown(this.mouseDown.bind(this));
        this.canvas.mousemove(this.draw.bind(this));
        this.canvas.mouseup(this.mouseUpOrExit.bind(this));
        this.canvas.mouseleave(this.mouseUpOrExit.bind(this));
        this.canvas.click(this.displaySubmit.bind(this));

        this.canvas.on("touchstart", this.mouseDown.bind(this));
        this.canvas.on("touchmove", this.draw.bind(this));
        this.canvas.on("touchend", this.mouseUpOrExit.bind(this));
        this.canvas.on("touchend", this.displaySubmit.bind(this));
        // this.canvas.on("touchleave",this.mouseUpOrExit.bind(this)); // Toucheleave a été proposer mais ne fonctionne pas 

        this.calibrate();
        this.clearCanvas.click(this.clear.bind(this));
        this.window.resize(this.calibrate.bind(this));    
    }

    // click ou touché initialement : on récupère la position et on appele la méthode draw() 
    mouseDown (e) {
        if (e.clientX ==  undefined) {
            this.startX = e.touches[0].pageX - this.canvas[0].getBoundingClientRect().left;
            this.startY = e.touches[0].pageY - this.canvas[0].getBoundingClientRect().top - (e.touches[0].pageY - e.touches[0].clientY);
                
            this.finger = true;
        } else {
            this.startX = e.offsetX; // On peut utiliser e.clientX - this.canvas[0].getBoundingClientRect().left
            this.startY = e.offsetY; // On peut utiliser e.clientY - this.canvas[0].getBoundingClientRect().top  
        }

        this.paint = true;
        // this.draw(e);          
    }

    // click ou touché relaché ou qui sort du canvas 
    mouseUpOrExit () {        
        this.paint = false;
        this.finger = false;
    }
    
    // dessine
    draw (e) {
        this.context.strokeStyle = "#d90075"; // strokeStyle : spécifie la couleur à utliser pour dessiner
        this.context.lineCap = "round"; // lineCap : Définit la forme du dernier point de la ligne
        this.context.lineJoin = "round"; // lineJoin : détermine la forme à utiliser pour joindre deux ségments de ligne à leur intersection
        this.context.lineWidth = 8; // lineWidth : définit la largeur du trait 
        // if (!this.paint) return, else {le code ci-dessous} equivaut à ce qu'il y a en dessous mais avce une manière de pensée inversée.
        if (this.paint) {
            let mouseX;
            let mouseY;
            if(e.clientX == undefined) {    
                e.preventDefault();
                mouseX = e.touches[0].pageX - this.canvas[0].getBoundingClientRect().left;
                mouseY = e.touches[0].pageY - this.canvas[0].getBoundingClientRect().top - (e.touches[0].pageY - e.touches[0].clientY);

                this.finger = true;
            } else {
                mouseX = e.offsetX;
                mouseY = e.offsetY; 
            }
        this.context.beginPath(); // crée un trajet 
        this.context.moveTo(this.startX, this.startY); // point de départ
        this.context.lineTo(mouseX, mouseY); // point d'arrivé
        this.context.stroke(); // dessine le trait
        this.startX = mouseX;
        this.startY = mouseY;

        this.painted = true;
        }        
    }  

    // Ajuste la width du canvas par rapport au fieldset
    calibrate () {
        this.canvas[0].width = this.fieldset.width();
    }

    // efface le canvas 
    clear () {
        this.context.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);
        this.buttonStation.prop("disabled", true);
        this.messageCanvas.text("Veuillez signer votre réservation.");
        this.painted = false;
    }

    // rends cliquable le bouton de soumission si il y a eu une signature 
    displaySubmit () {
        if(this.painted) {
            this.messageCanvas.text("");
            this.buttonStation.prop("disabled", false);
        } 
    }
}
