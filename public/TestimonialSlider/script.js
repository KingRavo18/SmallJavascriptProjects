document.addEventListener("DOMContentLoaded", createSlides);

async function createSlides() {

    try{
        const response = await fetch("slideData.json");
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();

        data.forEach(dataObject => {
            const testimonialContainer = document.createElement("div");
            testimonialContainer.classList.add("testimonial-container");

            const image = document.createElement("img");
            image.src = dataObject.src;
            image.alt = dataObject.alt;

            const testimonial = document.createElement("p");
            testimonial.textContent = dataObject.testimonial;

            const signature = document.createElement("p");
            signature.textContent = dataObject.signature;

            document.body.appendChild(testimonialContainer);
            testimonialContainer.appendChild(image);
            testimonialContainer.appendChild(testimonial);
            testimonialContainer.appendChild(signature);
        });

        initializeSlider();
    }
    catch(error){
        console.error(error);
    }
}

function initializeSlider() {
    const slides = document.querySelectorAll(".testimonial-container");
    let slideIndex = localStorage.getItem("slideIndex") || 0;
    const slideOutAnim = () => slides[slideIndex].classList.add("slideOutAnimation");

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
            localStorage.setItem("slideIndex", slideIndex);
            setTimeout(slideOutAnim, 6000);
        }, 8000);
    }
}
