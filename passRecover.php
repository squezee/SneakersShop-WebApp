<?php

    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);
    session_start();
    if (isset($_SESSION["user_id"]))
    {
        $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
        $stmt = $conn->query("SELECT * FROM Users WHERE id = ".$_SESSION["user_id"].";");
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if (password_verify($data['password'], $user['password'])) {
            
            $newHash = password_hash($data['newpassword'], PASSWORD_DEFAULT);
            $stmt = $conn->prepare("UPDATE Users SET password = :newpassword WHERE id = ".$_SESSION["user_id"].";");
            $stmt->execute([
                'newpassword' => $newHash
            ]);
        }
        
    }
?>
