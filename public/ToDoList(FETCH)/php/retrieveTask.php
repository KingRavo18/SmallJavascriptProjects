<?php
require("database.php");

$query = "SELECT * FROM tasks";
$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) > 0){
    $tasks = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($tasks);
}else{
    echo json_encode(array("no_tasks" => "There are no tasks"));
}

mysqli_close($conn);



