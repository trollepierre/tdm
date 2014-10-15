<?php

chdir("../..");
use \Dropbox as dbx;

    if (isset($_GET['id'])) {
        $id=htmlspecialchars($_GET['id']);
    }else{
        include("lib/creerBdd.php");
        $reponse = $bdd->query('SELECT count(*) AS count FROM challenge');
        while ($donnees = $reponse->fetch()){
            $id= htmlspecialchars($donnees['count']) ;
        }
        $reponse->closeCursor();
    }
$challengeUid=$id;

include("lib/creerBdd.php");
$reponse = $bdd->query('SELECT challenge_uid FROM challenge WHERE challenge_uid='.$id);
while ($donnees = $reponse->fetch()){
    $bdd->exec('DELETE FROM challenge_galerie WHERE challenge_uid='.$id);
    $bdd->exec('DELETE FROM challenge_contenu WHERE challenge_uid='.$id);
    $bdd->exec('DELETE FROM challenge WHERE challenge_uid='.$id);
    }
$reponse->closeCursor(); // Termine le traitement de la requête

$req = $bdd->prepare('INSERT INTO challenge(challenge_uid, nom, name, img_link, dropbox_link) VALUES(:challengeUid, :nom, :name, :img0, :dropbox_link)');
$reqG = $bdd->prepare('INSERT INTO challenge_galerie(challenge_uid, img_link) VALUES(:challengeUid, :urlGallery)');
$reqI = $bdd->prepare('INSERT INTO challenge_contenu(challenge_uid, position, titre, soustitre, paragraphe, title, subtitle, paragraph, img_link) VALUES(:challengeUid, :position, :titre, :soustitre , :paragraphe, :title, :subtitle , :paragraph, :img)');

/*
* récupère les img et gallery 
*/
// creation d'un client dropbox 
include("lib/dropboxAPI.php");
$myCustomClient = new dbx\Client($accessToken, $clientIdentifier);


$basePath="/Chargements appareil photo/ChallengeTdm/".$id."";
//Dropbox_link
$dropbox_link=$myCustomClient->createShareableLink($basePath);

//Francais
$file="lib/fr.txt";
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
$file="lib/en.txt";
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
$query = "mp4";
$returnSearchFileName2=$myCustomClient->searchFileNames($basePath, $query);
$returnSearchFileName= array_merge($returnSearchFileName1,$returnSearchFileName2);
// print_r($returnSearchFileName2);

//on récup le path de chaque file récupéré
// et on en fait une url publique;
$urlGallery = array( );
$url = array( );

foreach ($returnSearchFileName as $idFake => $image) {
  $value = $image['path'];
  if(substr($value,-9,3)=='img'){
    $position= intval(substr($value, -6,2));
    require("lib/ajax/convert.php");
    $img=$myCustomClient->createShareableLink($value);
    $img[strlen($img)-1]='1';
    $reqI->execute(array( 'challengeUid' => $challengeUid, 'position' => $position,'titre' => $titre,'soustitre' => $soustitre, 'paragraphe' => $paragraphe, 'title' => $title,'subtitle' => $subtitle, 'paragraph' => $paragraph, 'img' => $img));
   }else if(substr($value,-9,4)== "/img"){
    if(substr($value, -5)==0) {
      $img0 = $myCustomClient->createShareableLink($value);
      $img0[strlen($img0)-1]='1';
      $req->execute(array( 'challengeUid' => $challengeUid, 'nom' => $nom, 'name' => $name, 'img0' => $img0, 'dropbox_link' => $dropbox_link));
  }else{
    $position= intval(substr($value, -5,1));
    require("lib/ajax/convert.php");
    $img=$myCustomClient->createShareableLink($value);
    $img[strlen($img)-1]='1';
    $reqI->execute(array( 'challengeUid' => $challengeUid, 'position' => $position,'titre' => $titre,'soustitre' => $soustitre, 'paragraphe' => $paragraphe, 'title' => $title,'subtitle' => $subtitle, 'paragraph' => $paragraph, 'img' => $img));
    }
  }
  else{
    $urlGallery= $myCustomClient->createShareableLink($value);
    $urlGallery[strlen($urlGallery)-1]='1';
    $reqG->execute(array( 'challengeUid' => $challengeUid, 'urlGallery' => $urlGallery));
  }
}
$reponse = $bdd->query('SELECT count(*) AS count FROM challenge WHERE challenge_uid='.$id);
while ($donnees = $reponse->fetch()){
    $isImg= htmlspecialchars($donnees['count']) ;
    if ($isImg==0) {
      $img0 = 'http://www.recontact.me/img/lost.jpg';
      $req->execute(array( 'challengeUid' => $challengeUid, 'nom' => $nom, 'name' => $name, 'img0' => $img0, 'dropbox_link' => $dropbox_link));
    }
}
$reponse->closeCursor();
$reponse = $bdd->query('SELECT count(*) AS count FROM challenge_contenu WHERE challenge_uid='.$id);
$out= TRUE;
while ($donnees = $reponse->fetch() AND $out){
  $isImgs= htmlspecialchars($donnees['count']) ;
  $max=max(count($convert),count($convert_en));
  $calcul = 3 * $nbImgs +1 ;
    if ($calcul< $max) {
    $reponse->closeCursor();
    for ($position=1; $position < $max; $position++) { 
      $reponse = $bdd->query('SELECT count(*) AS count FROM challenge_contenu WHERE challenge_uid='.$id.' AND position='.$position);
      if (htmlspecialchars($donnees['count'])== 0) {
        require("lib/ajax/verifconvert.php");
        $img = 'http://www.recontact.me/img/lost.jpg';
        $reqI->execute(array( 'challengeUid' => $challengeUid, 'position' => $position,'titre' => $titre,'soustitre' => $soustitre, 'paragraphe' => $paragraphe, 'title' => $title,'subtitle' => $subtitle, 'paragraph' => $paragraph, 'img' => $img));
      }
    }
    $out=false;
  }else{
    $out=false;
  }
}
$reponse->closeCursor();

$req->closeCursor(); 
$reqI->closeCursor(); 
$reqG->closeCursor(); 
echo 'Synchronisation OK !';
?>