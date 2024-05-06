<?php
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);
    session_start();
    if (isset($_SESSION["user_id"]))
    {
        
        $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
        $stmt = $conn->query("SELECT * FROM Users WHERE id = ".$_SESSION["user_id"].";");
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if($user['role']=="admin"){
                
                $sql = "UPDATE Products SET description = :description, sizes = :sizes WHERE id = :id;";
                $stmt = $conn->prepare($sql);
                
                $stmt->execute([
                    'description' => $data['description'],
                    'id' => $data['id'],
                    'sizes' => $data['sizes']
                ]);
            
            
        }
        
    }
?>
