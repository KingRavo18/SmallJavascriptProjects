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
    if(strlen($password) < 8){
        throw new Exception("A password must be at least 8 symbols long");
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->execute([$username, $password_hash]);

    echo json_encode(["query_success" => "You are now registered"]);
} 
catch(PDOException $e){
    echo json_encode(["query_fail_pdo" => $e->getMessage()]);
} 
catch(Exception $e){
    echo json_encode(["query_fail" => "This username already exists"]);
} 
finally{
    session_destroy();
}

$stmt = null;
$conn = null;
