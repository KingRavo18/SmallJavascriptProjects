<?php
require("database.php");
class SubmitTask extends DatabaseConnect{
    private $user_id;
    private $task;

    public function __construct($user_id, $task){   
        $this->user_id = $user_id;
        $this->task = $task;
    }

    private function inputValidation(){
        if(empty(trim($this->task))){
            throw new Exception("Task cannot be empty");
        }
    }

    private function submitTask(){
        $stmt = parent::conn()->prepare("INSERT INTO tasks (user_id, task) VALUES (?, ?)");
        $stmt->execute([$this->user_id, $this->task]);
        $last_id = parent::conn()->lastInsertId();

        echo json_encode([
            "query_success" => "Task added succesfully",
            "id" => $last_id,
            "isComplete" => 0
        ]);
        $stmt = null;
    }

    public function execution(){
        try{
            $this->inputValidation();
            $this->submitTask();
        }
        catch(PDOException $e){
            echo json_encode(["query_fail_pdo" => "Caught exception: {$e->getMessage()}"]);
        }
        catch(Exception $e){
            echo json_encode(["query_fail" => $e->getMessage()]);
        }
    }
}

if(isset($_POST["task"])){
    $user_id = $_SESSION["id"];
    $task = filter_input(INPUT_POST, "task", FILTER_SANITIZE_SPECIAL_CHARS);
    $submit = new SubmitTask($user_id, $task);
    $submit->execution();    
}
else{
    echo json_encode(["query_fail" => "Failed to create task"]);
}


