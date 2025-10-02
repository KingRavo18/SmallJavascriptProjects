document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registrationForm").addEventListener("submit", (event) => registration(event));
    document.getElementById("loginForm").addEventListener("submit", (event) => login(event));
});

async function login(event) {
    const username = document.getElementById("log-username");
    const password = document.getElementById("log-password");
    const responseMessage = document.getElementById("login-message");
    responseMessage.textContent = "";

    try {
        inputValidation(username, password);
        const response = await fetch("./php/login.php", {
            method: "POST",
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ username: username.value, password: password.value })
        });
        if (!response.ok) {
            throw new Error("Could not log in");
        }

    } catch (error) {
        event.preventDefault();
        username.value = "";
        password.value = "";
        responseMessage.style.color = "red";
        responseMessage.textContent = error.message;
    }
}

async function registration(event) {
    event.preventDefault();
    const username = document.getElementById("reg-username");
    const password = document.getElementById("reg-password");
    const responseMessage = document.getElementById("registration-message");
    responseMessage.style.color = "green";
    responseMessage.textContent = "";

    try {
        inputValidation(username, password)

        const response = await fetch("./php/register.php", {
            method: "POST",
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ username: username.value, password: password.value })
        });
        if (!response.ok) {
            throw new Error("Could not register");
        }

        const data = await response.json();
        if (data.query_fail) {
            throw new Error(data.query_fail);
        }

        responseMessage.textContent = data.query_success;
        username.value = "";
        password.value = "";
    } catch (error) {
        responseMessage.style.color = "red";
        responseMessage.textContent = error.message;
    }
}

function inputValidation(username, password) {
    if (username.value.trim() == "") {
        throw new Error("Please input a username");
    }
    if (password.value.trim() == "") {
        throw new Error("Please input a password");
    }
    if (password.value.length < 8) {
        throw new Error("A password must be at least 8 symbols long");
    }
}