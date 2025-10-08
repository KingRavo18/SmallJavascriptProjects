<?php
require("databaseOOP.php");

class Login extends DatabaseConnect{
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
    }

    private function loginUser(){
        $stmt = parent::conn()->prepare("SELECT id, password FROM users WHERE username = ?");
        $stmt->execute([$this->username]);
        $user = $stmt->fetch();

        if(!$user || !password_verify($this->password, $user->password)){
            throw new Exception("You have entered an incorrect username or password");
        }

        $_SESSION["username"] = $this->username;
        $_SESSION["id"] = $user->id;
        $stmt = null;
        echo json_encode(["query_success" => "Login success"]);
    }

    public function execution(){
        try{
            $this->inputValidation();
            $this->loginUser();
        } 
        catch(PDOException $e){
            echo json_encode(["query_fail_pdo" => $e->getMessage()]);
            echo json_encode(["query_fail" => "An error has occured. Please try again later"]);
            session_destroy();
        }
        catch(Exception $e){
            echo json_encode(["query_fail" => $e->getMessage()]);
            session_destroy();
        }
    }
}

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
$login = new Login($username, $password);
$login->execution();



