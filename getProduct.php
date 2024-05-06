<?php 
try {
    
    $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
    $stmt = $conn->prepare("SELECT * FROM Products WHERE id = :id;");
    $stmt->execute([
        'id' => $_GET['id']
    ]);
    $result=$stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($result[0]);
    echo $json;
}
catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>