const counterDisplay = document.getElementById("counterDisplay");
let intervalCounter = null;
let startingTime = 1500;
let isActive = false;

function start(){
    if(!isActive){
        intervalCounter = setInterval(countTime, 1000);
        isActive = true;
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
    counterDisplay.textContent = "25:00";
}

//Play a sound when finished
//Let the user enter how many minutes they want
//Add presets