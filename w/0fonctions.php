<?php 
/**
* affiche les images du carroussel. Donne moi un lien.
*/
function ImgCarroussel($name,$idArticles,$type,$imglink){
    echo    '<li>
                <a class="article-name" href="'.$type.'.php?id='.$idArticles.'" title="'.$type.'">
                    <img src="'.$imglink.'" alt="Picture of one '.$type.'" /> <br/>
                    '.$name.'
                </a>
            </li>';
}

function Carroussel($dropbox_link, $imglink){
  $convert = explode("/", $imglink); //create array separate by #
  $convert=$convert[count($convert)-1];
  $nomImage = substr($convert, 0, -5);
  $imglink2 = $dropbox_link . '#lh:null-'.$nomImage;
    echo    '<li>
                <a class="article-name" href="'.$imglink2.'">
                    <img src="'.$imglink.'" alt="One Picture" /> <br/>
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
          /*background:url("http://www.recontact.me/img/dest_img/'.$value.'.jpg");*/
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

/*
* gère le text de la timeline des articles
*/
function ArticlesTime($article) {
include("lib/creerBdd.php");
global $id;
global $lang;
$titre = ($lang==='fr') ? 'titre' : 'title' ;
$soustitre = ($lang==='fr') ? 'soustitre' : 'subtitle' ;
$paragraphe = ($lang==='fr') ? 'paragraphe' : 'paragraph' ;
$reponse = $bdd->query('SELECT position, titre, soustitre, paragraphe, title, subtitle, paragraph FROM '.$article.'_contenu WHERE '.$article.'_uid = '.$id.' ORDER BY position');
while ($donnees = $reponse->fetch())
  {
    echo ' <p class="mode mode'.htmlspecialchars($donnees['position']).'" data-bg="'.htmlspecialchars($donnees['position']).'">
           <br/>        <span class="titreArticle">     '.htmlspecialchars($donnees[$titre]).'      </span>
           <br/>        <span class="sstitreArticle">   '.htmlspecialchars($donnees[$soustitre]).'  </span>
           <br/> <br/>  <span style="display:block; text-align:justify;  font-size: 20px; font-weight: normal;font-family: inherit;">     '.slashN(htmlspecialchars($donnees[$paragraphe])).' </span> 
           </p>';
    }
    $reponse->closeCursor();
}

function slashN($paragraphe){ //Séparateur de # en <br/>
  $resultat="";
  $convert = explode("#", $paragraphe); //create array separate by #
  foreach ($convert as $key => $value) {
    $resultat .= $value;
    $resultat .= '<br/><br/>';
  }
  return $resultat;
}

/*
* gère le text de la clock [responsive] des articles
*/
function ArticlesClock($article){
include("lib/creerBdd.php");
global $id;
global $lang;
$titre = ($lang==='fr') ? 'titre' : 'title' ;
$soustitre = ($lang==='fr') ? 'soustitre' : 'subtitle' ;
$paragraphe = ($lang==='fr') ? 'paragraphe' : 'paragraph' ;
$reponse = $bdd->query('SELECT position, titre, soustitre, paragraphe, title, subtitle, paragraph FROM '.$article.'_contenu WHERE '.$article.'_uid = '.$id.' ORDER BY position');
while ($donnees = $reponse->fetch())
  {  
    echo    ' <div class="clock">'.htmlspecialchars($donnees['position']).'</div><p>
              <br/>        <span class="titreArticle">     '.htmlspecialchars($donnees[$titre]).'      </span>
              <br/>        <span class="sstitreArticle">   '.htmlspecialchars($donnees[$soustitre]).'  </span> 
              <br/> <br/>  <span class="texteArticle">     '.slashN(htmlspecialchars($donnees[$paragraphe])).' </span> 
              </p>';
  }
  $reponse->closeCursor();
}

/*
* affiche les img de gauche des articles
*/
function IconBackgroundA($article){
include("lib/creerBdd.php");
global $id;
$reponse = $bdd->query('SELECT position, img_link FROM '.$article.'_contenu WHERE '.$article.'_uid = '.$id.' ORDER BY position');

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

// /*/* function:  generates thumbnail */
// function make_thumb($src,$dest,$desired_width) {
//   /* read the source image */
//   $source_image = imagecreatefromjpeg($src);
//   $width = imagesx($source_image);
//   $height = imagesy($source_image);
//   /* find the "desired height" of this thumbnail, relative to the desired width  */
//   $desired_height = floor($height*($desired_width/$width));
//   /* create a new, "virtual" image */
//   $virtual_image = imagecreatetruecolor($desired_width,$desired_height);
//   /* copy source image at a resized size */
//   imagecopyresized($virtual_image,$source_image,0,0,0,0,$desired_width,$desired_height,$width,$height);
//   /* create the physical thumbnail image to its destination */
//   imagejpeg($virtual_image,$dest);
// }

//  function:  returns files from dir 
// function get_files($images_dir,$exts = array('jpg')) {
//   $files = array();
//   if($handle = opendir($images_dir)) {
//     while(false !== ($file = readdir($handle))) {
//       $extension = strtolower(get_file_extension($file));
//       if($extension && in_array($extension,$exts)) {
//         $files[] = $file;
//       }
//     }
//     closedir($handle);
//   }
//   return $files;
// }

// /* function:  returns a file's extension */
// function get_file_extension($file_name) {
//   return substr(strrchr($file_name,'.'),1);
// }

// /* function:  returns nb of dir from dir */
// function get_nb_dir($images_dir) {
//  $count_file = -2;
//   if($handle = opendir($images_dir)) {
//     while(false !== ($file = readdir($handle))) {
//       $count_file ++;
//     }
//     closedir($handle);
//   }
//   return $count_file ;
// }
//**/
?>
