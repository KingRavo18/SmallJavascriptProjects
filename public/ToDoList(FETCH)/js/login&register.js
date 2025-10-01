document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registrationForm").addEventListener("submit", (event) => registration(event));
});

async function registration(event) {
    event.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");
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
            console.error(data.query_fail);
            throw new Error(data.query_fail_user);
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