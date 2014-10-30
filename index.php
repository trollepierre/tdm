<?php require("w/0fonctions.php");
?>
 <script type="text/javascript">
         <?php /*RemplirWindowImage('challenge');*/ ?>
    </script>
<?php
      require("w/1head.php");
?>

<style type="text/css">
    <?php  IconBackground(); ?>
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
                DestinationClock();
                ?>
            </ul>
        </div>
    </div>
    <div class='timeline' style="">
        <div class='timeline-bg timeline-bg1 show'></div>
        <div class='timeline-controller'>
            <div class='mode-icon mode-icon1 show'>
                 <?php 
                echo '"<img class="centreImgTime" src="http://www.recontact.me/img/dest_img/southAmerica.jpg"">';
                ?>>
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
                DestinationTime();
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
                        <li><img alt="Pangong Tso Lake, India" src="img/gallery/H8.jpg" /></li>
                        <li><img alt="Canebière Marseille, France" src="img/gallery/H9.jpg" /></li>
                        <li><img alt="Hunder, Kashmir, India" src="img/gallery/H1.jpg" /></li>
                        <li><img alt="Nubra Valley, Kashmir, India" src="img/gallery/H2.jpg" /></li>
                        <li><img alt="Bibliothèque F. Mitterrand, Paris, France" src="img/gallery/H11.jpg" /></li>
                        <li><img alt="Passerelle Simone de Beauvoir, Paris, France" src="img/gallery/H23.jpg" /></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
        
<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>
