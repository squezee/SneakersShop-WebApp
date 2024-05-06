<?php
    class Response{
        public $message;
        public $user;
    }
    session_start();
    if (isset($_SESSION["user_id"]))
    {

        $response = new Response();
        $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
        $stmt = $conn->query("SELECT * FROM Users WHERE id = ".$_SESSION["user_id"].";");
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        $response->user=$user;
        $response->message="ok";
        echo json_encode($response);
    }else{
        $response = new Response();
        $response->message="Pizdec";
        echo json_encode($response);
    }
?>
