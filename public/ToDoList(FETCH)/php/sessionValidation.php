<?php
session_start();

if(empty($_SESSION["id"]) || empty($_SESSION["username"])){
    session_destroy();
    echo json_encode(["session_validation" => "failed"]);
}
else{
    echo json_encode(["session_validation" => "The Session Exists"]);
}
