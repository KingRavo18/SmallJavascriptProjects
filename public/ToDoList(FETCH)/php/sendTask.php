<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);
header('Content-Type: application/json');

require "database.php";
mysqli_set_charset($conn, 'utf8mb4');

if(isset($_POST["task"])){
    $task = mysqli_real_escape_string($conn, $_POST["task"]);
    $query = "INSERT INTO tasks(task) VALUES('$task')";

    if(mysqli_query($conn, $query)){
        $last_id = mysqli_insert_id($conn);
        echo json_encode([
            "query_success" => "Task added succesfully",
            "id" => $last_id  
        ]);
    }
}