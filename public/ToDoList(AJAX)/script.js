document.addEventListener("DOMContentLoaded", retrieveData);

function submitTask(event){
    event.preventDefault();
    const task = document.getElementById("taskInput").value;
    const params = `task=${task}`;

    const xhr = new XMLHttpRequest();
}

function retrieveData(event){
    event.preventDefault();
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