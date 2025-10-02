<?php
require("database.php");

if(isset($_POST["id"]) && isset($_POST["isComplete"])){
    $id = $_POST["id"];
    $isComplete = !$_POST["isComplete"];

    try{
        $stmt = $conn->prepare("UPDATE tasks SET isComplete = ? WHERE id = ?");
        $stmt->execute([$isComplete, $id]);

        echo json_encode(["query_success" => "Task Updated Successfully"]);
    } 
    catch(PDOexception $e){
        echo json_encode(["query_fail_pdo" => "Caught exception: {$e->getMessage()}"]);
    }
}
else{
    echo json_encode(["query_fail" => "Failed to update task"]);
}

$conn = null;
$stmt = null;
