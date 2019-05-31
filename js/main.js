/////////////////////////////////////////////////////////////////////////
// Nav Bar
$(document).ready(function() {
	'use strict';
	var myNav = {
		init: function() {
			this.cacheDOM();
			this.browserWidth();
			this.bindEvents();
		},
		cacheDOM: function() {
			this.navBars = $('.navBars');
			this.rb = $('#rb');
			this.navMenu = $('#menu');
		},
		browserWidth: function() {
			$(window).resize(this.bindEvents.bind(this));
		},
		bindEvents: function() {
			var width = window.innerWidth;

			if (width < 760) {
				this.navBars.click(this.animate.bind(this));
				this.navMenu.hide();
				this.rb[0].checked = false;
			} else {
				this.resetNav();
			}
		},
		animate: function(e) {
			var checkbox = this.rb[0];
			!checkbox.checked ? this.navMenu.slideDown() : this.navMenu.slideUp();
		},
		resetNav: function() {
			this.navMenu.show();
		}
	};
	myNav.init();
});

// typewriter text animation
class TypeWriter {
	constructor(txtElement, words, wait = 3000) {
		this.txtElement = txtElement;
		this.words = words;
		this.txt = '';
		this.wordIndex = 0;
		this.wait = parseInt(wait, 10);
		this.type();
		this.isDeleting = false;
	}
	type() {
		// Current index of word
		const current = this.wordIndex % this.words.length;
		// Get full text of current word
		const fullTxt = this.words[current];

		// Check if deleting
		if (this.isDeleting) {
			// Remove char
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			// Add char
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		// Insert txt into element
		this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

		// Initial Type Speed
		let typeSpeed = 200;

		if (this.isDeleting) {
			typeSpeed /= 2;
		}

		// If word is complete
		if (!this.isDeleting && this.txt === fullTxt) {
			// Make pause at end
			typeSpeed = this.wait;
			// Set delete to true
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			// Move to next word
			this.wordIndex++;
			// Pause before start typing
			typeSpeed = 500;
		}

		setTimeout(() => this.type(), typeSpeed);
	}
}
// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
	const txtElement = document.querySelector('.text-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	// Init TypeWriter
	new TypeWriter(txtElement, words, wait);
}

/////////////////////////////////////////////////////////////////////////
// pagination
$('#pagination-demo').twbsPagination({
	totalPages: 16,
	visiblePages: 6,
	next: 'Next',
	prev: 'Prev',
	onPageClick: function(event, page) {
		//fetch content and render here
		$('#page-content').text('Page ' + page) + ' content here';
	}
});

/////////////////////////////////////////////////////////////////////////
// nav bar animation
// $('.menu-toggle').click(function() {
// 	$('.site-nav').toggleClass('site-nav--open', 500);
// 	$(this).toggleClass('open');
// });

////////////////////////////////////////////////////////////////////
// google map
function initMap() {
	// The location of Uluru
	var uluru = { lat: 25.8102373, lng: -80.1751609 };
	// The map, centered at Uluru
	var map = new google.maps.Map(document.getElementById('map'), { zoom: 4, center: uluru });
	// The marker, positioned at Uluru
	var marker = new google.maps.Marker({ position: uluru, map: map });
}

////////////////////////////////////////////////////////////////////
//Light Box

function openModal() {
	document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
	document.getElementById('myModal').style.display = 'none';
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides((slideIndex += n));
}

function currentSlide(n) {
	showSlides((slideIndex = n));
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName('mySlides');
	var dots = document.getElementsByClassName('view');
	var captionText = document.getElementById('caption');
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(' active', '');
	}
	slides[slideIndex - 1].style.display = 'block';
	dots[slideIndex - 1].className += ' active';
	captionText.innerHTML = dots[slideIndex - 1].alt;
}
