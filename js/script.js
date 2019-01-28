var wrapper = document.getElementById("carousel");

document.addEventListener("DOMContentLoaded", function() {
  init();
});


/**
 * Get Json content
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'dist/json/data.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
 }

/**
 * Initialise the carousel content
 * @return {[type]} [description]
 */
function init() {
 loadJSON(function(response) {
    // Parse JSON string into object
    var json = JSON.parse(response);
    console.log(JSON);
    var count = Object.keys(json.films);
    for(var slides=0; slides<count.length; slides++) {
      
      // Create the tags
      var slide          = document.createElement("div");
      var contentWrapper = document.createElement("div");
      var slideImg       = document.createElement("img");
      var slideContent   = document.createElement("div")
      var titleTag       = document.createElement("h2");
      var contentTag     = document.createElement("p");

      // Add classes and attributes
      slide.classList.add("slide", "fade");
      contentWrapper.classList.add("content-wrapper");
      slideContent.classList.add("slide-content");

      // Add the content
      var filmContent = json.films[slides];
      
      slideImg.src           = filmContent.url; // Image sourse
      titleTag.textContent   = filmContent.title; // Title content
      contentTag.textContent = filmContent.description; // Description


      wrapper.appendChild(slide);
      slide.appendChild(contentWrapper);
      contentWrapper.appendChild(slideImg);
      contentWrapper.appendChild(slideContent);
      slideContent.appendChild(titleTag);
      slideContent.appendChild(contentTag);
    }

  showSlides();
 });
}

/**
 * Begin the caruosel
 * @type {Number}
 */
var slideIndex = 0;
function showSlides() {
  var i;
  var slides = wrapper.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
      slides[i].classList.add("slide", "fade");
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].classList.remove("fade");
  setTimeout(showSlides, 6500); // Change image every 2 seconds
} 
