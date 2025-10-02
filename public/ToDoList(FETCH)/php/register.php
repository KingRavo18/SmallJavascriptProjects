<?php
require("database.php");

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
if (strlen($password) < 8) {
    echo json_encode(["query_fail" => "A password must be at least 8 symbols long"]);
    exit;
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);
try {
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->execute([$username, $password_hash]);
    echo json_encode(["query_success" => "You are now registered"]);
} catch (PDOException $e) {
    echo json_encode(["query_fail_notUser" => $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["query_fail" => "This username already exists"]);
} finally {
    session_destroy();
}

$stmt = null;
$conn = null;
