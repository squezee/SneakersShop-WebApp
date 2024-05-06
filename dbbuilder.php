



<?php
try {
    $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
    $sql = "CREATE TABLE Users (id integer auto_increment primary key, username varchar(30), password varchar(255), email varchar(50), likes varchar(255), busket varchar(255));";
    
    $conn->exec($sql);
    echo "Table Users has been created";
}
catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>
//(id integer auto_increment primary key, name varchar(30), price integer, img varchar(30), description varchar(500), sizes varchar(100), imgs varchar(250));