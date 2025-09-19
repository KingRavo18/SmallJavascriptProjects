<?php

require "database.php";

if(isset($_POST["task"])){
    $task = mysqli_real_escape_string($conn, $_POST["task"]);

    $query = "INSERT INTO tasks(task) VALUES('$task')";

    if(mysqli_query($conn, $query)){
        echo "Task Added Succesfully";
    }else{
        echo "ERROR: ". mysqli_error($conn); 
    }
}