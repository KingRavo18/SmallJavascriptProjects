<?php

$hostname = "localhost";
$username = "root";
$password = "";
$dbName = "ajaxtodolist";

$conn = mysqli_connect($hostname, $username, $password, $dbName);

if(!$conn){
  echo json_encode(["error" => "Database connection failed"]);
  exit;
}