<?php
require("database.php");

$user_id = $_SESSION["user_id"];
$stmt = $conn->prepare("SELECT * FROM tasks WHERE user_id = ?");
$stmt->execute([$user_id]);

if ($stmt->rowCount() > 0) {
    $tasks = $stmt->fetchAll();
    echo json_encode($tasks);
} else {
    echo json_encode(["no_tasks" => "There are no tasks"]);
}

$stmt = null;
$conn = null;
