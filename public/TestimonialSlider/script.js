document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    const slides = document.querySelectorAll(".testimonial-container");
    let slideIndex = 0;

    if(slides.length > 0){
        slides[slideIndex].style.display = "block";
        setInterval(() => {
            slideIndex++;
            slides.forEach(slide => {
                slide.style.display = "none";
            });
            if(slideIndex >= slides.length){
                slideIndex = 0;
            }
            slides[slideIndex].style.display = "block";
        }, 5000);
    }
}
