<?php
require("databaseOOP.php");
class Registration extends DatabaseConnect{
    private $username;
    private $password;

    public function __construct($username, $password){
        $this->username = $username;
        $this->password = $password;
    }

    private function inputValidation(){
        if(empty(trim($this->username))){
            throw new Exception("Please input an username");    
        }
        if(empty(trim($this->password))){
            throw new Exception("Please input a password");
        }
        if(strlen($this->password) < 8){
            throw new Exception("A password must be at least 8 symbols long");
        }
        if(!preg_match("/[a-z]/", $this->password)){
            throw new Exception("A password must contain a non-capital letter");
        }
        if(!preg_match("/[A-Z]/", $this->password)){
            throw new Exception("A password must contain a capital letter");
        }
        if(!preg_match("/[0-9]/", $this->password)){
            throw new Exception("A password must contain a number");
        }
        if(!preg_match("/[\'^£$%&*()}{@#~?><>,|=_+¬-]/", $this->password)){
            throw new Exception("A password must contain a special character");
        }
    }

    private function insertUser() {
        $password_hash = password_hash($this->password, PASSWORD_DEFAULT);
        $stmt = parent::conn()->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->execute([$this->username, $password_hash]); 
        $stmt = null;   
        echo json_encode(["query_success" => "You are now registered"]);
    }
    
    public function execution(){
        try{
            $this->inputValidation();
            $this->insertUser();
        }
        catch(PDOException $e){
            echo json_encode([
                "query_fail_pdo" => $e->getMessage(),
                "query_fail" => "An error has occured. Please try again later"
            ]);
        }
        catch(Exception $e){
            echo json_encode(["query_fail" => $e->getMessage()]);
        } 
        finally{
            session_destroy();
        }
    }
} 

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
$registration = new Registration($username, $password);
$registration->execution();

