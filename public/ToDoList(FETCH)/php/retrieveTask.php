<?php
require("database.php");

$user_id = $_SESSION["id"];

try{
    $stmt = $conn->prepare("SELECT * FROM tasks WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $count = $stmt->rowCount();

    if($count > 0){
        $tasks = $stmt->fetchAll();
        echo json_encode([
            "tasks" => $tasks,
            "row_count" => $count
        ]);
    } 
    else{
        echo json_encode(["row_count" => $count]);
    }   
}
catch(PDOException $e){
    echo json_encode(["query_fail_pdo" => "Caught exception: {$e->getMessage()}"]);
}

$stmt = null;
$conn = null;
