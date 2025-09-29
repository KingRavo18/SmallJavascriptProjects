<?php
require("database.php");
session_start();

if(isset($_POST["loginBTN"])){
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

    if(empty($username)){
        exit("Please input a username");
    }
    if(empty($password)){
        exit("Please input a password");
    }

    $sql = "SELECT id, password FROM users WHERE username = '{$username}'";
    
    try{
        $result = mysqli_query($conn, $sql);
        if(!$result){
            throw new Exception("Username does not exist");
        }

        $user = mysqli_fetch_assoc($result);
        if(!password_verify($password, $user["password"])){
            throw new Exception("You have entered an incorrect password");
        }

        $_SESSION["user_id"] = $user["id"];

        header("Location: ../toDoList.html");
    }
    catch(Exception $e){
        session_destroy();
        echo $e->getMessage();
        header("Location: ../index.html");
    }
}

mysqli_close($conn);