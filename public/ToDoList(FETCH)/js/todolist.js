document.addEventListener("DOMContentLoaded", () => {
    sessionValidation();
    const taskManager = new TaskManager("./php/retrieveTask.php", "./php/sendTask.php", "./php/updateTask.php", "./php/deleteTask.php");
    taskManager.init();
    logoutPopupControl();
});

async function sessionValidation() {
    try {
        const response = await fetch("./php/sessionValidation.php");
        if (!response.ok) {
            throw new Error("Failed to validate this session");
        }
        const data = await response.json();
        if (data.session_validation === "failed") {
            throw new Error("Session validation failed");
        }
        else {
            return;
        }
    }
    catch (error) {
        console.error(error);
        window.location.replace("./index.html");
    }
}

class TaskManager {
    constructor(retrieveUrl, submitUrl, updateUrl, deleteUrl) {
        this.retrieveUrl = retrieveUrl;
        this.submitUrl = submitUrl;
        this.updateUrl = updateUrl;
        this.deleteUrl = deleteUrl;
        this.form = document.getElementById("task-submit-form");
        this.taskValueInput = document.getElementById("taskInput");
        this.ToDoListContainer = document.getElementById("ToDoList-container");
    }

    init() {
        this.retrieveData();
        this.form.addEventListener("submit", (event) => this.submitTask(event));
    }

    async retrieveData() {
        try {
            const loading = document.createElement("p");
            loading.textContent = "Loading...";
            loading.classList = "loadingMessage";
            this.ToDoListContainer.appendChild(loading);

            const response = await fetch(this.retrieveUrl);
            if (!response.ok) {
                loading.style.color = "red";
                loading.textContent = "Failed to retrieve tasks.";
                throw new Error("Failed to retrieve tasks");
            }

            const data = await response.json();
            this.ToDoListContainer.removeChild(loading);
            if (data.no_tasks) {
                this.noTasks();
            } else {
                data?.forEach(task => this.createListItem(task.task, task.id, task.isComplete));
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    async submitTask(event) {
        //prevents the form's default reload
        event.preventDefault();
        try {
            const taskValue = this.taskValueInput.value.trim();
            if (!taskValue) {
                return window.alert("Please input a task");
            }

            const response = await fetch(this.submitUrl, {
                method: "POST",
                headers: { "Content-type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ task: taskValue })
            });
            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            const data = await response.json();
            if (data.query_success) {
                console.log(data.query_success);
            }
            else if (data.query_fail) {
                console.error(data.query_fail);
            }

            this.createListItem(taskValue, data.id, data.isComplete);
            this.taskValueInput.value = "";
        }
        catch (error) {
            console.error(error);
        }
    }

    async updateTask(id, isComplete) {
        try {
            const response = await fetch(this.updateUrl, {
                method: "POST",
                headers: { "Content-type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ id: id, isComplete: isComplete })
            });
            if (!response.ok) {
                throw new Error("Failed to update task");
            }
            const data = await response.json();
            if (data.query_success) {
                console.log(data.query_success);
            }
            else if (data.query_fail) {
                console.error(data.query_fail);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTask(id) {
        try {
            const response = await fetch(`${this.deleteUrl}?id=${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
            const data = await response.json();
            if (data.query_success) {
                console.log(data.query_success);
            }
            else if (data.query_fail) {
                console.error(data.query_fail);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    createListItem(taskContents, id, isComplete) {
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
        if (isComplete) {
            finishedBtn.textContent = "❎";
            task.style.textDecoration = "line-through";
        } else {
            finishedBtn.textContent = "✅";
            task.style.textDecoration = "none";
        }
    }

    noTasks() {
        const empty = document.createElement("p");
        empty.classList = "loadingMessage";
        empty.textContent = "There are no tasks";
        this.ToDoListContainer.appendChild(empty);
    }
}

function logoutPopupControl() {
    const openLogoutPopup = () => document.getElementById("popup-container").style.display = "grid";
    const closeLogoutPopup = () => document.getElementById("popup-container").style.display = "none";

    document.getElementById("logOutBtn").onclick = openLogoutPopup;
    document.getElementById("logoutDeny").onclick = closeLogoutPopup;
}


