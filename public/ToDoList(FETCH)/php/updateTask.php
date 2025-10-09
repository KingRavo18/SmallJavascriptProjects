<?php
require("databaseOOP.php");
class UpdateTask extends DatabaseConnect{
    private $id;
    private $isComplete;

    public function __construct($id, $isComplete){
        $this->id = $id;
        $this->isComplete = $isComplete;
    }

    private function updateTask(){
        $stmt = parent::conn()->prepare("UPDATE tasks SET isComplete = ? WHERE id = ?");
        $stmt->execute([$this->isComplete, $this->id]);
        $stmt = null;
        echo json_encode(["query_success" => "Task Updated Successfully"]);
    }

    public function execution(){
        try{
            $this->updateTask();
        } 
        catch(PDOexception $e){
            echo json_encode(["query_fail_pdo" => "Caught exception: {$e->getMessage()}"]);
        }
    }
}

if(isset($_POST["id"]) && isset($_POST["isComplete"])){
    $id = $_POST["id"];
    $isComplete = !$_POST["isComplete"];
    $update = new UpdateTask($id, $isComplete);
    $update->execution();
}
else{
    echo json_encode(["query_fail" => "Failed to update task"]);
}


