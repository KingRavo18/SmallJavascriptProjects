<?php
require("database.php");

if (isset($_POST["task"])) {
    $user_id = $_SESSION["user_id"];
    $task = filter_input(INPUT_POST, "task", FILTER_SANITIZE_SPECIAL_CHARS);
    if (empty(trim($task))) {
        echo json_encode(["query_fail" => "Task cannot be empty"]);
        exit;
    }

    try {
        $stmt = $conn->prepare("INSERT INTO tasks(user_id, task) VALUES(?, ?)");
        $stmt->execute([$user_id, $task]);
        $last_id = $conn->lastInsertId();
        echo json_encode([
            "query_success" => "Task added succesfully",
            "id" => $last_id
        ]);
    } catch (PDOException $e) {
        echo json_encode(["query_fail" => "Caught exception: {$e->getMessage()}"]);
    }
}

$stmt = null;
$conn = null;
