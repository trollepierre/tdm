<?php

chdir("../..");
use \Dropbox as dbx;

    if (isset($_GET['id'])) {
        $id=$_GET['id'];
    }else{
        include("lib/creerBdd.php");
        $reponse = $bdd->query('SELECT count(*) AS count FROM article');
        while ($donnees = $reponse->fetch()){
            $id= $donnees['count'] ;
        }
        $reponse->closeCursor();
    }
$articleUid=$id;

include("lib/creerBdd.php");
$reponse = $bdd->query('SELECT article_uid FROM article WHERE article_uid='.$id.' ORDER BY id');
while ($donnees = $reponse->fetch()){
    $bdd->exec('DELETE FROM article_galerie WHERE article_uid='.$id.'  ');
    $bdd->exec('DELETE FROM article_contenu WHERE article_uid='.$id.'  ');
    $bdd->exec('DELETE FROM article WHERE article_uid='.$id.'  ');
    }
$reponse->closeCursor(); // Termine le traitement de la requête

$req = $bdd->prepare('INSERT INTO article(article_uid,name, img_link) VALUES(:articleUid, :name, :img0)');
$reqG = $bdd->prepare('INSERT INTO article_galerie(article_uid, img_link) VALUES(:articleUid, :urlGallery)');
$reqI = $bdd->prepare('INSERT INTO article_contenu(article_uid, position, titre, soustitre, paragraphe, img_link) VALUES(:articleUid, :position, :titre, :soustitre , :paragraphe, :img)');

/*
* récupère les img et gallery 
*/
// creation d'un client dropbox 
include("lib/dropboxAPI.php");
$myCustomClient = new dbx\Client($accessToken, $clientIdentifier);


$basePath="/Chargements appareil photo/ArticleTdm/".$id."";
$query = "ext.php";
//recup des files
$returnSearchFileName=$myCustomClient->searchFileNames($basePath, $query);
foreach ($returnSearchFileName as $idFake => $texte) {
  foreach ($texte as $key => $value) {
    if($key=='path'){
      $file=$myCustomClient->createTemporaryDirectLink($value)[0];
    }
  }
}
// echo $file;
$data = file_get_contents($file); 
$convert = explode("*", $data); //create array separate by *
$name = $convert[0];
$query = "jpg";

//recup des files
$returnSearchFileName=$myCustomClient->searchFileNames($basePath, $query);

//on récup le path de chaque file récupéré
// et on en fait une url publique;
$urlGallery = array( );
$url = array( );
foreach ($returnSearchFileName as $idFake => $image) {
  foreach ($image as $key => $value) {
        if($key=='path'){
          if(substr($value,-9,3)=='img'){
            $position= intval(substr($value, -6,2));
            $titre=$convert[3*$position-2];
            $soustitre=$convert[3*$position-1];
            $paragraphe=$convert[3*$position];
            $img=$myCustomClient->createShareableLink($value);
            $img[strlen($img)-1]='1';
            $reqI->execute(array( 'articleUid' => $articleUid, 'position' => $position,'titre' => $titre,'soustitre' => $soustitre, 'paragraphe' => $paragraphe, 'img' => $img));
            // $url[$position]=$myCustomClient->createShareableLink($value);
           }else if(substr($value,-9,4)== "/img"){
            if(substr($value, -5)==0) {
              $img0 = $myCustomClient->createShareableLink($value);
              $img0[strlen($img0)-1]='1';
              $req->execute(array( 'articleUid' => $articleUid, 'name' => $name, 'img0' => $img0));
          }else{
            $position= intval(substr($value, -5,1));
            $titre=$convert[3*$position-2];
            $soustitre=$convert[3*$position-1];
            $paragraphe=$convert[3*$position];
            $img=$myCustomClient->createShareableLink($value);
            $img[strlen($img)-1]='1';
            $reqI->execute(array( 'articleUid' => $articleUid, 'position' => $position,'titre' => $titre,'soustitre' => $soustitre, 'paragraphe' => $paragraphe, 'img' => $img));
            // $url[$position]=$myCustomClient->createShareableLink($value);
            
            }
          }
          else{
             $urlGallery= $myCustomClient->createShareableLink($value);
           $urlGallery[strlen($urlGallery)-1]='1';
           $reqG->execute(array( 'articleUid' => $articleUid, 'urlGallery' => $urlGallery));
           // $urlGallery[]=$myCustomClient->createShareableLink($value);          
          }
        }
    }
}
$req->closeCursor(); 
$reqI->closeCursor(); 
$reqG->closeCursor(); 
echo 'Synchronisation OK !';
?>