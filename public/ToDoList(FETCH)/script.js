document.addEventListener("DOMContentLoaded", () => {
    retrieveData();
    document.getElementById("task-submit-form").addEventListener("submit", submitTask);

});

async function submitTask(event){
    //prevents the forms default reload
    event.preventDefault();
    try{
        const taskValueInput = document.getElementById("taskInput");
        const response = await fetch("./sendData.php", {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                task: taskValueInput.value
            })
        });
        
        if(!response.ok){
            throw new Error("Failed to create task");
        }
        
        createListItem(taskValueInput.value);
        taskValueInput.value = "";
    }
    catch(error){
        console.error(error);
    }
}

async function retrieveData(){
    try{
        const response = await fetch("./retrieveData.php");
        if(!response.ok){
            throw new Error("Failed to retrieve task data");
        }

        const data = await response.json();
        data.forEach(task => {
            createListItem(task.task, task.id);
        });
    }
    catch(error){
        console.error(error);
    }
}

async function updateData(){
    try{
    }
    catch(error){
        console.error(error);
    }
}

async function deleteData(id){
    try{
        const response = await fetch(`./deleteData.php?id=${id}`, {method: "DELETE"});

        if(!response.ok){
            throw new Error("Failed to delete task");
        }
    }
    catch(error){
        console.error(error);
    }
}

function createListItem(taskContents, id){
    const listItem = document.createElement("li");
    const buttonContainer = document.createElement("div");
    const finishedBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    listItem.textContent = taskContents;
    finishedBtn.textContent = "✅";
    deleteBtn.textContent = "🗑️";
    deleteBtn.id = "deleteBtn";
    deleteBtn.addEventListener("click", async () => {
        await deleteData(id);
        listItem.remove();
    });

    buttonContainer.appendChild(finishedBtn);
    buttonContainer.appendChild(deleteBtn);
    listItem.appendChild(buttonContainer);

    document.getElementById("taskContainer").append(listItem);
}