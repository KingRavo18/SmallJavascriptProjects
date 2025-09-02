const slideData = [
    {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcc1SmXN3Ares8s4teWGd6efZoz6dlTwEOSA&s",
        alt: "Image of Shrek",
        testimonial: "This is simply unbelievable! I would be lost without Apple. The very best. Not able to tell you how happy I am with Apple.",
        signature: "Shrek"
    },
    {
        src: "https://m.media-amazon.com/images/I/71pD9qNC2VL._UF894,1000_QL80_.jpg",
        alt: "Image of Stitch",
        testimonial: "Thank you for making it painless, pleasant and most of all hassle free! I wish I would have thought of it first. The very best.",
        signature: "Stitch"
    },
    {
        src: "https://static.wikia.nocookie.net/50ab890a-dc3a-4006-9642-e01764431162/scale-to-width/755",
        alt: "Image of Lightning McQueen",
        testimonial: "I would also like to say thank you to all your staff. Wow what great service, I love it! Apple impressed me on multiple levels.",
        signature: "Lightning McQueen"
    }
];

slideData.forEach(dataObject => {
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

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    const slides = document.querySelectorAll(".testimonial-container");
    let slideIndex = 0;
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
            setTimeout(slideOutAnim, 6000);
        }, 8000);
    }
}
