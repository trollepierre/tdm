<?php

chdir("../..");
use \Dropbox as dbx;

    if (isset($_GET['id'])) {
        $id=htmlspecialchars($_GET['id']);
    }else{
        include("lib/creerBdd.php");
        $reponse = $bdd->query('SELECT count(*) AS count FROM article');
        while ($donnees = $reponse->fetch()){
            $id= htmlspecialchars($donnees['count']) ;
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

$req = $bdd->prepare('INSERT INTO article(article_uid, nom, name, img_link, dropbox_link) VALUES(:articleUid, :nom, :name, :img0, :dropbox_link)');
$reqG = $bdd->prepare('INSERT INTO article_galerie(article_uid, img_link) VALUES(:articleUid, :urlGallery)');
$reqI = $bdd->prepare('INSERT INTO article_contenu(article_uid, position, titre, soustitre, paragraphe, title, subtitle, paragraph, img_link) VALUES(:articleUid, :position, :titre, :soustitre , :paragraphe, :title, :subtitle , :paragraph, :img)');

/*
* récupère les img et gallery 
*/
// creation d'un client dropbox 
include("lib/dropboxAPI.php");
$myCustomClient = new dbx\Client($accessToken, $clientIdentifier);


$basePath="/Chargements appareil photo/ArticleTdm/".$id."";
//Dropbox_link
$dropbox_link=$myCustomClient->createShareableLink($basePath);

//Francais
$query = "r.php";
$returnSearchFileName=$myCustomClient->searchFileNames($basePath, $query);
foreach ($returnSearchFileName as $idFake => $texte) {
  foreach ($texte as $key => $value) {
    if($key=='path'){
      $file=$myCustomClient->createTemporaryDirectLink($value)[0];
    }
  }
}
$data = file_get_contents($file); 
$convert = explode("*", $data); //create array separate by *
$nom = $convert[0];

//English
$query = "n.php";
$returnSearchFileName=$myCustomClient->searchFileNames($basePath, $query);
foreach ($returnSearchFileName as $idFake => $texte) {
  foreach ($texte as $key => $value) {
    if($key=='path'){
      $file=$myCustomClient->createTemporaryDirectLink($value)[0];
    }
  }
}
$data = file_get_contents($file); 
$convert_en = explode("*", $data); //create array separate by *
$name = $convert_en[0];

$query = "jpg";
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
            $title=$convert_en[3*$position-2];
            $subtitle=$convert_en[3*$position-1];
            $paragraph=$convert_en[3*$position];
            $img=$myCustomClient->createShareableLink($value);
            $img[strlen($img)-1]='1';
            $reqI->execute(array( 'articleUid' => $articleUid, 'position' => $position,'titre' => $titre,'soustitre' => $soustitre, 'paragraphe' => $paragraphe, 'title' => $title,'subtitle' => $subtitle, 'paragraph' => $paragraph, 'img' => $img));
           }else if(substr($value,-9,4)== "/img"){
            if(substr($value, -5)==0) {
              $img0 = $myCustomClient->createShareableLink($value);
              $img0[strlen($img0)-1]='1';
              $req->execute(array( 'articleUid' => $articleUid, 'nom' => $nom, 'name' => $name, 'img0' => $img0, 'dropbox_link' => $dropbox_link));
          }else{
            $position= intval(substr($value, -5,1));
            $titre=$convert[3*$position-2];
            $soustitre=$convert[3*$position-1];
            $paragraphe=$convert[3*$position];
            $title=$convert_en[3*$position-2];
            $subtitle=$convert_en[3*$position-1];
            $paragraph=$convert_en[3*$position];
            $img=$myCustomClient->createShareableLink($value);
            $img[strlen($img)-1]='1';
            $reqI->execute(array( 'articleUid' => $articleUid, 'position' => $position,'titre' => $titre,'soustitre' => $soustitre, 'paragraphe' => $paragraphe, 'title' => $title,'subtitle' => $subtitle, 'paragraph' => $paragraph, 'img' => $img));
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