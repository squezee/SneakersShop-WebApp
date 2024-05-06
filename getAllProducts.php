<?php 
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);
try {
    session_start();
    if (isset($_SESSION["user_id"]))
    {
    $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
        $stmt = $conn->query("SELECT * FROM Users WHERE id = ".$_SESSION["user_id"].";");
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if($user['role']=="admin"){
            $sql = "SELECT * FROM Products;";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result=$stmt->fetchAll(PDO::FETCH_ASSOC);
            $json = json_encode($result);
            echo $json;
        }
    }
}
catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>