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

<?php 
$show_notif = (isset($_GET['dest'])) ? htmlspecialchars($_GET['dest']) : "" ;
?>

<?php if (($show_notif =="southAmerica")||($show_notif =="oceania")||($show_notif =="asia")||($show_notif =="china")||($show_notif =="india"))     {
require("w/5notification.php");
} ?>
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

    <div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->

    <div class="galery" id="gallery"></div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>
