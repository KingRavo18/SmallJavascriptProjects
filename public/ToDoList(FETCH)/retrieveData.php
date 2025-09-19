<?php

require "database.php";

$query = "SELECT * FROM tasks";
$result = mysqli_query($conn, $query);

$tasks = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($tasks);