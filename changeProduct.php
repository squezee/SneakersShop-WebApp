<?php
    session_start();
    if (isset($_SESSION["user_id"]))
    {
        
        $conn = new PDO("mysql:host=localhost;dbname=shopdb", "root", "Nike7363");
        $stmt = $conn->query("SELECT * FROM Users WHERE id = ".$_SESSION["user_id"].";");
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if($user['role']=="admin"){
            $isImgExist = false;
            $prefix="productMain";
            $uniqueIndex = 0;
            if ($_FILES && $_FILES["img"]["error"]== UPLOAD_ERR_OK && sizeof($_FILES)!=0)
            {
                
                
                $files = scandir(getcwd()."/img");
                foreach($files as $file){
                    if(substr($file,0,11)==$prefix){
                        if(intval(explode("-",$file)[1])>=$uniqueIndex){
                            $uniqueIndex=intval(explode("-",$file)[1])+1;
                        }
                        
                    }
                }
                $name = "img/" . $prefix."-".$uniqueIndex."-".$_FILES["img"]["name"];
                move_uploaded_file($_FILES["img"]["tmp_name"], $name);
                $isImgExist = true;
                echo "Файл загружен";
            }
            $sql = "UPDATE Products SET name = :name, price = :price";
            if($isImgExist){
                $sql=$sql.", img = '".str_replace(" ", "%20", $prefix."-".$uniqueIndex."-".$_FILES["img"]["name"])."'";
            }
            $sql=$sql." WHERE id = :id;";
            echo $sql;
            $stmt = $conn->prepare($sql);
            $stmt->execute([
                'name' => $_POST['name'],
                'price' => $_POST['price'],
                'id' => $_POST['id']
            ]);
        }
        
    }
?>
