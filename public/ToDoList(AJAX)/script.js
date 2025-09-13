document.addEventListener("DOMContentLoaded", retrieveData);
document.getElementById("taskInput").addEventListener("onkeydown", event => {
    if(event.keyCode == 13){
        submitTask();
    }
});

function submitTask(){
    const taskValue = document.getElementById("taskInput").value;
    const params = `task=${taskValue}`;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./sendData.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function(){
        console.log(this.responseText);
        createListItem(taskValue);
        document.getElementById("taskInput").value = "";
    }

    xhr.send(params);
}

function retrieveData(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./retrieveData.php", true);

    xhr.onload = function(){
        if(this.status === 200){
            const tasks = JSON.parse(this.responseText);
            tasks.forEach(task => {
                createListItem(task.task);
            });
        }
    }
    xhr.send();
}

function createListItem(taskContents){
    const listItem = document.createElement("li");
    const buttonContainer = document.createElement("div");
    const finishedBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    listItem.textContent = taskContents;
    finishedBtn.textContent = "✅";
    deleteBtn.textContent = "🗑️";

    buttonContainer.appendChild(finishedBtn);
    buttonContainer.appendChild(deleteBtn);
    listItem.appendChild(buttonContainer);

    document.getElementById("taskContianer").append(listItem);
}