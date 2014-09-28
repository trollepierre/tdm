<?php   
    if (isset($_GET['id'])) {
        $id=$_GET['id'];
    }else{
        include("lib/creerBdd.php");
        $reponse = $bdd->query('SELECT count(*) AS count FROM article');
        while ($donnees = $reponse->fetch()){
            $id= $donnees['count'] ;
        }
        $reponse->closeCursor();
    }
    require("w/0fonctions.php");
    require("w/1head.php");
    echo '<style type="text/css">';
    IconBackgroundA('article');
?>
    </style>
</head>

<body class="home page page-id-4 page-template page-template-page-home-php custom-background">
<?php require("w/2lightbox.php");?>
<?php require("w/4headerScroller.php");?>

    <div class="mobile-content">
        <div class="flexslider">
            <ul class="slides">
                <?php ArticlesClock('article');?>
            </ul>
        </div>
    </div>
    <div class='timeline' style="">
        <div class='timeline-bg timeline-bg1 show'></div>
        <div class='timeline-controller'>
            <div class='mode-icon mode-icon1 show' ></div>
        </div>
        <div class='inside'>
            <div class='clocks'>
                <div class='time'>
                    <span class='hours'>1</span>
                </div>
            </div>
            <div class='modes' id="dest" titre="article">
                <?php ArticlesTime('article');?>
            </div>
        </div>
    </div>
    <div id="lesAutresPhotos"></div>
    <div class="carousel" >
        <div class="ourArticles">
            <a href="article.php">
                <h1> <?php echo VLAA; ?> </h1>
            </a>
        </div>
         <div class="flex-slider carousel">
            <ul class="slides">
               <?php 
               include("lib/creerBdd.php");
$reponse = $bdd->query('SELECT id,img_link FROM article ORDER BY id');
while ($donnees = $reponse->fetch())
    {
        ImgCarroussel(''.htmlspecialchars($donnees['id']).'','article', htmlspecialchars($donnees['img_link']));
    }
    $reponse->closeCursor();
                ?>
            </ul>
        </div>
        <div class="ourArticles">
            <h1> <?php echo VLAPDLA; ?> </h1>
        </div>
        
<?php if (TRUE) { ?>
        <div class="flex-slider carousel">
            <ul class="slides">
            <?php
            include("lib/creerBdd.php");
            global $id;
            $reponse = $bdd->query('SELECT img_link FROM article_galerie WHERE article_uid = '.$id.' ORDER BY id');
            while ($donnees = $reponse->fetch()){
                echo '<li><img src="'.htmlspecialchars($donnees['img_link']).'" alt="Picture Album" /></li>';   
            }
            $reponse->closeCursor();
            ?>   
            </ul>
        </div>
<?php } else{ ?>
        <div id="galery-article" class="carousel">
            <ul class="slides">
              <script>
                    alert("Chargement des photos. Merci de patienter.");
                    var id = <?=$id?>;
                    $.getJSON( "lib/ajax/url.php?id="+ id, function( data ) {
                    alert( "Merci d'avoir patienté" ); 
                    var items = [];
                      $.each( data, function( key, val ) {
                         items.push( '<li><img src="'+val+'" alt="Picture Album" /></li>')
                      });
                    $("#galery-article > ul").append(items.join(""));
                    $('#galery-article').addClass("flex-slider");
                    $('#galery-article').flexslider({animation:"slide",animationLoop:true,itemWidth:210,itemMargin:5,minItems:2,maxItems:5});
                    $('#galery-article').show();
                    });
                </script>
            </ul>
        </div> 
<?php } ?>
    </div>
    


    

    <div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->

    <div class="galery" id="gallery"></div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>
