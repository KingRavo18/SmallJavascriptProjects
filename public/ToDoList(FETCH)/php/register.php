<?php
require("database.php");

if(isset($_POST["registerBTN"])){
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

    if(empty($username)){
        exit("Please enter an username.");
    }
    if(empty($password)){
        exit("Please enter an password.");
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

    try{
        mysqli_query($conn, $sql);
        echo "You are now registered";
    }
    catch(mysqli_sql_exception){
        echo "This username already exists";
        
    }
    finally{
        header("Location: ../index.html");
    }
    
}

mysqli_close($conn);