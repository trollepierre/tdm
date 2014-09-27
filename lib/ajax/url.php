<?php

function getImgInPath($basePath,$query=".jpg") {

// $id=getId();
	global $id;
	$id=1;
$basePath="/Chargements appareil photo/ArticleTdm/".$id."";

// creation d'un client dropbox 
include("lib/dropboxAPI.php");
$myCustomClient = new dbx\Client($accessToken, $clientIdentifier);

//recup des files
$returnSearchFileName=$myCustomClient->searchFileNames($basePath, $query);

//on récup le path de chaque file récupéré 
// et on en fait une url publique;
foreach ($returnSearchFileName as $idFake => $image) {
  foreach ($image as $key => $value) {
        if($key=='path'){
          /*if(substr($value,-9,3)=='img'){}else if(substr($value,-9,4)== "/img"){        
          }else{ /**/         
          $url[]=$myCustomClient->createTemporaryDirectLink($value)[0];
          /*}/**/
        }
    }
}
return $url;
}

echo json_encode($url);
?>