<?php   
    include("lib/creerBdd.php");
    $reponse = $bdd->query('SELECT count(*) AS count FROM article');
    while ($donnees = $reponse->fetch()){
        $count= htmlspecialchars($donnees['count']) ;
    }
    $id = (isset($_GET['id'])) ? htmlspecialchars($_GET['id']) : $count ;    
    $reponse->closeCursor();
    require("w/0fonctions.php");
?>
    <script type="text/javascript">
        <?php RemplirWindowImage('article'); ?>
    </script>
<?php    
    require("w/1head.php");
    echo '<style type="text/css">';
    IconBackgroundA('article');
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
                <?php ArticlesClock('article');?>
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
    $reponse = $bdd->query('SELECT img_link FROM article_contenu WHERE article_uid = '.$id.' AND position = 1');
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
                <?php ArticlesTime('article');?>
            </div>
        </div>
    </div>
    <div id="lesAutresPhotos"></div>
    <div class="carousel" >
        <div class="ourArticles">
           <a  class="discover btn btn-xs btn-primary" role="button" target="_blank" title="<?php echo ALTVLAPDLA; ?>" href=
                <?php 
                include("lib/creerBdd.php");
                 global $id;
                  $reponse = $bdd->query('SELECT dropbox_link FROM article WHERE article_uid = '.$id.' ORDER BY id');
                while ($donnees = $reponse->fetch()){
                    $dropbox_link=htmlspecialchars($donnees['dropbox_link']);
                    echo '"'.$dropbox_link.'"';
                }
                $reponse->closeCursor();
                ?>
                >
                 <h1> <?php echo VLAPDLA; ?> </h1>
            </a>
        </div>
        <div class="flex-slider carousel">
            <ul class="slides">
            <?php
            include("lib/creerBdd.php");
            global $id;
            $reponse = $bdd->query('SELECT img_link FROM article_galerie WHERE article_uid = '.$id.' ORDER BY id');
            while ($donnees = $reponse->fetch()){
                Carroussel($dropbox_link, htmlspecialchars($donnees['img_link']));
            }
            $reponse->closeCursor();
            ?>   
            </ul>
        </div>
        <div class="ourArticles">
             <a href="articles.php"  class="discover btn btn-xs btn-primary" role="button" title="<?php echo ALTVLAA; ?>">
                <h1> <?php echo VLAA; ?> </h1>
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
    <div class="fbCenter">
        <div class="fb-comments" data-href="http://www.recontact.me/article.php?id=<?php echo $id; ?>" data-width="600px" data-numposts="5" data-colorscheme="light"></div>
    </div>
<div class="espace"> . </div>
    <div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->
    <div class="galery" id="gallery"></div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>