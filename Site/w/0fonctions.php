<?php 
use \Dropbox as dbx;
 
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
          background:url("destination/img/'.$value.'.jpg");
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

function ArticlesTime($article){
  if (isset($_GET['id']))  {
    $id=$_GET['id'];

  } else { 
    $id=1;
  } 
  $adresse = "".$article."/".$id."/text.php";
  require($adresse);

  $nbArticles= count($contentArticles)-1; 
  for ($row=1; $row <= $nbArticles; $row++) { 
    echo    '<p class="mode mode'.$row.'" data-bg="'.$row.'">
           <br/>        <span id="titreArticle">     '.$contentArticles[$row][0].'   </span>
           <br/>        <span id="sstitreArticle">   '.$contentArticles[$row][1].'   </span>
           <br/> <br/>  <span id="texteArticle">     '.$contentArticles[$row][2].'   </span> 
     </p>'
              ;
  }
}

function ArticlesClock($article){
  if (isset($_GET['id']))  {
    $id=$_GET['id'];

  } else { 
    $id=1;
  } 
  $adresse = "".$article."/".$id."/text.php";
  require($adresse);

  $nbArticles= count($contentArticles)-1; 
  for ($row=1; $row <= $nbArticles; $row++) { 
    echo    '<div class="clock">'.$id.'</div>
                <p>
          <br/>        <span id="titreArticle">     '.$contentArticles[$row][0].'   </span>
           <br/>        <span id="sstitreArticle">   '.$contentArticles[$row][1].'   </span>
           <br/> <br/>  <span id="texteArticle">     '.$contentArticles[$row][2].'   </span> 
       </p>'
              ;
  }
  
}

function IconBackgroundA($article){

// if (isset($_GET['id']))  {
//    $id=$_GET['id'];
// } else { 
//     $id=1;
// } 
$id = (isset($_GET['id'])) ? $_GET['id'] : 1 ;
// $majeur = ($age >= 18) ? true : false;

  $adresse = "".$article."/".$id."/text.php";
  require($adresse);

  // if (strcmp($article, 'article') == 0) {
  // $color = '#009bd3' ;
  // }else {
  // $color =  '#ff0000';
  // }
   $color = (strcmp($article, 'article')) ? '#ff0000' : '#009bd3'  ;

  $nbArticles=count($contentArticles)+1; 
  for ($row=0; $row <= $nbArticles; $row++) { 
      echo '.timeline .timeline-controller .mode-icon'.$row.'{
            height:600px;
            width:468px;
           background:url("'.$article.'/'.$id.'/img'.$row.'.jpg");
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
/* if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            echo "fichier : $file : type : " . filetype($dir . $file) . "\n";
        }
        closedir($dh);
    }
}
}*/
 $count_file = -2;
  if($handle = opendir($images_dir)) {
    while(false !== ($file = readdir($handle))) {
      $count_file ++;
      // echo "filename: $file : filetype: " . filetype($dir . $file) . "\n";
      // $extension = strtolower(get_file_extension($file));
      // if($extension && in_array($extension,$exts)) {
      //   $files[] = $file;
      // }
    }
    closedir($handle);
  }
  return $count_file ;
}


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
          $url[]=$myCustomClient->createTemporaryDirectLink($value)[0];
        }
    }
}

return $url;
}
?>