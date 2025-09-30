<?php
session_start();
ini_set('display_errors', 0);
error_reporting(E_ALL);
header('Content-Type: application/json');

$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "ajaxtodolist";

$attribute_options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
];

try {
    $dsn = "mysql:host={$db_server};dbname={$db_name}";
    $conn = new PDO($dsn, $db_username, $db_password, $attribute_options);
} catch (PDOException $e) {
    echo json_encode(["query_fail" => "Database connection failed: {$e->getMessage()}"]);
}
