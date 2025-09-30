<?php
require("database.php");

if (isset($_POST["registerBTN"])) {
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

    if (empty(trim($username))) {
        echo json_encode(["query_fail" => "Please enter an username"]);
        exit;
    }
    if (empty(trim($password))) {
        echo json_encode(["query_fail" => "Please enter a password"]);
        exit;
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->execute([$username, $password_hash]);
        echo json_encode(["query_success" => "You are now registered"]);
    } catch (PDOException $e) {
        echo json_encode(["query_fail" => "Caught exception: {$e->getMessage()}"]);
    } finally {
        session_destroy();
        header("Location: ../index.html");
    }
}

$stmt = null;
$conn = null;
