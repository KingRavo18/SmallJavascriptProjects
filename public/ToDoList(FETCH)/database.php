<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);
header('Content-Type: application/json');

$hostname = "localhost";
$username = "root";
$password = "";
$dbName = "ajaxtodolist";

$conn = mysqli_connect($hostname, $username, $password, $dbName);

if(!$conn){
  echo json_encode(["error" => "Database connection failed"]);
  exit;
}