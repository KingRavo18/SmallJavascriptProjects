<?php
require("database.php");

if (isset($_GET["id"])) {
    $id = $_GET["id"];
    try {
        $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["query_success" => "Task Deleted Successfully"]);
    } catch (PDOException $e) {
        echo json_encode(["query_fail" => "Caught exception: {$e->getMessage()}"]);
    }
}

$stmt = null;
$conn = null;
