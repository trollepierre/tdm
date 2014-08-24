<?php require("w/0fonctions.php");
      require("w/1head.php");
?>

<style type="text/css">
    <?php    
    IconBackground();
   
    ?>
</style>
</head>
<body class="home page page-id-4 page-template page-template-page-home-php custom-background">
<?php require("w/2lightbox.php");?>
<?php require("w/3intro.php");?>
 <!-- PAGE 1/2  ===========================================================================-->
<?php require("w/4headerScroller.php");?>

    <div class="mobile-content">
        <div class="flexslider">
            <ul class="slides">
                <?php 
               
                
                DestinationClock();
                
                ?>

            </ul>
        </div>
    </div>
    <div class='timeline' style="">
        <div class='timeline-bg timeline-bg1 show'></div>
        <div class='timeline-controller'>
            <div class='mode-icon mode-icon1 show'></div>
        </div>

        <div class='inside'>
            <div class='clocks'>
                <div class='time'>
                    <span class='hours'>1</span>
                </div>
            </div>


            <div class='modes' id="dest" titre="index">
                <?php 
               
                
                DestinationTime();
             
                ?>
      
            </div>
        </div>
    </div>
    <div id="lesArticles"></div>
    <div class="carousel" >
        <div class="ourArticles">
            <a href="challenge.php">
                <h1> <?php echo DAOC; ?> </h1>
            </a>
        </div>
        <div class="flex-slider carousel">
            <ul class="slides">
               <?php 
               for ($i=1; $i<=2 ; $i++) { 
               ImgCarroussel(''.$i.'','challenge','challenge/'.$i.'/img0.jpg');
               }
                // for ($i=3; $i<=10 ; $i++) { 
                //     ImgCarroussel(''.$i.'','challenge','img/art.jpg');
                // }
                // ?>
                
            </ul>
        </div>
    </div>
    <div class="ourArticles">
        <h1>
            <a class="btn btn-lg btn-primary" href="https://docs.google.com/forms/d/1haLT0oeLTtqSajX0dWijHWcxbW49N886hrpj5s_EtQQ/viewform" role="button" target="_blank"> 
                <?php echo PYC; ?>  
            </a> 
             <?php echo OU; ?>  
            <a class="btn btn-lg btn-primary" href="https://docs.google.com/spreadsheets/d/1gQNjOhUrOleH3qTK2RYkR_Fit1rnkjLZvfQJMd0tMIA/edit#gid=1537311595" role="button" target="_blank">
                <?php echo VTEC; ?> 
        </a>
        </h1>
    </div>

    <div class="carousel">
        <div class="ourArticles" >
            <a href="article.php">
                <h1> <?php echo DAOA; ?></h1>
            </a>
        </div>
        <div class="flex-slider carousel">
            <ul class="slides">
                 <?php 
                 $max_for = get_nb_dir('article/');
                for ($i=1; $i<=$max_for ; $i++) { 
               ImgCarroussel(''.$i.'','article','article/'.$i.'/img0.jpg');
               }?>
                
            </ul>
        </div>
    </div>
    
        <div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->
  

    <div class="galery" id="gallery">
        <div class="inside">
            <section class="slider">
                <div class="flexslider">
                    <ul class="slides">
                      <li><img src="img/H8.jpg" /></li>
                      <li><img src="img/H9.jpg" /></li>
                     <li><img src="img/H1.jpg" /></li>
                      <li><img src="img/H2.jpg" /></li>

<?php

//1 Authentification Dropbox 
include_once("w/10dropboxAPI.php");

//2 Recuperer la liste des images

//Accéder à la fonction Client et utiliser dbx pour Dropbox
require_once "lib/dropbox-sdk/Dropbox/Client.php";
use \Dropbox as dbx;

//On cherche partout par défaut (à rectifier à l'avenir si besoin)
$basePath = "/";
//On cherche le dossier ArticleTdm
$query = ".jpg";
//Osef de $limit = null, $includeDeleted = false

/* renvoie  list of <a href="https://www.dropbox.com/developers/core/docs#metadata-details>metadata objects</a> of files that match the search query.
* Returns metadata for all files and folders whose filename matches the query string. */
// See <a href="https://www.dropbox.com/developers/core/docs#search">/search</a>.
$clientIdentifier="PHP-Example/1.0";

// creation d'un client dropbox : moi
$myCustomClient = new dbx\Client($accessToken, $clientIdentifier);

//recup des files
$returnSearchFileName=$myCustomClient->searchFileNames($basePath, $query);

//on les recup où ?
echo $returnSearchFileName;
/**/
//3 Afficher les images


$path = "/mrt6fyi0py6dipj/AADLuA9PolzpoP4XHnwsXrhsa#lh:null-2013-05-16%2018.35.36.jpg";
$url=$myCustomClient->createTemporaryDirectLink($path)[0];
echo '<li><img src="'.$url.'" /></li>';
?>
                    </ul>
                </div>
            </section>
        </div>
    </div>
        
<p> <?php 
//test affichage de search resultat
echo '<br/>SIMPLE<br/>';
echo $returnSearchFileName; 
//print_r($returnSearchFileName);
echo '<br/>[0]<br/>';
echo $returnSearchFileName[0];
echo '<br/>[0][0]<br/>';
echo $returnSearchFileName[0][0];
echo '<br/>Pompe StackOverFlow<br/>';


//print_r($returnSearchFileName);

$file = "search.json";
file_put_contents($file, json_encode($returnSearchFileName));

/*
//http://stackoverflow.com/questions/20161723/php-successfully-runs-in-cli-but-not-show-anything-in-cgi
$searchUrl = $dbxClient->createShareableLink("/Soemarko.png");

$link = "link.json";
file_put_contents($link, json_encode($searchUrl));
/**/


echo '<br/>FINI<br/><br/><br/><br/><br/><br/><br/><br/><br/>';
?></p>
        
<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>
