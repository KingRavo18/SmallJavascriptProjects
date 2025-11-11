<?php
session_start();
class DatabaseConnect {
    private $db_server = "localhost";
    private $db_username = "root";
    private $db_password = "";
    private $db_name = "to_do_list";

    protected function conn(){
        $attribute_options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
        ];
        try{
            $dsn = "mysql:host={$this->db_server};dbname={$this->db_name}";
            $conn = new PDO($dsn, $this->db_username, $this->db_password, $attribute_options);
            return $conn;
        } 
        catch(PDOException $e){
            echo json_encode(["query_fail_pdo" => "Database connection failed: {$e->getMessage()}"]);
        }
    }
}








