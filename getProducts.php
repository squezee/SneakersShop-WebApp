<?php 
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);
try {
    
    $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
    
    $sql = "SELECT * FROM Products WHERE (price BETWEEN ".$data['range'][0]." AND ".$data['range'][1].")";
    if($data['size']!=[]){
        $sql = $sql." AND (";
        for($i=0;$i<count($data['size']);$i++){
            if($i==0){
                $sql = $sql."sizes LIKE '%".$data['size'][$i]."%'";
            }else{
                $sql = $sql."OR sizes LIKE '%".$data['size'][$i]."%'";
            }
            
        }
        $sql = $sql.")";
    }
    if($data['brand']!=[]){
        $sql = $sql." AND (";
        for($i=0;$i<count($data['brand']);$i++){
            if($i==0){
                $sql = $sql."brands LIKE '%".$data['brand'][$i]."%'";
            }else{
                $sql = $sql."OR brands LIKE '%".$data['brand'][$i]."%'";
            }
            
        }
        $sql = $sql.")";
    }
    if($data['category']!=''){
        if($data['category']=="newArrivals"){
            $sql = $sql." AND (isNewArrival LIKE '%1%')";
        }else{
            $sql = $sql." AND (category LIKE '%".$data['category']."%')";
        }
        
    }
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