<?php 
require("w/dropboxURL.php");
use \Dropbox as dbx;
 
/**
* return l'id dans l'url
*/
function getId(){
  global $urlDropbox;
  $id =(isset($_GET['id'])) ? $_GET['id'] : count($urlDropbox) ;
  return  min([$id, count($urlDropbox)]);
}

$id=getId();

/**
* affiche les images du carroussel. Donne moi un lien.
*/
function ImgCarroussel($idArticles,$type,$imglink){
    echo    '<li>
                <a class="article-name" href="'.$type.'.php?id='.$idArticles.'" title="'.$type.'">
                    <img src="'.$imglink.'" alt="Picture of one '.$type.'" /> <br/>
                    '.$type.' n°'.$idArticles.'
                </a>
            </li>';
}

function DestinationTime(){
   require("destination/destination_img.php");
  
  foreach ($DESTINATION_TEXT as $key => $value) {
   $id2=$key+1;
    echo    '<p class="mode mode'.$id2.'" data-bg="'.$id2.'">'.$INTRO[$key].''.$value.'
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
   $id2=$key+1;
    echo    '<li>
                <div class="clock">'.$id2.'</div>
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
   $id2=$key+1;
   $color=$COLORS;
    echo '.timeline .timeline-controller .mode-icon'.$id2.'{
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
          .timeline .timeline-bg.timeline-bg'.$id2.'{
           background:'.$color.';
          }'
        ;
  }

}

/**
*mettre en forme le contenu de l'article écrit sous forme d'array
*/
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

/*
* récupère le text.php dropbox et renvoi l'adresse
*/
function RecupAdresse($article){


try
{
$resu = '';
$pdm = '';
include("lib/alwaysdata.php");
$bdd = new PDO('mysql:host=mysql1.alwaysdata.com;dbname=recontact_world_articles', $resu, $pdm);
// $reponse = $bdd->query('Tapez votre requête SQL ici');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}

 global $id;
 // $id = getId();
  include("lib/dropboxAPI.php");
  $client = new dbx\ Client($accessToken, $clientIdentifier);
    $adresse = "w/text.php";
    $fd = fopen($adresse, "w");
    $metadata = $client->getFile("/Chargements appareil photo/ArticleTdm/".$id."/text.php", $fd);
    fclose($fd);
    return $adresse;
}

/*
* gère le text de la timeline des articles
*/
function ArticlesTime($article) {
    require("w/text.php");
    $nbArticles = count($contentArticles) - 1;
    for ($row = 1; $row <= $nbArticles; $row++) {
        echo '<p class="mode mode'.$row.'" data-bg="'.$row.'">'.ContentRowArticles($contentArticles[$row]).'</p>';
    }
}

/*
* gère le text de la clock [responsive] des articles
*/
function ArticlesClock($article){
   require("w/text.php");

  $nbArticles= count($contentArticles)-1; 
  for ($row=1; $row <= $nbArticles; $row++) { 
    echo    '<div class="clock">'.$id.'</div><p>'.ContentRowArticles($contentArticles[$row]).'</p>';
  }
}

/*
* affiche les img de gauche des articles
*/
function IconBackgroundA($article){
try{
  $resu = '';
  $pdm = '';
  include("lib/alwaysdata.php");
  $bdd = new PDO('mysql:host=mysql1.alwaysdata.com;dbname=recontact_world_articles', $resu, $pdm);
}catch (Exception $e){
  die('Erreur : ' . $e->getMessage());
}
global $id;
$reponse = $bdd->query('SELECT position, img_link FROM article_contenu WHERE article_uid = '.$id.' ORDER BY position');

$color = (strcmp($article, 'article')) ? '#ff0000' : '#009bd3'  ;
$nbArticles=count($contentArticles)+1; 

// Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
while ($donnees = $reponse->fetch())
  {
    echo '.timeline .timeline-controller .mode-icon'. htmlspecialchars($donnees['position']).'{
            height:600px;
            width:468px;
           background:url("'.htmlspecialchars($donnees['img_link']).'");
            background-size: auto 530px;
            background-repeat: no-repeat;
            background-position: center;
            top:0px;
            left:0px;  
            }
            .timeline .timeline-bg.timeline-bg'.htmlspecialchars($donnees['position']).'{
            background:'.$color.';
            }'
          ;
  }
$reponse->closeCursor();
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

?>
