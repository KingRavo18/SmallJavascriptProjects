document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registrationForm").addEventListener("submit", registration);
    document.getElementById("loginForm").addEventListener("submit", login);
});

async function login(event){
    event.preventDefault();
    const username = document.getElementById("log-username");
    const password = document.getElementById("log-password");
    const mainFormContainer = document.getElementById("main-form-container");

    try{
        inputValidation(username, password);
        const response = await fetch("./php/login.php", {
            method: "POST",
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ username: username.value, password: password.value })
        });
        if(!response.ok){
            throw new Error("Could not log in");
        }

        const data = await response.json();
        if(data.query_fail){
            throw new Error(data.query_fail);
        }
        if(data.query_fail_pdo){
            console.error(data.query_fail_pdo);
        }
        
        window.location.href = "./toDoList.html";
    } 
    catch(error){
        errorMessage(mainFormContainer, error.message);
    }
}

async function registration(event){
    event.preventDefault();
    const username = document.getElementById("reg-username");
    const password = document.getElementById("reg-password");
    const mainFormContainer = document.getElementById("main-form-container");
    try{
        inputValidation(username, password)
        const response = await fetch("./php/register.php", {
            method: "POST",
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ username: username.value, password: password.value })
        });
        if(!response.ok){
            throw new Error("Could not register");
        }

        const data = await response.json();
        if(data.query_fail){
            throw new Error(data.query_fail);
        }
        if(data.query_fail_pdo){
            console.error(data.query_fail_pdo);
        }

        username.value = "";
        password.value = "";
        successMessage(mainFormContainer, data.query_success);
    } 
    catch(error){
        errorMessage(mainFormContainer, error.message)
    }
}

function errorMessage(mainFormContainer, message){
    const errorMessage = document.createElement("span");
    errorMessage.classList.add("message");
    errorMessage.classList.add("errorMessage");
    errorMessage.textContent = message;
    mainFormContainer.appendChild(errorMessage);
    setTimeout(() => {
        errorMessage.classList.add("messageDisappearAnimation");
        setTimeout(() => {
            errorMessage.classList.remove("messageDisappearAnimation");
            errorMessage.classList.remove("errorMessage");
            mainFormContainer.removeChild(errorMessage);
        }, 490);
    }, 4000)
}

function successMessage(mainFormContainer, message){
    const successMessage = document.createElement("span");
    successMessage.classList.add("message");
    successMessage.classList.add("successMessage");
    successMessage.textContent = message;
    mainFormContainer.appendChild(successMessage);
    setTimeout(() => {
        successMessage.classList.add("messageDisappearAnimation");
        setTimeout(() => {
            successMessage.classList.remove("messageDisappearAnimation");
            successMessage.classList.remove("successMessage");
            mainFormContainer.removeChild(successMessage);
        }, 490);
    }, 4000)
}

function inputValidation(username, password){
    if(username.value.trim() === ""){
        throw new Error("Please input a username");
    }
    if(password.value.trim() === ""){
        throw new Error("Please input a password");
    }
    if(password.value.length < 8){
        throw new Error("A password must be at least 8 symbols long");
    }
    if(!Boolean(password.value.match(/[a-z]/))){
        throw new Error("A password must contain a non-capital letter");
    }
    if(!Boolean(password.value.match(/[A-Z]/))){
        throw new Error("A password must contain a capital letter");
    }
    if(!Boolean(password.value.match(/[0-9]/))){
        throw new Error("A password must contain a number");
    }
    if(!Boolean(password.value.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/))){
        throw new Error("A password must contain a special character");
    }
}