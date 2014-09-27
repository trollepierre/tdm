<?php

chdir("../..");
use \Dropbox as dbx;
$file = "w/dropboxURL.php";

/*
* récupère les img et gallery 
*/
// creation d'un client dropbox 
include("lib/dropboxAPI.php");
$myCustomClient = new dbx\Client($accessToken, $clientIdentifier);

// global $urlDropbox;
include($file);
$id =(isset($_GET['id'])) ? $_GET['id'] : count($urlDropbox) ;

$basePath="/Chargements appareil photo/ArticleTdm/".$id."";
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
            $url[$position]=$myCustomClient->createTemporaryDirectLink($value)[0];
          }else if(substr($value,-9,4)== "/img"){
            $position= intval(substr($value, -5,1));
            $url[$position]=$myCustomClient->createTemporaryDirectLink($value)[0];
          }
          else{
           $urlGallery[]=$myCustomClient->createTemporaryDirectLink($value)[0];          
          }
        }
    }
}

$urlEcrite="[";

foreach ($url as $key => $value) {
  $urlEcrite .= "'".$key."' => '".$value."',";
}
$urlEcrite = substr($urlEcrite, 0,-1);
$urlEcrite .= "]";


$urlGalEcrite="[";
foreach ($urlGallery as $key => $value) {
  $urlGalEcrite .= "'".$key."' => '".$value."',";
}
$urlGalecrite = substr($urlGalEcrite, 0,-1);
$urlGalEcrite .= "]";


$line= "'".$id."' => ['updated'=>TRUE,'img' => ".$urlEcrite.",'gal' => ".$urlGalEcrite."],";


$data = file_get_contents($file); //read the file


$convert = explode("\n", $data); //create array separate by new line
$convert[$id] = $line;
$newData='';
for ($i=0;$i<count($convert);$i++)  
{
    $newData .= ''.$convert[$i]."\n"; //write value by index
}

file_put_contents($file, $newData);

 echo json_encode($urlGallery);

// echo $newData;

?>
