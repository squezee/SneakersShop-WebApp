<?php
    session_start();
    if (isset($_SESSION["user_id"]))
    {
        
        $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
        $stmt = $conn->query("SELECT * FROM Users WHERE id = ".$_SESSION["user_id"].";");
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if($user['role']=="admin"){
            $stmt = $conn->query("SELECT * FROM Products WHERE id = ".$_GET['id'].";");
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            $imgs = explode(";",$product['imgs']);
            $newImgs = "";
            for($i=0;$i<count($imgs);$i++){
                if($imgs[$i]!=$_GET['img']){
                    if($newImgs!=""){
                        $newImgs=$newImgs.";".$imgs[$i];
                    }else{
                        $newImgs=$imgs[$i];
                    }
                }
            }
                $sql = "UPDATE Products SET imgs = :imgs WHERE id = :id;";
                $stmt = $conn->prepare($sql);
                $stmt->execute([
                    'imgs' => $newImgs,
                    'id' => $_GET['id']
                ]);
            
            
        }
        
    }
?>
