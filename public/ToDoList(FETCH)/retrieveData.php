<?php

$conn = mysqli_connect("localhost", "root", "", "ajaxtodolist");

$query = "SELECT task FROM tasks";

$result = mysqli_query($conn, $query);

$tasks = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($tasks);