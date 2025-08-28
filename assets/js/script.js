'use strict';
//script js


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// gallery variables
const gallerySlides = document.querySelectorAll("[data-gallery-slide]");
const galleryDots = document.querySelectorAll("[data-gallery-dot]");
const galleryPrevBtn = document.querySelector("[data-gallery-prev]");
const galleryNextBtn = document.querySelector("[data-gallery-next]");

let currentGallerySlide = 0;
let gallerySlideInterval;

// Check if gallery elements exist before proceeding
if (gallerySlides.length > 0 && galleryDots.length > 0 && galleryPrevBtn && galleryNextBtn) {
  console.log("Gallery elements found:", {
    slides: gallerySlides.length,
    dots: galleryDots.length,
    prevBtn: !!galleryPrevBtn,
    nextBtn: !!galleryNextBtn
  });

// gallery functions
const showGallerySlide = function (slideIndex) {
  console.log("Showing gallery slide:", slideIndex);
  
  // Remove active class from all slides and dots
  gallerySlides.forEach(slide => slide.classList.remove("active"));
  galleryDots.forEach(dot => dot.classList.remove("active"));
  
  // Add active class to current slide and dot
  gallerySlides[slideIndex].classList.add("active");
  galleryDots[slideIndex].classList.add("active");
  
  currentGallerySlide = slideIndex;
};

const nextGallerySlide = function () {
  const nextIndex = (currentGallerySlide + 1) % gallerySlides.length;
  showGallerySlide(nextIndex);
};

const prevGallerySlide = function () {
  const prevIndex = (currentGallerySlide - 1 + gallerySlides.length) % gallerySlides.length;
  showGallerySlide(prevIndex);
};

const startGalleryAutoSlide = function () {
  gallerySlideInterval = setInterval(nextGallerySlide, 4500); // 4.5 seconds
};

const stopGalleryAutoSlide = function () {
  clearInterval(gallerySlideInterval);
};

// gallery event listeners
galleryPrevBtn.addEventListener("click", function () {
  stopGalleryAutoSlide();
  prevGallerySlide();
  startGalleryAutoSlide();
});

galleryNextBtn.addEventListener("click", function () {
  stopGalleryAutoSlide();
  nextGallerySlide();
  startGalleryAutoSlide();
});

// dot navigation
galleryDots.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    stopGalleryAutoSlide();
    showGallerySlide(index);
    startGalleryAutoSlide();
  });
});

// start auto-sliding
startGalleryAutoSlide();

} // Close the if statement for gallery elements



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Avatar Slider functionality
const sliderSlides = document.querySelectorAll(".slider-slide");
const sliderDots = document.querySelectorAll(".slider-dot");
const sliderImages = document.querySelectorAll(".slider-image");
const imageOverlay = document.getElementById("imageOverlay");
const overlayImage = document.getElementById("overlayImage");
const overlayCloseBtn = document.getElementById("overlayCloseBtn");

let currentSlide = 0;
let slideInterval;

// Function to show slide
function showSlide(index) {
  console.log("Showing slide:", index); // Debug log
  
  // Validate index
  if (index < 0 || index >= sliderSlides.length) {
    console.error("Invalid slide index:", index);
    return;
  }
  
  // Remove active class from all slides and dots
  sliderSlides.forEach(slide => slide.classList.remove("active"));
  sliderDots.forEach(dot => dot.classList.remove("active"));
  
  // Add active class to current slide and dot
  if (sliderSlides[index]) {
    sliderSlides[index].classList.add("active");
    console.log("Activated slide:", index);
  }
  if (sliderDots[index]) {
    sliderDots[index].classList.add("active");
  }
  
  currentSlide = index;
}

// Function to next slide
function nextSlide() {
  console.log("Next slide called, current:", currentSlide); // Debug log
  currentSlide = (currentSlide + 1) % sliderSlides.length;
  showSlide(currentSlide);
}

// Start auto-slide
function startSlideShow() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  slideInterval = setInterval(nextSlide, 3000);
}

// Stop auto-slide
function stopSlideShow() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

// Initialize slider
function initSlider() {
  console.log("Initializing slider with", sliderSlides.length, "slides"); // Debug log
  
  // Check if elements exist
  if (sliderSlides.length === 0) {
    console.error("No slider slides found!");
    return;
  }
  
  // Log all image sources for debugging
  sliderImages.forEach((img, index) => {
    console.log("Image", index + 1, "src:", img.src);
    img.addEventListener('load', () => {
      console.log("Image", index + 1, "loaded successfully");
    });
    img.addEventListener('error', () => {
      console.error("Failed to load image", index + 1, ":", img.src);
      // Set a fallback image or show an error placeholder
      img.src = "./assets/images/my-avatar.png";
    });
  });
  
  // Ensure first slide is visible
  showSlide(0);
  
  // Start slideshow after a short delay to ensure everything is loaded
  setTimeout(() => {
    startSlideShow();
  }, 1000);
}

// Add click events to dots
sliderDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    console.log("Dot clicked:", index); // Debug log
    stopSlideShow();
    showSlide(index);
    startSlideShow();
  });
});

// Add click events to images for overlay
sliderImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    console.log("Image clicked:", index); // Debug log
    stopSlideShow();
    overlayImage.src = image.src;
    overlayImage.alt = image.alt;
    imageOverlay.classList.add("active");
  });
});

// Close overlay
overlayCloseBtn.addEventListener("click", () => {
  imageOverlay.classList.remove("active");
  startSlideShow();
});

// Close overlay when clicking outside
imageOverlay.addEventListener("click", (e) => {
  if (e.target === imageOverlay) {
    imageOverlay.classList.remove("active");
    startSlideShow();
  }
});

// Initialize slider when page loads
document.addEventListener("DOMContentLoaded", initSlider);

// Show More functionality for About section
const showMoreBtn = document.getElementById("showMoreBtn");
const aboutTextExpanded = document.getElementById("aboutTextExpanded");

if (showMoreBtn && aboutTextExpanded) {
  showMoreBtn.addEventListener("click", function() {
    const isExpanded = aboutTextExpanded.style.display !== "none";
    
    if (isExpanded) {
      aboutTextExpanded.style.display = "none";
      showMoreBtn.querySelector("span").textContent = "Show More";
      showMoreBtn.classList.remove("expanded");
    } else {
      aboutTextExpanded.style.display = "block";
      showMoreBtn.querySelector("span").textContent = "Show Less";
      showMoreBtn.classList.add("expanded");
    }
  });
}