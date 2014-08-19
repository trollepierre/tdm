<?php 
function ImgCarroussel($id,$type,$imglink){
    echo    '<li style="width: 50px; float: left; display: block;">
                <a href="'.$type.'.php?id='.$id.'" title="'.$type.'">
                    <img src="'.$imglink.'" alt="Picture of one '.$type.'" />
                </a>
            </li>';
}

function DestinationTime(){
   require("destination/destination_img.php");
  
  foreach ($DESTINATION_TEXT as $key => $value) {
   $id=$key+1;
    echo    '<p class="mode mode'.$id.'" data-bg="'.$id.'">'.$value.'
                <br />
                <a class="btn btn-lg btn-primary" href="destination.php?dest='.$LINK[$key].'" role="button">'.$DISCOVER.''.$value.'</a>
                <br />'.$WITHPIERREANDBEN.'
            </p>';
          }
}

function DestinationClock(){
   require("destination/destination_img.php");

  foreach ($DESTINATION_TEXT as $key => $value) {
   $id=$key+1;
    echo    '<li>
                <div class="clock">'.$id.'</div>
                <p>'.$id.'
                    <br />
                    <a class="btn btn-lg btn-primary" href="destination.php?country='.$LINK[$key].'" role="button">'.$DISCOVER.''.$value.'</a> 
                    <br />'.$WITHPIERREANDBEN.'
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
          height:600px;
          width:468px;
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
    echo    '<p class="mode mode'.$row.'" data-bg="'.$row.'"><span id="date"> Le 21/07/2014 </span>
           <br/>        <span id="titreArticle">     '.$contentArticles[$row][0].'   </span>
           <br/> <br/>  <span id="texteArticle">     '.$contentArticles[$row][1].'   </span> 
     </p>'
              ;
  }
}

function ArticlesClock(){
   require("destination/destination_img.php");

  foreach ($DESTINATION_TEXT as $key => $value) {
   $id=$key+1;
    echo    '<li>
                <div class="clock">'.$id.'</div>
                <p>'.$id.'Voici notre 1er article
                    <br />
                Nous sommes prêts pour un nouveau départ ! C est parti ! 
                <br/>
                Si vous voulez, on peut toujours faire ça !
         </p>
            </li>';
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

?>