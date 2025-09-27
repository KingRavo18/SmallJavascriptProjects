<?php
require("database.php");
mysqli_set_charset($conn, 'utf8mb4');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if(isset($_POST["task"])){
    $task = mysqli_real_escape_string($conn, $_POST["task"]);
    $query = "INSERT INTO tasks(task) VALUES('$task')";

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
