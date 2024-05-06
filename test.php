<?php
    $prefix="sliderImg";
    $uniqueIndex = 0;
    $files = scandir(getcwd()."/img");
    foreach($files as $file){
        if(substr($file,0,9)==$prefix){
            
            echo intval(explode("-",$file)[1])."<br/>";
            if(intval(explode("-",$file)[1])>=$uniqueIndex){
                $uniqueIndex++;
            }
            
        }
    }
    echo $uniqueIndex;
?>
