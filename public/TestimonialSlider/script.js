document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    const slides = document.querySelectorAll(".testimonial-container");
    const slideOutAnim = () => slides[slideIndex].classList.add("slideOutAnimation");
    let slideIndex = 0;

    if(slides.length > 0){
        slides[slideIndex].style.display = "block";
        setTimeout(slideOutAnim, 6000);
        setInterval(() => {
            slideIndex++;
            slides.forEach(slide => {
                slide.style.display = "none";
                slide.classList.remove("slideOutAnimation");
            });
            if(slideIndex >= slides.length){
                slideIndex = 0;
            }
            slides[slideIndex].style.display = "block";
            setTimeout(slideOutAnim, 6000);
        }, 8000);
    }
}
