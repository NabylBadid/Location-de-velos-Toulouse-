class Slider {
	constructor () {
		this.i = 0,
		this.images = ["images/img12.jpg", "images/carte.jpg", "images/station.jpg", "images/locataire.jpg", "images/reservation.jpg"];
		this.temps = 5000;
		this.interval = null;
		this.bPause = $("#bPause");
		this.etatSlide = false;
		this.bGauche = $("#flecheG");
        this.bDroite = $("#flecheD");
        this.document = $(document);
        this.slide = document.getElementById("imgSlider");
        };
    
    init () {
        this.slide.src = this.images[this.i];
        window.onload = this.changeState.bind(this);
        this.bPause.click(this.changeState.bind(this));
        this.bGauche.click(this.back.bind(this));
        this.bDroite.click(this.advance.bind(this));
        this.document.keydown(this.press.bind(this));
    }

    // Change l'image
    changeImg () {
        if (this.i < this.images.length - 1) {
            this.i++;
        } else {
            this.i = 0;
        }
        this.changeImgSrc(this.i);
    }

    stop () {
        clearInterval(this.interval);
        this.bPause.text("Jouer");
    }

    play () {
        this.interval = setInterval(this.changeImg.bind(this), this.temps);
        this.bPause.text("Pause");
    }

    // Méthode qui met en pause ou active le diapo
    changeState () {
        if (this.etatSlide) {
            this.stop();
            this.etatSlide = false;
            
        } else {
            this.play();
            this.etatSlide = true;            
        }        
    }

    // Change la référence de l'image (src)
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