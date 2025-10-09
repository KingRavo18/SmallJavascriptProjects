<?php
require("databaseOOP.php");
class DeleteTask extends DatabaseConnect{
    private $id;

    public function __construct($id){
        $this->id = $id;
    }

    private function deleteData(){
        $stmt = parent::conn()->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$this->id]);
        $stmt = null;
        echo json_encode(["query_success" => "Task Deleted Successfully"]);
    }

    public function execution(){
        try{
            $this->deleteData();
        } 
        catch(PDOException $e){
            echo json_encode(["query_fail_pdo" => "Caught exception: {$e->getMessage()}"]);
        }
    }
}

if(isset($_GET["id"])){
    $id = $_GET["id"];
    $delete = new DeleteTask($id);
    $delete->execution();
}
else{
    echo json_encode(["query_fail" => "Failed to delete task"]);
}


