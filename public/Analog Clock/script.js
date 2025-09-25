function analogClock(){
    let date = new Date();
    let seconds = date.getSeconds() * 6 - 180;
    let minutes = date.getMinutes() * 6 - 180;
    let hours = date.getHours() * 30 - 180;
    
    document.getElementById("seconds").style.transform = `rotate(${seconds}deg)`;
    document.getElementById("minutes").style.transform = `rotate(${minutes}deg)`;
    document.getElementById("hours").style.transform = `rotate(${hours}deg)`;
}

analogClock();
setInterval(analogClock, 1000);