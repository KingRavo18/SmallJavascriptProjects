<?php
require("database.php");
mysqli_set_charset($conn, 'utf8mb4');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if(isset($_POST["task"])){
    $user_id = $_SESSION["user_id"];
    $task = mysqli_real_escape_string($conn, $_POST["task"]);
    $query = "INSERT INTO tasks(user_id, task) VALUES('$user_id', '$task')";
    try{
        mysqli_query($conn, $query);
        $last_id = mysqli_insert_id($conn);
        echo json_encode(array(
            "query_success" => "Task added succesfully",
            "id" => $last_id
        ));
    }
    catch(Exception $e){
        http_response_code(500);
        echo json_encode(array( "query_fail" => "Caught exception: {$e->getMessage()}" ));
    }       
}

mysqli_close($conn);
