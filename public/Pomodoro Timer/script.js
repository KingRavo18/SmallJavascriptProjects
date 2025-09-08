const counterDisplay = document.getElementById("counterDisplay");
const timeInput = document.getElementById("timeInput");
const timerFinishedSound = document.getElementById("TimerFinishedSound");
let startingTime;
let intervalCounter = null;
let isRunning = false;
let haveSecondsBeenCalculated = false;

//Works as a timer reset if called directly
function setDisplay(){
    counterDisplay.textContent = timeInput.value.padStart(2, "0") + ":00";
    haveSecondsBeenCalculated = false;
    stop();
}

function start(){
    if(!haveSecondsBeenCalculated){
        startingTime = Number(timeInput.value) * 60;
        haveSecondsBeenCalculated = true;
    }   

    if(startingTime <= 0){
        setDisplay();
        return window.alert("Please input the amount of minutes.");
    }

    if(!isRunning){
        intervalCounter = setInterval(countTime, 1000);
        isRunning = true;
    }
}

function countTime() {
    startingTime--;
    if(startingTime < 0){
        clearInterval(intervalCounter);
        isRunning = false;
        return timerFinishedSound.play();
    }   

    let minutes = String(Math.floor(startingTime / 60 % 60));
    let seconds = String(Math.floor(startingTime % 60));
    counterDisplay.textContent = minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
}

function stop(){
    if(isRunning){
        clearInterval(intervalCounter);
        isRunning = false;
    }
}

//Add presets