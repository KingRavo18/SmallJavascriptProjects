<?php
require("database.php");
session_start();

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

try {
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    if (!$user) {
        throw new Exception("Username does not exist");
    }
    if (!password_verify($password, $user->password)) {
        throw new Exception("You have entered an incorrect password");
    }

    $_SESSION["username"] = $username;
    $_SESSION["id"] = $user->id;
    $_SESSION["user_id"] = $user->id;
} catch (PDOException $e) {
    session_destroy();
    echo json_encode([
        "query_fail" => $e->getMessage()
    ]);
}

$stmt = null;
$conn = null;
