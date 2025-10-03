<?php
require("database.php");

if(isset($_POST["task"])){
    $user_id = $_SESSION["id"];
    $task = filter_input(INPUT_POST, "task", FILTER_SANITIZE_SPECIAL_CHARS);

    try{
        if(empty(trim($task))){
            throw new Exception("Task cannot be empty");
        }

        $stmt = $conn->prepare("INSERT INTO tasks (user_id, task) VALUES (?, ?)");
        $stmt->execute([$user_id, $task]);
        $last_id = $conn->lastInsertId();

        echo json_encode([
            "query_success" => "Task added succesfully",
            "id" => $last_id,
            "isComplete" => 0
        ]);
    }
    catch(PDOException $e){
        echo json_encode(["query_fail_pdo" => "Caught exception: {$e->getMessage()}"]);
    }
    catch(Exception $e){
        echo json_encode(["query_fail" => $e->getMessage()]);
    }
}
else{
    echo json_encode(["query_fail" => "Failed to create task"]);
}

$stmt = null;
$conn = null;
