class Slider {
	constructor () {
		this.i = 0,
		this.images = ["images/img1.jpg", "images/img2.jpg", "images/img3.jpg"],
		this.temps = 5000,
		this.interval = null,
		this.bPause = $("#bPause"),
		this.etatSlide = false,
		this.bGauche = $("#flecheG"),
        this.bDroite = $("#flecheD"),
        this.document = $(document),
        this.slide = document.slide
        };
    
    init () {
        this.slide.src = this.images[this.i];
        window.onload = this.changeState.bind(this);
        this.bPause.click(this.changeState.bind(this));
        this.bGauche.click(this.back.bind(this));
        this.bDroite.click(this.advance.bind(this));
        this.document.keydown(this.press.bind(this));
    }

    changeImg () {
        if (this.i < this.images.length - 1) {
            this.i++;
        } else {
            this.i = 0;
        }
        this.changeImgSrc(this.i);
    }

    // Bouton Pause
    stop () {
        clearInterval(this.interval);
        this.bPause.text("Jouer");
    }

    play () {
        this.interval = setInterval(this.changeImg.bind(this), this.temps);
        this.bPause.text("Pause");
    }

    changeState () {
        if (this.etatSlide) {
            this.stop();
            this.etatSlide = false;
            
        } else {
            this.play();
            this.etatSlide = true;            
        }        
    }

    changeImgSrc(number) {
        this.slide.src = this.images[number];
    }

    // Clique gauche et droit 
    back () {
        this.changeImgSrc(this.i);

        if ((this.i <= this.images.length - 1) && (this.i !== 0)) {
            this.i--;
        } else {
            this.i = this.images.length - 1;
        }
    }
    
    // Avancer dans le diapo
    advance () {
        this.changeImgSrc(this.i);

        if ((this.i === 0) || (this.i < this.images.length - 1)) {
            this.i++;
        } else {
            this.i = 0
        }
    }

    // Appui sur les flèches de gauche et de droite
    press (e) {
        if (e.keyCode === 37) {
            this.back();
        } else if (e.keyCode === 39)
            this.advance();
    }

};






// ORIENTE OBJET 
/*
let Diapo = {

    i: 0,
    images: ["img1.jpg", "img2.jpg", "img3.jpg"],
    temps: 5000,
    interval: null,
    bPause: document.getElementById("bPause"),
    etatSlide: false,
    bGauche: document.getElementById("flecheG"),
    bDroite: document.getElementById("flecheD"),
    slide: document.slide,

    init () {
        this.slide.src = this.images[this.i];
        window.onload = this.changeState.bind(this);
        this.bPause.addEventListener("click", this.changeState.bind(this));
        this.bGauche.addEventListener("click", this.back.bind(this));
        this.bDroite.addEventListener("click", this.advance.bind(this));
        document.addEventListener("keydown", this.press.bind(this));
    },

    changeImg () {
        if (this.i < this.images.length - 1) {
            this.i++;
        } else {
            this.i = 0;
        }
        this.slide.src = this.images[this.i];
    },

    // Bouton Pause
    stop () {
        clearInterval(this.interval);
        this.bPause.innerHTML = "";
        this.bPause.textContent = "Jouer";
    },

    play () {
        this.interval = setInterval(this.changeImg.bind(this), this.temps);
        this.bPause.innerHTML = "";
        this.bPause.textContent = "Pause";
    },

    changeState () {
        if (this.etatSlide) {
            this.stop();
            this.etatSlide = false;
        } else {
            this.play();
            this.etatSlide = true;
        }
    },

    // Clique gauche et droit 
    back () {

        this.slide.src = this.images[this.i];

        if ((this.i <= this.images.length - 1) && (this.i !== 0)) {
            this.i--;
        } else {
            this.i = this.images.length - 1;
        }
    },

    advance () {

        this.slide.src = this.images[this.i];

        if ((this.i === 0) || (this.i < this.images.length - 1)) {
            this.i++;
        } else {
            this.i = 0
        }
    },

    // Appui sur les flèches de gauche et de droite
    press (e) {
        if (e.keyCode === 37) {
            this.back();
        } else if (e.keyCode === 39)
            this.advance();
    },

};

Diapo.init();
*/


// Fonction Diapo
/*
let i = 0;

let images = ["img1.jpg", "img2.jpg", "img3.jpg"];

let temps = 5000;

document.slide.src = images[i];

function changeImg() {

	if (i < images.length - 1) {
		i++;
	} else {
		i = 0;
	}

	document.slide.src = images[i];

}

	let interval = null; 

window.onload = changerEtat; 


// Bouton Pause

let bPause = document.getElementById("bDiapo");

function arreter() {
	console.log(interval);
	clearInterval(interval);
	bPause.innerHTML = "";
	bPause.textContent = "Jouer";
};

function jouer() {
		interval = setInterval("changeImg()", temps);
		console.log(interval);
		bPause.innerHTML = "";
		bPause.textContent = "Pause";
};

let etatSlide = false;

function changerEtat () {
	if (etatSlide) {
		arreter();
		etatSlide = false;
	} else {
		jouer();
		etatSlide = true;
	}
}

bPause.addEventListener("click" , changerEtat);

// Clique gauche et droit 

let bGauche = document.getElementById("flecheG");
let bDroite = document.getElementById("flecheD");

function reculer() {

	document.slide.src = images[i];

	if ((i <= images.length - 1) && (i !== 0)) {
		i--;
	} else {
		i = images.length - 1;
	}
}

function avancer() {

	document.slide.src = images[i];

	if ( (i === 0) || (i < images.length - 1) ) {
		i++;
	} else {
		i = 0
	}
}


bGauche.addEventListener("click", reculer);
bDroite.addEventListener("click", avancer);

// Appui sur les flèches de gauche et de droite

function appuyer(e) {
	if (e.keyCode === 37) {
		reculer();
	} else if (e.keyCode === 39) 
		avancer();
 }

document.addEventListener("keydown", appuyer);

*/