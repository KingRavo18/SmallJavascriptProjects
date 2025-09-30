<?php
require("database.php");
session_start();
if (isset($_POST["loginBTN"])) {
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

    if (empty($username)) {
        exit("Please input a username");
    }
    if (empty($password)) {
        exit("Please input a password");
    }

    try {
        $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        if (!$user) {
            throw new Exception("Username does not exist");
        }
        if (!password_verify($password, $user->password)) {
            throw new Exception("You have entered an incorrect password");
        }

        $_SESSION["username"] = $username;
        $_SESSION["id"] = $user->id;
        $_SESSION["user_id"] = $user->id;

        header("Location: ../toDoList.html");
    } catch (PDOException $e) {
        session_destroy();
        echo $e->getMessage();
        header("Location: ../index.html");
    }
}

$stmt = null;
$conn = null;
