<?php require("w/0fonctions.php");
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
<?php require("w/3intro.php");?>
 <!-- PAGE 1/2  ===========================================================================-->
<?php require("w/4headerScroller.php");?>
<?php require("w/5notification.php");?>

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
            <div class='mode-icon mode-icon1 show'></div>
        </div>

        <div class='inside'>
            <div class='clocks'>
                <div class='time'>
                    <span class='hours'>1</span>
                </div>
            </div>


            <div class='modes' id="dest" titre="index">
                <?php 
               
                
                DestinationTime();
             
                ?>
      
            </div>
        </div>
    </div>
    <div id="lesArticles"></div>
    <div class="carousel" >
        <div class="ourArticles">
            <a href="challenge.php">
                <h1> <?php echo DAOC; ?> </h1>
            </a>
        </div>
        <div class="flex-slider carousel">
            <ul class="slides">
               <?php 
               for ($i=1; $i<=2 ; $i++) { 
               ImgCarroussel(''.$i.'','challenge','challenge/'.$i.'/img0.jpg');
               }
                // for ($i=3; $i<=10 ; $i++) { 
                //     ImgCarroussel(''.$i.'','challenge','img/art.jpg');
                // }
                // ?>
                
            </ul>
        </div>
    </div>

    <div class="carousel">
        <div class="ourArticles" >
            <a href="article.php">
                <h1> <?php echo DAOA; ?></h1>
            </a>
        </div>
        <div class="flex-slider carousel">
            <ul class="slides">
                 <?php 
                for ($i=1; $i<=5 ; $i++) { 
               ImgCarroussel(''.$i.'','article','article/'.$i.'/img0.jpg');
               }
                // for ($i=6; $i<=8 ; $i++) { 
                //     ImgCarroussel(''.$i.'','article','img/art.jpg');
                // }
                ?>
                
            </ul>
        </div>
    </div>
    
        <div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->
  

    <div class="galery" id="gallery">
        <div class="inside">
            <section class="slider">
                <div class="flexslider">
                    <ul class="slides">
                      <li><img src="img/H8.jpg" /></li>
                      <li><img src="img/H9.jpg" /></li>
                     <li><img src="img/H1.jpg" /></li>
                      <li><img src="img/H2.jpg" /></li>
<!--                  <li><img src="img/G5.jpg" /></li>
                      <li><img src="img/G66.jpg" /></li>-->
                    </ul>
                </div>
            </section>
        </div>
    </div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>
