<?php require("w/0fonctions.php");
      require("w/1head.php");
?>

<style type="text/css">
    <?php  IconBackground(); ?>
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
<!--    <div class="ourArticles">
        <h1>
            <a class="btn btn-lg btn-primary" href="https://docs.google.com/forms/d/1haLT0oeLTtqSajX0dWijHWcxbW49N886hrpj5s_EtQQ/viewform" role="button" target="_blank"> 
                <?php echo PYC; ?>  
            </a> 
             <?php echo OU; ?>  
            <a class="btn btn-lg btn-primary" href="https://docs.google.com/spreadsheets/d/1gQNjOhUrOleH3qTK2RYkR_Fit1rnkjLZvfQJMd0tMIA/edit#gid=1537311595" role="button" target="_blank">
                <?php echo VTEC; ?> 
        </a>
        </h1>
    </div>-->

    <div class="carousel">
        <div class="ourArticles" >
            <a href="article.php">
                <h1 class="paddingZero"> <?php echo DAOA; ?></h1>
            </a>
        </div>
        <div class="flex-slider carousel">
            <ul class="slides">
                <?php 
                $url=getImg0InPath("/Chargements appareil photo/ArticleTdm");
                for ($i=1; $i <= count($url) ; $i++) { 
                    ImgCarroussel(''.$i.'','article',$url[$i]);    
                }
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
                        <li><img src="img/gallery/H8.jpg" /></li>
                        <li><img src="img/gallery/H9.jpg" /></li>
                        <li><img src="img/gallery/H1.jpg" /></li>
                        <li><img src="img/gallery/H2.jpg" /></li>
                        <li><img src="img/gallery/H11.jpg" /></li>
                        <li><img src="img/gallery/H23.jpg" /></li>
     <!--                   <li><img src="img/gallery/H1.jpg" /></li>
                        <li><img src="img/gallery/H2.jpg" /></li>  -->                  
<?php
/*$url= getImgInPath("/Site/gallery");
foreach ($url as $key => $value) {
echo '<li><img src="'.$value.'" /></li>';
}*/?>

                    </ul>
                </div>
            </section>
        </div>
    </div>
        
<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>
