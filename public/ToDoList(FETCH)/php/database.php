<?php
session_start();
ini_set('display_errors', 0);
error_reporting(E_ALL);
header('Content-Type: application/json');

$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "ajaxtodolist";

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

if(!$conn){
  echo json_encode(["db_error" => "Database connection failed"]);
  exit;
}