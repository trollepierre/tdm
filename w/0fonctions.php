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
  $convert = explode("/", $imglink); 
  $convert=$convert[count($convert)-1];
  $nomImage = substr($convert, 0, -5);
  $imglink2 = $dropbox_link . '#lh:null-'.$nomImage;
  if (substr($imglink, 0,15) === "http://youtu.be" ) {
    $imglink = "http://www.recontact.me/img/btn-play.png";
    $imglink2 = $imglink;
  }
  echo    '<li>
                <a class="article-name" href="'.$imglink2.'" target="_blank">
                    <img src="'.$imglink.'" alt="One Picture" /> <br/>
                </a>
            </li>';     
}

function RemplirWindowImage($article){
  include("lib/creerBdd.php");
  global $id;
  $reponse = $bdd->query('SELECT img_link FROM '.$article.'_contenu WHERE '.$article.'_uid = '.$id.' ORDER BY position');
  // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
  $images = array();
  echo 'window.images = [' ;
  while ($donnees = $reponse->fetch())
    {
      echo '"'.htmlspecialchars($donnees['img_link']).'",';
    }
    echo "];";
    $reponse->closeCursor();
}

function DestinationTime(){
   require("destination/destination_img.php");
  foreach ($DESTINATION_TEXT as $key => $value) {
   $id2=$key+1;
    echo    '<p class="mode mode'.$id2.'" data-bg="'.$id2.'">'.$INTRO[$key].'
                <br />
                <a class="btn btn-lg btn-danger" href="destination.php?dest='.$LINK[$key].'" role="button">'.$value.'</a>
                
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


// Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
while ($donnees = $reponse->fetch())
  {
    echo '#imagesNico{
            max-height:100%;
            margin:auto;
            // padding-top:100px;
            vertical-align:center;
            }
          .mode-icon{
             vertical-align : center;
          }
            .timeline .timeline-bg.timeline-bg'.htmlspecialchars($donnees['position']).'{
            background:'.$color.';
            }'
          ;
  }
$reponse->closeCursor();
}
?>
