<?php
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);
$conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
$stmt = $conn->prepare("SELECT * FROM Users WHERE (username = :username) OR (email=:email)");
$stmt->execute(['username' => $data['username'],'email'=>$data['email']]);
if ($stmt->rowCount() > 0) {
    echo "Database error: login is used";
    
    die; // Остановка выполнения скрипта
}

$stmt = $conn->prepare("INSERT INTO Users (username, password, email, role, likes, busket) VALUES (:username, :password, :email, :role, :likes, :busket)");
$stmt->execute([
    'username' => $data['username'],
    'password' => password_hash($data['password'], PASSWORD_DEFAULT),
    'email' => $data['email'],
    'role' => "user",
    'likes' => "",
    'busket' => ""
]);
?>