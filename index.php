<?php require("w/0fonctions.php");
?>
<?php
require("w/1head.php");
?>
<script type="text/javascript">
<?php 
include("lib/creerBdd.php");
global $id;
$reponse = $bdd->query('SELECT img_link FROM article ORDER BY article_uid DESC');
  // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
$images = array();
echo 'window.images = [' ;
$compteur=1;
while ($donnees = $reponse->fetch())
{
 $compteur++;
 echo '"'.htmlspecialchars($donnees['img_link']).'",';
}
echo "];";
$reponse->closeCursor();
?>
</script>

<style type="text/css">
<?php // IconBackground(); ?>
.ns-effect-cornerexpand .icon{
  padding-top: 13px;
}
</style>
</head>
<body class="home page page-id-4 page-template page-template-page-home-php custom-background">
  <?php 
  require("w/2lightbox.php");
  require("w/3intro.php");

#  PAGE 1/2  ===========================================================================-->
  require("w/4headerScroller.php");
  require("w/5notification.php");
  ?>

  <div class="mobile-content">
    <div class="flexslider">
      <ul class="slides">
        <?php 
               // DestinationClock();
        ?>
      </ul>
    </div>
  </div>
  <div class='timeline' style="">
    <div class='timeline-bg timeline-bg1 show'></div>
    <div class='timeline-controller'>
      <div class='mode-icon mode-icon1 show'>
       <?php 
       include("lib/creerBdd.php");
       global $id;
       $reponse = $bdd->query('SELECT img_link FROM article WHERE article_uid = '.$compteur);
    // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
       
       while ($donnees = $reponse->fetch() ){
        echo '<img class="centreImgTime" src="'.htmlspecialchars($donnees['img_link']).'">';
        
      }
      $reponse->closeCursor();
      ?>
    </div>
  </div>

  <div class='inside'>
    <div class='clocks'>
      <div class='time'>
        <span class='hours'>1</span>
      </div>
    </div>

    <div class='modes' id="dest">
     <?php 
     include("lib/creerBdd.php");
     global $id;
     $nom = ($lang==="fr") ? "nom" : "name" ;
     $voirlarticle = ($lang==="fr") ? 'Voir l\'article' : 'See the article' ;
     $reponse = $bdd->query('SELECT article_uid,'.$nom.' FROM article ORDER BY article_uid DESC LIMIT 3;');
                  // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
     
     while ($donnees = $reponse->fetch() ){
      $au=$compteur + 1 - htmlspecialchars($donnees['article_uid']);
      
      echo '<p class="mode mode'.$au.'" data-bg="'.$au.'">
      <br/>        <span class="titreArticle">     '.htmlspecialchars($donnees[$nom]).'      </span>
      <br/> <br/> <a class="btn btn-lg btn-primary"  href="article.php?id='.htmlspecialchars($donnees['article_uid']).'"> <span style="display:block; font-size: 30px; font-weight: normal;font-family: inherit;"> '.$voirlarticle.'</span> </a>
      </p>';
    }
    $reponse->closeCursor();
    ?>
  </div>
</div>
</div>
<div id="lesArticles"></div>
<div class="carousel">
  <div class="ourArticles" >
    <a href="articles.php"  class="discover btn btn-xs btn-primary" role="button" title="<?php echo ALTDAOA; ?>">
      <h1 class="paddingZero"> <?php echo DAOA; ?></h1>
    </a>
  </div>
  <div class="flex-slider carousel">
    <ul class="slides">
      <?php
      include("lib/creerBdd.php");
      $reponse = $bdd->query('SELECT nom, name,article_uid,img_link FROM article ORDER BY article_uid DESC');
      while ($donnees = $reponse->fetch())
      {
       $nome = ($lang==='fr') ? 'nom' : 'name' ;
       ImgCarroussel(htmlspecialchars($donnees[$nome]),htmlspecialchars($donnees['article_uid']),'article', htmlspecialchars($donnees['img_link']));
     }
     $reponse->closeCursor();
     ?>
   </ul>
 </div>
</div>

<div class="carousel" >
  <div class="ourArticles">
    <a href="challenges.php"  class="discover btn btn-xs btn-primary" role="button" title="<?php echo ALTDAOC; ?>">
      <h1> <?php echo DAOC; ?> </h1>
    </a>
  </div>
  <div class="flex-slider carousel">
    <ul class="slides">
     <?php 
     include("lib/creerBdd.php");
     $reponse = $bdd->query('SELECT nom, name,challenge_uid,img_link FROM challenge ORDER BY challenge_uid DESC');
     while ($donnees = $reponse->fetch())
     {
       $nome = ($lang==='fr') ? 'nom' : 'name' ;
       ImgCarroussel(htmlspecialchars($donnees[$nome]),htmlspecialchars($donnees['challenge_uid']),'challenge', htmlspecialchars($donnees['img_link']));
     }
     $reponse->closeCursor();
     ?>
   </ul>
 </div>
</div>
<div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->
<div class="galery" id="gallery">
  <div class="inside">
    <div class="slider">
      <div class="flexslider">
        <ul class="slides">
          <li><img alt="Pedra Da Gavea, Rio de Janeiro, Brazil" src="img/gallery/H1.jpg" /></li>
          <li><img alt="Aguas Calientes, Tupiza Tours, Bolivia" src="img/gallery/H2.jpg" /></li>
          <li><img alt="Salar de Uyuni, Bolivia" src="img/gallery/H3.jpg" /></li>
          <li><img alt="Death Road, La Paz, Bolivia" src="img/gallery/H4.jpg" /></li>
          <li><img alt="Cañon del Colca, Cabanaconde, Peru" src="img/gallery/H6.jpg" /></li>
          <li><img alt="Kuelap, Peru" src="img/gallery/H7.jpg" /></li>
          <li><img alt="Rotoroa lake, Nelson Lakes Park, New Zealand" src="img/gallery/H8.jpg" /></li>
          <li><img alt="Cascade Saddle, New Zealand" src="img/gallery/H9.jpg" /></li>
          <li><img alt="Mount Cook, New Zealand" src="img/gallery/H10.jpg" /></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>
