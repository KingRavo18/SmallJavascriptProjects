document.addEventListener("DOMContentLoaded", createSlides);

async function createSlides(){

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

            document.getElementById("testimonial-slider-container").appendChild(testimonialContainer);
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

function initializeSlider(){
    const slides = document.querySelectorAll(".testimonial-container");
    let slideIndex = Number(localStorage.getItem("slideIndex")) || 0;
    let timeout = null;
    const slideOutAnim = () => slides[slideIndex].classList.add("slideOutAnimation");

    if(slides.length > 0){
        slides[slideIndex].classList.add("visible");
        setTimeout(slideOutAnim, 6000);
        setInterval(() => {
            clearTimeout(timeout);
            slides[slideIndex].classList.remove("visible");
            slides[slideIndex].classList.remove("slideOutAnimation");
            slideIndex++;
            if(slideIndex >= slides.length){
                slideIndex = 0;
            }
            slides[slideIndex].classList.add("visible");
            localStorage.setItem("slideIndex", slideIndex);
            timeout = setTimeout(slideOutAnim, 6000);
        }, 8000);
    }
}
