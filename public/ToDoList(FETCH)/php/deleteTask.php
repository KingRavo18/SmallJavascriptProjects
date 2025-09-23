<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);
header('Content-Type: application/json');

require "database.php";

if(isset($_GET["id"])){
    $id = $_GET["id"];

    $query = "DELETE FROM tasks WHERE id = {$id}";

    if(mysqli_query($conn, $query)){
        echo "Task Deleted Successfully";
    }else{
        echo "ERROR: {mysqli_error($conn)}"; 
    }
}