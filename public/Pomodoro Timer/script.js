const counterDisplay = document.getElementById("counterDisplay");
const timeInput = document.getElementById("timeInput");
let startingTime;
let intervalCounter = null;
let isActive = false;
let exists = false;

const changeDisplay = () => counterDisplay.textContent = timeInput.value.padStart(2, "0") + ":00";

function start(){
    if(!exists){
        startingTime = Number(timeInput.value) * 60;
    }   
    if(!isActive){
        intervalCounter = setInterval(countTime, 1000);
        isActive = true;
        exists = true;
    }
}

function countTime() {
    startingTime--;
    if(startingTime < 0){
        clearInterval(intervalCounter);
        isActive = false;
        return;
    }   

    let minutes = String(Math.floor(startingTime / 60 % 60));
    let seconds = String(Math.floor(startingTime % 60));
    counterDisplay.textContent = minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
}

function stop(){
    if(isActive){
        clearInterval(intervalCounter);
        isActive = false;
    }
}

function reset(){
    startingTime = 1500;
    clearInterval(intervalCounter);
    isActive = false;
    exists = false;
    changeDisplay();
}

//Play a sound when finished
//Add presets