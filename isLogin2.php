<?php
  session_start();
 
  if( isset( $_SESSION['visit'] ) ) {
    $_SESSION['visit'] += 1;
  }else {
    $_SESSION['visit'] = 1;
  }
  
  $msg = "Вы посещали эту страницу ".  $_SESSION['visit'];
  $msg .= " в текущей сессии.";
?>
<html>
 
  <head>
 <title>Session</title>
  </head>
 
  <body>
 <?php  echo ( $msg ); ?>
 
  </body>
 
</html>