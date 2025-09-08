const counterDisplay = document.getElementById("counterDisplay");
const timeInput = document.getElementById("timeInput");
let startingTime;
let intervalCounter = null;
let isRunning = false;
let areSecondsCalculated = false;

function changeDisplay(){
    counterDisplay.textContent = timeInput.value.padStart(2, "0") + ":00";
    areSecondsCalculated = false;
    stop();
}

function start(){
    if(!areSecondsCalculated){
        startingTime = Number(timeInput.value) * 60;
    }   
    if(startingTime === 0){
        return window.alert("Please input the amount of minutes.")
    }
    if(!isRunning){
        intervalCounter = setInterval(countTime, 1000);
        isRunning = true;
        areSecondsCalculated = true;
    }
}

function countTime() {
    startingTime--;
    if(startingTime < 0){
        clearInterval(intervalCounter);
        isRunning = false;
        return;
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

function reset(){
    startingTime = 1500;
    changeDisplay();
}

//Play a sound when finished
//Add presets