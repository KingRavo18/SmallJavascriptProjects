document.addEventListener("DOMContentLoaded", setDisplay);
const counterDisplay = document.getElementById("counterDisplay");
const timeInput = document.getElementById("timeInput");
timeInput.value = localStorage.getItem("chosenTime") || 1;
const timerFinishedSound = document.getElementById("TimerFinishedSound");
let endTime = 0;
let remainingTime = 0;
let intervalCounter = null;
let isRunning = false;

//Works as a timer reset if called directly
function setDisplay(){
    counterDisplay.textContent = timeInput.value.padStart(2, "0") + ":00";
    localStorage.setItem("chosenTime", timeInput.value);
    stop();
    remainingTime = Number(timeInput.value) * 1000 * 60;
}

function start(){
    if(timeInput.value <= 0){
        setDisplay();
        return window.alert("Please input the amount of minutes.");
    }

    if(!isRunning){
        endTime = Date.now() + remainingTime;
        intervalCounter = setInterval(countTime, 1000);
        isRunning = true;
    }
}

function countTime(){
    remainingTime = endTime - Date.now();
    if(remainingTime < 0){
        clearInterval(intervalCounter);
        isRunning = false;
        return timerFinishedSound.play();
    }   

    let minutes = String(Math.floor(remainingTime / 1000 / 60 % 60));
    let seconds = String(Math.floor((remainingTime / 1000) % 60));
    counterDisplay.textContent = minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
}

function stop(){
    if(isRunning){
        clearInterval(intervalCounter);
        remainingTime = endTime - Date.now();
        isRunning = false;
    }
}