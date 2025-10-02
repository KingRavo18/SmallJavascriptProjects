<?php
require("database.php");

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

try{
    if(empty(trim($username))){
        throw new Exception("Please input an username");
    }
    if(empty(trim($password))){
        throw new Exception("Please input a password");
    }

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if(!$user || !password_verify($password, $user->password)){
        throw new Exception("You have entered an incorrect username or password");
    }

    $_SESSION["username"] = $username;
    $_SESSION["id"] = $user->id;
    echo json_encode(["query_success" => "Login success"]);
} 
catch(PDOException $e){
    echo json_encode(["query_fail_pdo" => $e->getMessage()]);
    session_destroy();
}
catch(Exception $e){
    echo json_encode(["query_fail" => $e->getMessage()]);
    session_destroy();
}

$stmt = null;
$conn = null;
