<?php

$conn = mysqli_connect("localhost", "root", "", "ajaxtodolist");

if(isset($_GET["id"])){
    $id = $_GET["id"];

    $query = "DELETE FROM tasks WHERE id = {$id}";

    if(mysqli_query($conn, $query)){
        echo "Task Deleted Successfully";
    }else{
        echo "ERROR: {mysqli_error($conn)}"; 
    }
}