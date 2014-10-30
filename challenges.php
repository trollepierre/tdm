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
  $reponse = $bdd->query('SELECT img_link FROM challenge ORDER BY challenge_uid deSC');
  // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
  $images = array();
  echo 'window.images = [' ;
  $compteur =0;
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
    // IconBackgroundA('challenge');
?>
    </style>
   
</head>

<body class="home page page-id-4 page-template page-template-page-home-php custom-background">
       <div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&appId=661854923873753&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<?php require("w/2lightbox.php");?>
<?php require("w/4headerScroller.php");?>

    <div class="mobile-content">
        <div class="flexslider">
            <div class="slides">
                <?php /*ArticlesClock('challenge');*/?>
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
    $reponse = $bdd->query('SELECT img_link FROM challenge WHERE challenge_uid = '.$compteur);
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
                  $voirlchallenge = ($lang==="fr") ? 'Voir le défi' : 'See the challenge' ;
                  $reponse = $bdd->query('SELECT challenge_uid,'.$nom.' FROM challenge ORDER BY challenge_uid DESC');
                  // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
                  while ($donnees = $reponse->fetch()){
                    $cu = $compteur - htmlspecialchars($donnees['challenge_uid']) + 1;
                    echo '<p class="mode mode'.$cu.'" data-bg="'.$cu.'">
                         <br/>        <span class="titreArticle">     '.htmlspecialchars($donnees[$nom]).'      </span>
                          <br/> <br/> <a class="btn btn-lg btn-primary"  href="challenge.php?id='.htmlspecialchars($donnees['challenge_uid']).'"> <span style="display:block; font-size: 30px; font-weight: normal;font-family: inherit;"> '.$voirlchallenge.'</span> </a>
                        </p>';
                  }
                  $reponse->closeCursor();
                  ?>
            </div>
        </div>
    </div>
    
    <div class="fbCenter">
      <a href="#AddChal"> 
      <div class="AddCenter" id="AddChal"> <p> <?php echo ADDCHAL; ?></p> </div></a>
        <div class="fb-comments" data-href="http://www.recontact.me/challenge.php?id=<?php echo $id; ?>" data-width="600px" data-numposts="5" data-colorscheme="light"></div>
    </div>
    <div class="espace">. </div>
    <div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->
    <div class="galery" id="gallery"></div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>