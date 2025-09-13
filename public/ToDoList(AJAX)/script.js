document.addEventListener("DOMContentLoaded", retrieveData);

document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        document.getElementById("task-submit-form").submit();
    }
});

function submitTask(event){
    //prevents the forms default reload
    event.preventDefault();
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
    xhr.onerror = () => {
        console.error("Could not submit task");
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
        if(this.status === 404){
            console.error("Could not find task data");
        }
    }

    xhr.onerror = () => {
        console.error("Could not retrieve tasks");
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

    document.getElementById("taskContainer").append(listItem);
}