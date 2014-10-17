<?php   
    require("w/0fonctions.php");
?>
    <script type="text/javascript">
        <?php 
        include("lib/creerBdd.php");
  global $id;
  $reponse = $bdd->query('SELECT img_link FROM article ORDER BY article_uid');
  // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
  $images = array();
  echo 'window.images = [' ;
  while ($donnees = $reponse->fetch())
    {
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
    $reponse = $bdd->query('SELECT img_link FROM article WHERE article_uid = 1');
    // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
    while ($donnees = $reponse->fetch()){
      echo '<img src="'.htmlspecialchars($donnees['img_link']).'">';
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
    $nom = ($lang="fr") ? "nom" : "name" ;
    $reponse = $bdd->query('SELECT article_uid,'.$nom.' FROM article ORDER BY article_uid');
    // Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
    while ($donnees = $reponse->fetch()){
      echo ' <p class="mode mode'.htmlspecialchars($donnees['article_uid']).'" data-bg="'.htmlspecialchars($donnees['article_uid']).'">
           <br/>        <span class="titreArticle">     '.htmlspecialchars($donnees[$nom]).'      </span>
          </p>';
    }
    $reponse->closeCursor();
    ?>
<?php
/*
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
}/**/

//111
?>
            </div>
        </div>
    </div>
    
    <div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->
    <div class="galery" id="gallery"></div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>