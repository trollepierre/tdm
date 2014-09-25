<?php   require("w/0fonctions.php");
        require("w/1head.php");
        
?>
<style type="text/css">
    <?php    
   $id=getId();
   $url= getImgImgInPath("/Chargements appareil photo/ArticleTdm/".$id."");
   
    IconBackgroundA('article',$url);
   
    ?>
</style>



</head>

<body class="home page page-id-4 page-template page-template-page-home-php custom-background">
<?php require("w/2lightbox.php");?>
<?php require("w/4headerScroller.php");?>

    <div class="mobile-content">
        <div class="flexslider">
            <ul class="slides">
                <?php 
                ArticlesClock('article');
                ?>

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
                <?php 
               ArticlesTime('article');
                ?>
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
               for ($i=1; $i<=5 ; $i++) { 
                
                     ImgCarroussel(''.$i.'','article','img/art.jpg');
                 }
                ?>
                
            </ul>
        </div>
        <div class="ourArticles">
            <h1> <?php echo VLAPDLA; ?> </h1>
        </div>
        <div class="flex-slider carousel">
            <ul class="slides">
                <?php
                  $id=getId();
                  $url= getImgInPath("/Chargements appareil photo/ArticleTdm/".$id."");
                  
                    foreach ($url as $key => $value) {
                        echo '<li><img src="'.$value.'" alt="Picture Album" /></li>';
                    }
                ?>
            </ul>
        </div>
    </div>
    


    

    <div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->

    <div class="galery" id="gallery"></div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>
