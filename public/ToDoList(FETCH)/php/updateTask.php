<?php
require("database.php");
class UpdateTask extends DatabaseConnect{
    private $id;
    private $isComplete;

    public function __construct($id, $isComplete){
        $this->id = $id;
        $this->isComplete = $isComplete;
    }

    private function updateTask(){
        $stmt = parent::conn()->prepare("UPDATE tasks SET is_complete = ? WHERE id = ?");
        $stmt->execute([$this->isComplete, $this->id]);
        echo json_encode(["query_success" => "Task Updated Successfully"]);
        $stmt = null;
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


