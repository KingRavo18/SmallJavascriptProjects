(() => {
    document.addEventListener("DOMContentLoaded", () => {
        analogClock();
        setInterval(analogClock, 1000);
    });

    function analogClock(){
        const date = new Date(),
        seconds = date.getSeconds() * 6 - 180,
        minutes = date.getMinutes() * 6 - 180,
        hours = (date.getHours() * 30 - 180) + date.getMinutes() / 2;
        
        document.getElementById("seconds").style.transform = `rotate(${seconds}deg)`;
        document.getElementById("minutes").style.transform = `rotate(${minutes}deg)`;
        document.getElementById("hours").style.transform = `rotate(${hours}deg)`;
    }
})();

