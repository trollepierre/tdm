<?php
try{
  $resu = '';
  $pdm = '';
  include("lib/alwaysdata.php");
  $bdd = new PDO('mysql:host=mysql1.alwaysdata.com;dbname=recontact_world_articles', $resu, $pdm);
}catch (Exception $e){
  die('Erreur : ' . $e->getMessage());
}
?>
