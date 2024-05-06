<?php 
try {
    class Response{
        public $brands, $sizes, $price;
    }
    $brands = [];
    $sizes = [];
    $price = [0,0];
    $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
    
    $sql = "SELECT * FROM Products;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $products=$stmt->fetchAll(PDO::FETCH_ASSOC);
    $count = 0;
    for($i=0;$i<count($products);$i++){
        if(!in_array($products[$i]["brands"],$brands)){
            $brands[] = ["name"=>$products[$i]["brands"],"id"=>$i];
        }
        $productSize=explode(";",$products[$i]["sizes"]);
        for($l=0;$l<count($productSize);$l++){
            if(!in_array($productSize[$l],$sizes)){
                $sizes[] = ["name"=>$productSize[$l],"id"=>$count];
                $count++;
            }
        }
        
        if($i!=0){
            if($products[$i]['price']<$price[0]){
                $price[0]=$products[$i]['price'];
            }
            if($products[$i]['price']>$price[1]){
                $price[1]=$products[$i]['price'];
            }
        }else{
            $price[0]=$products[$i]['price'];
            $price[1]=$products[$i]['price'];
        }
    }
    $response = new Response();
    $response->brands=$brands;
    $response->sizes=$sizes;
    $response->price=$price;
    echo json_encode($response);
}
catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>