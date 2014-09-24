<?php 
use \Dropbox as dbx;
 
 function getId(){
  return (isset($_GET['id'])) ? $_GET['id'] : 1 ;
 }

function ImgCarroussel($id,$type,$imglink){
    echo    '<li>
                <a class="article-name" href="'.$type.'.php?id='.$id.'" title="'.$type.'">
                    <img src="'.$imglink.'" alt="Picture of one '.$type.'" /> <br/>
                    '.$type.' n°'.$id.'
                </a>
            </li>';
}

function DestinationTime(){
   require("destination/destination_img.php");
  
  foreach ($DESTINATION_TEXT as $key => $value) {
   $id=$key+1;
    echo    '<p class="mode mode'.$id.'" data-bg="'.$id.'">'.$INTRO[$key].''.$value.'
                <br />
                
                <a class="btn btn-lg btn-primary" href="destination.php?dest='.$LINK[$key].'" role="button">'.$DISCOVER.''.$value.'</a>
                <br />'.$WITHPIERREANDBEN.'  
                <!--et <a class="btn btn-lg btn-primary" href="contact.php" role="button">'.$VOUS.'</a>-->
            </p>';
          }
}

function DestinationClock(){
   require("destination/destination_img.php");

  foreach ($DESTINATION_TEXT as $key => $value) {
   $id=$key+1;
    echo    '<li>
                <div class="clock">'.$id.'</div>
                <p>
               '.$INTRO[$key].''.$value.'
                <br />
                <a class="btn btn-lg btn-primary" href="destination.php?dest='.$LINK[$key].'" role="button">'.$DISCOVER.''.$value.'</a>
                <br />'.$WITHPIERREANDBEN.'  
              <!-- et <a class="btn btn-lg btn-primary" href="contact.php" role="button">'.$VOUS.'</a>-->
                </p>
            </li>';
          }
}

function IconBackground(){
require("destination/destination_img.php");

  foreach ($LINK as $key => $value) {
   $id=$key+1;
   $color=$COLORS;
    echo '.timeline .timeline-controller .mode-icon'.$id.'{
          height: 532px;
          width: 416px;
          border: 1px solid black;
          background:url("http://www.recontact.me/img/dest_img/'.$value.'.jpg");
          background-size: auto 530px;
          background-repeat: no-repeat;
          background-position: center;
          top:0px;
          left:0px;  
          }
          .timeline .timeline-bg.timeline-bg'.$id.'{
           background:'.$color.';
          }'
        ;
  }

}

function ContentRowArticles($contentRow){
  if(isset($contentRow[2])){
  return '    <br/>        <span id="titreArticle">     '.$contentRow[0].'   </span>
           <br/>        <span id="sstitreArticle">   '.$contentRow[1].'   </span>
           <br/> <br/>  <span id="texteArticle">     '.$contentRow[2].'   </span> 
           ';
         }else{
 return '    <br/>        <span id="titreArticle">     '.$contentRow[0].'   </span>
           <br/>       
           <br/> <br/>  <span id="texteArticle">     '.$contentRow[1].'   </span> 
           ';

         }
}

function ArticlesTime($article){
  $id = getId();
  $adresse = "".$article."/".$id."/text.php";
  require($adresse);

  $nbArticles= count($contentArticles)-1; 
  for ($row=1; $row <= $nbArticles; $row++) { 
    echo    '<p class="mode mode'.$row.'" data-bg="'.$row.'">'.
         ContentRowArticles($contentArticles[$row]).'
     </p>'
              ;
  }
}

function ArticlesClock($article){
  $id = getId();
  $adresse = "".$article."/".$id."/text.php";
  require($adresse);

  $nbArticles= count($contentArticles)-1; 
  for ($row=1; $row <= $nbArticles; $row++) { 
    echo    '<div class="clock">'.$id.'</div>
                <p>'.
           ContentRowArticles($contentArticles[$row]).'
       </p>';
  }
}

function IconBackgroundA($article,$urlImg){
  $id = getId();
  $adresse = "".$article."/".$id."/text.php";
  require($adresse);

   $color = (strcmp($article, 'article')) ? '#ff0000' : '#009bd3'  ;

  $nbArticles=count($contentArticles)+1; 


 
  for ($row=0; $row <= $nbArticles; $row++) { 
    echo '.timeline .timeline-controller .mode-icon'.$row.'{
            height:600px;
            width:468px;
           background:url("'.$urlImg[$row].'");
            background-size: auto 530px;
            background-repeat: no-repeat;
            background-position: center;
            top:0px;
            left:0px;  
            }
            .timeline .timeline-bg.timeline-bg'.$row.'{
            background:'.$color.';
            }'
          ;
  }
}

/* function:  generates thumbnail */
function make_thumb($src,$dest,$desired_width) {
  /* read the source image */
  $source_image = imagecreatefromjpeg($src);
  $width = imagesx($source_image);
  $height = imagesy($source_image);
  /* find the "desired height" of this thumbnail, relative to the desired width  */
  $desired_height = floor($height*($desired_width/$width));
  /* create a new, "virtual" image */
  $virtual_image = imagecreatetruecolor($desired_width,$desired_height);
  /* copy source image at a resized size */
  imagecopyresized($virtual_image,$source_image,0,0,0,0,$desired_width,$desired_height,$width,$height);
  /* create the physical thumbnail image to its destination */
  imagejpeg($virtual_image,$dest);
}

/* function:  returns files from dir */
function get_files($images_dir,$exts = array('jpg')) {
  $files = array();
  if($handle = opendir($images_dir)) {
    while(false !== ($file = readdir($handle))) {
      $extension = strtolower(get_file_extension($file));
      if($extension && in_array($extension,$exts)) {
        $files[] = $file;
      }
    }
    closedir($handle);
  }
  return $files;
}

/* function:  returns a file's extension */
function get_file_extension($file_name) {
  return substr(strrchr($file_name,'.'),1);
}

/* function:  returns nb of dir from dir */
function get_nb_dir($images_dir) {
 $count_file = -2;
  if($handle = opendir($images_dir)) {
    while(false !== ($file = readdir($handle))) {
      $count_file ++;
    }
    closedir($handle);
  }
  return $count_file ;
}

/** Dropbox API
*/
function getImgInPath($basePath,$query=".jpg") {
//1 Authentification Dropbox 
include_once("lib/dropboxAPI.php");

//2 Recuperer la liste des images
//Accéder à la fonction Client et utiliser dbx pour Dropbox
require_once "lib/dropbox-sdk/Dropbox/Client.php";

// creation d'un client dropbox : moi
$myCustomClient = new dbx\Client($accessToken, $clientIdentifier);

//recup des files
$returnSearchFileName=$myCustomClient->searchFileNames($basePath, $query);

//on récup le path de chaque file récupéré
// et on en fait une url publique;
foreach ($returnSearchFileName as $id => $image) {
  foreach ($image as $key => $value) {
        if($key=='path'){
          if(substr($value,-9,3)=='img'){
            $position= intval(substr($value, -6,2));
            $url[0][$position]=$myCustomClient->createTemporaryDirectLink($value)[0];
          }else if(substr($value,-9,4)== "/img"){
            $position= intval(substr($value, -5,1));
            $url[0][$position]=$myCustomClient->createTemporaryDirectLink($value)[0];
          }
          else{          
          $url[1][]=$myCustomClient->createTemporaryDirectLink($value)[0];
          }
        }
    }
}
/*$zero = 0;
foreach ($img as $key => $value) {
  $resultat[] = $img[$zero];  
  $zero++;
}

foreach ($url as $key => $value) {
 $resultat[] = $value;  
}
*/
return $url;
}
?>