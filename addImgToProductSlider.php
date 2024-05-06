<?php
    session_start();
    if (isset($_SESSION["user_id"]))
    {
        
        $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
        $stmt = $conn->query("SELECT * FROM Users WHERE id = ".$_SESSION["user_id"].";");
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if($user['role']=="admin"){
            $stmt = $conn->query("SELECT * FROM Products WHERE id = ".$_POST['id'].";");
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($_FILES && sizeof($_FILES)!=0)
            {
                $prefix="sliderImg";
                $uniqueIndex = 0;
                $files = scandir(getcwd()."/img");
                foreach($files as $file){
                    if(substr($file,0,9)==$prefix){
                        
                        echo intval(explode("-",$file)[1])."<br/>";
                        if(intval(explode("-",$file)[1])>=$uniqueIndex){
                            $uniqueIndex=intval(explode("-",$file)[1])+1;
                        }
                        
                    }
                }
                $name = "img/" . $prefix."-".$uniqueIndex."-".$_FILES["img"]["name"];
                echo $name;
                move_uploaded_file($_FILES["img"]["tmp_name"], $name);
                $isImgExist = true;
                echo "Файл загружен";
                $sql = "UPDATE Products SET imgs = :imgs WHERE id = :id;";
                $stmt = $conn->prepare($sql);
                $newImgs;
                if($product['imgs']==""||$product['imgs']==null){
                    $newImgs = str_replace(" ", "%20", $prefix."-".$uniqueIndex."-".$_FILES["img"]["name"]);
                }else{
                    $newImgs = $product['imgs'].";".str_replace(" ", "%20", $prefix."-".$uniqueIndex."-".$_FILES["img"]["name"]);;
                }
                $stmt->execute([
                    'imgs' => $newImgs,
                    'id' => $_POST['id']
                ]);
            }
            
        }
        
    }
?>
