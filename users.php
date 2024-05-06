<?php 
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);
try {
    
    $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
    
    $sql = "SELECT * FROM Users";
    
    $sql = $sql.";";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result=$stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($result);
    echo $json;
}
catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>