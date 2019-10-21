let i = 0;

let images = ["img1.jpg", "img2.jpg", "img3.jpg"];

let temps = 5000;

function changeImg() {

	document.slide.src = images[i];

	if (i < images.length - 1) {
		i++;
	} else {
		i = 0;
	}

	setTimeout("changeImg()", temps); 
}

window.onload = changeImg; 