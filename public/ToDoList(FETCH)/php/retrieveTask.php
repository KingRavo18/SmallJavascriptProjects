<?php
require("database.php");

$user_id = $_SESSION["user_id"];
$query = "SELECT * FROM tasks WHERE user_id = '$user_id'";
$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) > 0){
    $tasks = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($tasks);
}else{
    echo json_encode(array("no_tasks" => "There are no tasks"));
}

mysqli_close($conn);



