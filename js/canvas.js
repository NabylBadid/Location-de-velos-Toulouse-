class Canvas {
    constructor () {
        this.canvas = $("#canvas");
        this.context = this.canvas[0].getContext("2d");
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
        this.canvas.on("touchleave",this.mouseUpOrExit.bind(this)); // Toucheleave a été proposer mais ne fonctionne pas 

        this.calibrate();
        this.clearCanvas.click(this.clear.bind(this));
        this.window.resize(this.calibrate.bind(this));    
    }

    // au mousedown on enregistre la position du click (addClick) et on dessine (redraw)
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
        this.draw(e);          
    }

    // Top movement = si le marqueur est décliquer Exit = si le marquer sort du cadre
    mouseUpOrExit () {        
        this.paint = false;
        this.finger = false;
    }
    
    draw (e) {
        this.context.strokeStyle = "#d90075"; // fillStyle : Définit ou renvoie la couleur, le dégradé ou le modèle utilisé pour remplir le dessin
        this.context.lineCap = "round"; // lineCap : Définit la forme du dernier point de la ligne
        this.context.lineJoin = "round"; // lineJoin
        this.context.lineWidth = 8;
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
        this.context.beginPath();
        this.context.moveTo(this.startX, this.startY);
        this.context.lineTo(mouseX, mouseY);
        this.context.closePath();
        this.context.stroke();
        this.startX = mouseX;
        this.startY = mouseY;

        this.painted = true;
        }        
    }  

    // Ajuste la width du canvas par rapport au fieldset
    calibrate () {
        this.canvas[0].width = this.fieldset.width();
    }

    clear () {
        this.context.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);
        this.buttonStation.prop("disabled", true);
        this.messageCanvas.text("Veuillez signer votre réservation.");
        this.painted = false;
    }

    displaySubmit () {
console.log(this.painted);
        if(this.painted) {
            this.messageCanvas.text("");
            this.buttonStation.prop("disabled", false);
        } 
    }
}


        // Gestion des évènements de la souris
        // this.canvas.addEventListener('mousedown', (e) => {
        //     this.startX = e.clientX - this.canvas.getBoundingClientRect().left;
        //     this.startY = e.clientY - this.canvas.getBoundingClientRect().top;
        //     this.drawing = true;
        // }, false);
        // this.canvas.addEventListener('mouseup', () => {
        //     this.ctx.closePath();
        //     this.drawing = false;
        // }, false);
        // this.canvas.addEventListener('mousemove', (e) => {
        //     e.preventDefault();
        //     this.draw(e);
        // }, false);








// let canvas = $("#canvasDiv");
// let context = canvas.getContext("2d");

// $('#canvas').mousedown(function(e){
//     var mouseX = e.pageX - this.offsetLeft;
//     var mouseY = e.pageY - this.offsetTop;
          
//     paint = true;
//     addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
//     redraw();
//   });

// $('#canvas').mousemove(function(e){
//     if(paint){
//       addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
//       redraw();
//     }
//   });

//   $('#canvas').mousedown(function(e){
//     var mouseX = e.pageX - this.offsetLeft;
//     var mouseY = e.pageY - this.offsetTop;
          
//     paint = true;
//     addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
//     redraw();
//   });

// $('#canvas').mousemove(function(e){
//     if(paint){
//     addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
//     redraw();
//     }
// });

// $('#canvas').mouseup(function(e){
//     paint = false;
// });

// $('#canvas').mouseleave(function(e){
//     paint = false;
// });

// var clickX = new Array();
// var clickY = new Array();
// var clickDrag = new Array();
// var paint;

// function addClick(x, y, dragging)
// {
//     clickX.push(x);
//     clickY.push(y);
//     clickDrag.push(dragging);
// }

// function redraw(){
//     context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    
//     context.strokeStyle = "#df4b26";
//     context.lineJoin = "round";
//     context.lineWidth = 5;
            
//     for(var i=0; i < clickX.length; i++) {		
//     context.beginPath();
//     if(clickDrag[i] && i){
//         context.moveTo(clickX[i-1], clickY[i-1]);
//     }else{
//         context.moveTo(clickX[i]-1, clickY[i]);
//     }
//     context.lineTo(clickX[i], clickY[i]);
//     context.closePath();
//     context.stroke();
//     }
// }