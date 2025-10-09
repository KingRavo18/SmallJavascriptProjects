<?php
require("database.php");
class RetrieveTasks extends DatabaseConnect{
    private $user_id;

    public function __construct($user_id){
        $this->user_id = $user_id;
    }

    private function retrieveTasks(){
        $stmt = parent::conn()->prepare("SELECT * FROM tasks WHERE user_id = ?");
        $stmt->execute([$this->user_id]);
        $count = $stmt->rowCount();

        if($count > 0){
            $tasks = $stmt->fetchAll();
            echo json_encode([
                "tasks" => $tasks,
                "row_count" => $count
            ]);
            $stmt = null;
        } 
        else{
            echo json_encode(["row_count" => $count]);
        }   
    }

    public function execution(){
        try{
            $this->retrieveTasks();
        }
        catch(PDOException $e){
            echo json_encode(["query_fail_pdo" => "Caught exception: {$e->getMessage()}"]);
        }   
    }
}

$user_id = $_SESSION["id"];
$retrieve = new RetrieveTasks($user_id);
$retrieve->execution();




