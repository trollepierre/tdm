<?php   
    include("lib/creerBdd.php");
    $reponse = $bdd->query('SELECT count(*) AS count FROM challenge');
    while ($donnees = $reponse->fetch()){
        $count= htmlspecialchars($donnees['count']) ;
    }
    $id = (isset($_GET['id'])) ? htmlspecialchars($_GET['id']) : $count ;    
    $reponse->closeCursor();
    require("w/0fonctions.php");
    ?>
    <script type="text/javascript">
        <?php RemplirWindowImage('challenge'); ?>
    </script>
<?php    
    require("w/1head.php");
    echo '<style type="text/css">';
    IconBackgroundA('challenge');
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
                <?php ArticlesClock('challenge'); ?>
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
    $reponse = $bdd->query('SELECT img_link FROM challenge_contenu WHERE challenge_uid = '.$id.' AND position = 1');
    // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
    while ($donnees = $reponse->fetch()){
      echo '<img style="border : 1px solid black;" class="centreImgTime" src="'.htmlspecialchars($donnees['img_link']).'">';
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
                <?php ArticlesTime('challenge'); ?>
            </div>
        </div>
    </div>
     <div id="lesAutresPhotos"></div>
    <div class="carousel" >
        <div class="ourArticles">
            <a class="discover btn btn-xs btn-danger" role="button" target="_blank" title="<?php echo ALTVLAPDD; ?>" href=
                <?php 
                include("lib/creerBdd.php");
                 global $id;
                  $reponse = $bdd->query('SELECT dropbox_link FROM challenge WHERE challenge_uid = '.$id.' ORDER BY id');
                while ($donnees = $reponse->fetch()){
                    $dropbox_link=htmlspecialchars($donnees['dropbox_link']);
                    echo '"'.$dropbox_link.'"';
                }
                $reponse->closeCursor();
                ?>
                >
                 <h1> <?php echo VLAPDD; ?> </h1>
            </a>
        </div>

        <div class="flex-slider carousel">
            <ul class="slides">
            <?php
            include("lib/creerBdd.php");
            global $id;
            $reponse = $bdd->query('SELECT img_link FROM challenge_galerie WHERE challenge_uid = '.$id.' ORDER BY id');
            while ($donnees = $reponse->fetch()){
                  Carroussel($dropbox_link, htmlspecialchars($donnees['img_link']));
            }
            $reponse->closeCursor();
            ?>   
            </ul>
        </div>
        <div class="ourArticles">
           <a href="challenges.php"  class="discover btn btn-xs btn-danger" role="button"  title="<?php echo ALTVLAD; ?>">
                <h1> <?php echo VLAD; ?> </h1>
            </a>
        </div>
 <div class="flex-slider carousel">
            <ul class="slides">
                <?php 
                include("lib/creerBdd.php");
                $reponse = $bdd->query('SELECT nom, name,challenge_uid,img_link FROM challenge ORDER BY challenge_uid DESC');
                while ($donnees = $reponse->fetch()){
                    $nome = ($lang==='fr') ? 'nom' : 'name' ;
                    ImgCarroussel(htmlspecialchars($donnees[$nome]),htmlspecialchars($donnees['challenge_uid']),'challenge', htmlspecialchars($donnees['img_link']));
                }
                $reponse->closeCursor();
                ?>
            </ul>
        </div>
    </div>
     <div class="fbCenter">
        <div class="fb-comments" data-href="http://www.recontact.me/challenge.php?id=<?php echo $id; ?>" data-width="600px" data-numposts="5" data-colorscheme="light"></div>
    </div>
    <div class="espace">. </div>
    <div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->
    <div class="galery" id="gallery"></div>
<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>