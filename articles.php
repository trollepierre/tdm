<?php   
    require("w/0fonctions.php");
?>
    <style type="text/css">
        .clocks{
        z-index: -2;
        }
    </style>
    <script type="text/javascript">
        <?php 
        include("lib/creerBdd.php");
  global $id;
  $reponse = $bdd->query('SELECT img_link FROM article ORDER BY article_uid DESC');
  // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
  $images = array();
  echo 'window.images = [' ;
  $compteur=0;
  while ($donnees = $reponse->fetch())
    {
     $compteur++;
     echo '"'.htmlspecialchars($donnees['img_link']).'",';
    }
    echo "];";
    $reponse->closeCursor();
     ?>
    </script>
<?php    
    require("w/1head.php");
    echo '<style type="text/css">';
    // IconBackgroundA('article');
?>
    </style>
   
</head>

<body class="home page page-id-4 page-template page-template-page-home-php custom-background">
<?php require("w/2lightbox.php");?>
<?php require("w/4headerScroller.php");?>

    <div class="mobile-content">
        <div class="flexslider">
            <div class="slides">
                <?php /*ArticlesClock('article');*/?>
            </div>
        </div>
    </div>
    <div class='timeline' style="">
        <div class='timeline-bg timeline-bg1 show'></div>
        <div class='timeline-controller'>
            <div class='mode-icon mode-icon1 show' >
    <?php 
    include("lib/creerBdd.php");
    global $id;
    $reponse = $bdd->query('SELECT img_link FROM article WHERE article_uid = '.$compteur);
    // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
    while ($donnees = $reponse->fetch()){
      echo '<img class="centreImgTime" src="'.htmlspecialchars($donnees['img_link']).'">';
    }
    $reponse->closeCursor();
    ?></div>
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
                  $reponse = $bdd->query('SELECT article_uid,'.$nom.' FROM article ORDER BY article_uid DESC');
                  // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
                  while ($donnees = $reponse->fetch()){
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
    
    <div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->
    <div class="galery" id="gallery"></div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>