<?php

    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);
    session_start();
    if (isset($_SESSION["user_id"]))
    {
        $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
        $stmt = $conn->query("SELECT * FROM Users WHERE id = ".$_SESSION["user_id"].";");
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        $products=explode(";",$user['busket']);
        $newBusket = "";
        for($i=0;$i<count($products);$i++){
            if(explode(":", $products[$i])[0]!=$data["id"]){
                if($newBusket==""||$newBusket==null){
                    $newBusket = $products[$i];
                }else{
                    $newBusket = $newBusket.";".$products[$i];
                }
                
            }
        }
        $stmt = $conn->prepare("UPDATE Users SET busket = :busket WHERE id = ".$_SESSION["user_id"].";");
        $stmt->execute([
            'busket' => $newBusket
        ]);
    }
?>
