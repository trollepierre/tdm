<?php   require("destination/triposo.php");
        require("w/0fonctions.php");
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
            <div class='mode-icon mode-icon1 show' ></div>

             
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

 <div id="lesAutresPhotos"></div>
    <div class="carousel" >
        <div class="ourArticles">
            <a href="challenge.php">
                <h1> <?php echo QDDM; ?> </h1>
            </a>
        </div>
        <div class="flex-slider carousel">
            <ul class="slides">
               <?php 
               for ($i=1; $i<=10 ; $i++) { 
                     ImgCarroussel(''.$i.'','article','img/art.jpg');
                 }
                ?>
                
            </ul>
        </div>
    </div>

    <div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->

    <div class="galery" id="gallery"></div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>