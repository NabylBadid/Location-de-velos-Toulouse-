class Canvas {
    constructor () {
        this.canvas = $("#canvas"),
        this.context = $("canvas")[0].getContext("2d"),
        this.paint = null,
        this.clickX = new Array(),
        this.clickY = new Array(),
        this.clickDrag = new Array()        
    };

    init () {
        this.canvas.mousedown(this.mouseEvent.bind(this));
        this.canvas.mousemove(this.mouseMovement.bind(this));
        this.canvas.mouseup(this.mouseTopMovementOrExit.bind(this));
        this.canvas.mouseleave(this.mouseTopMovementOrExit.bind(this));
        // this.canvas.touchstart(this.mouseEvent.bind(this));
        // this.canvas.touchmove(this.mouseMovement.bind(this));
        // this.canvas.touchend(this.mouseTopMovementOrExit.bind(this));
        // this.canvas.touchcancel(this.mouseTopMovementOrExit.bind(this));
        // this.addClick();
        // this.redraw(); 
    }

    mouseEvent (e) {
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.page - this.offsetTop;

        this.paint = true;
        this.addClick(mouseX, mouseY);
        this.redraw();
    }

    mouseMovement (e) {
        if(this.paint) {
            this.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            this.redraw();
        } 
    }

    // Top movement = si le marqueur est décliquer Exit = si le marquer sort du cadre
    mouseTopMovementOrExit (e) {
        this.paint = false;
    }

    // Enregistre la position du clique
    addClick (x, y, dragging) { // Draggin = gliser
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);        
    }

    // Dessiner le trait fait par l'utilisateur et definir les caratéristiques du marqueuer (couleur, taille)
    redraw () {

console.log(this.canvas.width());
console.log(this.canvas.height());

        this.context.clearRect (0, 0, 298 , 198); //

        this.context.strokeStyle = "#df4b26";
        this.context.lineJoin = "round";
        this.context.lineWidth = 10;

        for (let i = 0; i < this.clickX.length; i++) {
            this.context.beginPath ();
            if (this.clickDrag[i] && i) {
                this.context.moveTo(this.clickX[i-1], this.clickY [i-1]);
            } else {
                this.context.moveTo(this.clickX[i] -1, this.clickY[i]);
            }
            
            this.context.lineTo(this.clickX[i], this.clickY[i]);
            this.context.closePath();
            this.context.stroke();
        }
    }
}


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