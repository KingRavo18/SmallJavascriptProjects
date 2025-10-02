document.addEventListener("DOMContentLoaded", () => {
    sessionValidation();
    const taskManager = new TaskManager("./php/retrieveTask.php", "./php/sendTask.php", "./php/updateTask.php", "./php/deleteTask.php");
    taskManager.init();
    logoutPopupControl();
});

async function sessionValidation(){
    try{
        const response = await fetch("./php/sessionValidation.php");
        if(!response.ok){
            throw new Error("Failed to validate this session");
        }

        const data = await response.json();
        if (data.session_validation === "failed"){
            throw new Error("Session validation failed");
        }
        else{
            return;
        }
    }
    catch(error){
        console.error(error);
        window.location.replace("./index.html");
    }
}

class TaskManager{
    constructor(retrieveUrl, submitUrl, updateUrl, deleteUrl){
        this.retrieveUrl = retrieveUrl;
        this.submitUrl = submitUrl;
        this.updateUrl = updateUrl;
        this.deleteUrl = deleteUrl;
        this.ToDoListContainer = document.getElementById("ToDoList-container");
        this.empty = document.createElement("p");
        this.taskAmount;
    }

    init(){
        this.retrieveData();
        document.getElementById("task-submit-form").addEventListener("submit", (event) => this.submitTask(event));
    }

    async retrieveData(){
        const loading = document.createElement("p");
        loading.textContent = "Loading...";
        loading.classList.add("loadingMessage");
        this.ToDoListContainer.appendChild(loading);

        try{
            const response = await fetch(this.retrieveUrl);
            const data = await response.json();
            this.taskAmount = Number(data.row_count);
            this.ToDoListContainer.removeChild(loading);

            if(!response.ok){
                throw new Error("Failed to retrieve tasks");
            }

            if(this.taskAmount === 0){
                this.noTasks();
            } 
            else{
                data.tasks?.forEach(task => this.createListItem(task.task, task.id, task.isComplete));
            }    
        }
        catch(error){
            loading.classList.remove("loadingMessage");
            loading.classList.add("error-message");
            loading.textContent = error.message;
        }
    }

    async submitTask(event){
        event.preventDefault();
        const taskValueInput = document.getElementById("taskInput");
        const taskValue = taskValueInput.value.trim();
        if(!taskValue){
            return window.alert("Please input a task");
        }

        try{
            const response = await fetch(this.submitUrl, {
                method: "POST",
                headers: { "Content-type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ task: taskValue })
            });
            const data = await response.json();
            
            if(data.query_fail){
                throw new Error(data.query_fail);
            }
            if(data.query_fail_pdo){
                console.error(data.query_fail_pdo);
            }
            if(!response.ok){
                throw new Error("Failed to create task");
            }

            taskValueInput.value = "";
            if(this.taskAmount === 0){
                this.ToDoListContainer.removeChild(this.empty);
            }
            this.taskAmount += 1;
            this.createListItem(taskValue, data.id, data.isComplete);
        }
        catch(error){
            console.error(error);
        }
    }

    async updateTask(id, isComplete){
        try{
            const response = await fetch(this.updateUrl, {
                method: "POST",
                headers: { "Content-type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ id: id, isComplete: isComplete })
            });
            const data = await response.json();
            
            if(data.query_fail){
                throw new Error(data.query_fail);
            }
            if(data.query_fail_pdo){
                throw new Error(data.query_fail_pdo);
            }
            if(!response.ok){
                throw new Error("Failed to update task");
            }
        } 
        catch(error){
            console.error(error);
        }
    }

    async deleteTask(id){
        try{
            const response = await fetch(`${this.deleteUrl}?id=${id}`, { method: "DELETE" });
            const data = await response.json();

            if(data.query_fail){
                throw new Error(data.query_fail);
            }
            if(data.query_fail_pdo){
                throw new Error(data.query_fail_pdo);
            }
            if(!response.ok){
                throw new Error("Failed to delete task");
            }

            this.taskAmount -= 1;
            if(this.taskAmount === 0){
                this.noTasks();
            }
            
        }
        catch(error){
            console.error(error);
        }
    }

    createListItem(taskContents, id, isComplete){
        const listItem = document.createElement("li");
        const task = document.createElement("span");
        const buttonContainer = document.createElement("div");
        const finishedBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        task.textContent = taskContents;
        this.updateTaskDesign(isComplete, finishedBtn, task)

        finishedBtn.addEventListener("click", async () => {
            await this.updateTask(id, isComplete);
            isComplete = !isComplete;
            this.updateTaskDesign(isComplete, finishedBtn, task);
        });

        deleteBtn.textContent = "🗑️";
        deleteBtn.addEventListener("click", async () => {
            await this.deleteTask(id);
            listItem.remove();
        });

        buttonContainer.appendChild(finishedBtn);
        buttonContainer.appendChild(deleteBtn);
        listItem.appendChild(task);
        listItem.appendChild(buttonContainer);
        document.getElementById("taskContainer").append(listItem);
    }

    updateTaskDesign(isComplete, finishedBtn, task) {
        if(isComplete){
            finishedBtn.textContent = "❎";
            task.style.textDecoration = "line-through";
        } 
        else{
            finishedBtn.textContent = "✅";
            task.style.textDecoration = "none";
        }
    }

    noTasks(){
        this.empty.classList = "loadingMessage";
        this.empty.textContent = "There are no tasks";
        this.ToDoListContainer.appendChild(this.empty);
    }
}

function logoutPopupControl(){
    const openLogoutPopup = () => document.getElementById("popup-container").style.display = "grid";
    const closeLogoutPopup = () => document.getElementById("popup-container").style.display = "none";

    document.getElementById("logOutBtn").onclick = openLogoutPopup;
    document.getElementById("logoutDeny").onclick = closeLogoutPopup;
}


