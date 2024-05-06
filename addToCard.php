<?php

    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);
    session_start();
    if (isset($_SESSION["user_id"]))
    {
        $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
        $stmt = $conn->query("SELECT * FROM Users WHERE id = ".$_SESSION["user_id"].";");
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        $stmt = $conn->prepare("UPDATE Users SET busket = :busket WHERE id = ".$_SESSION["user_id"].";");
        if($user['busket']==""||$user['busket']==null){
            $stmt->execute([
                'busket' => $data['id'].":".$data['size'].":".$data['count']
            ]);
        }else{
            $stmt->execute([
                'busket' => $user->busket.";".$data['id'].":".$data['size'].":".$data['count']
            ]);
        }
        
    }
?>
