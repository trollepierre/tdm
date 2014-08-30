<?php   require("w/0fonctions.php");
        require("w/1head.php");
        
?>

<style type="text/css">
    <?php    
    IconBackgroundA('challenge');
    
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
                ArticlesClock('challenge');
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


            <div class='modes' id="dest" titre="challenge">
                <?php 
               ArticlesTime('challenge');
                ?>
            </div>
        </div>
    </div>


    <!-- ajout inutile -->
     <div id="lesAutresPhotos"></div>
    <div class="carousel" >
        <div class="ourArticles">
            <a href="challenge.php">
                <h1> <?php echo VLAPDLA; ?> </h1>
            </a>
        </div>

             <?php   /** settings **/
$images_dir = 'preload-images/';
$thumbs_dir = 'preload-images/';
// $thumbs_dir = 'preload-images-thumbs/';
$thumbs_width = 200;
$images_per_row = 3;

/** generate photo gallery **/
$image_files = get_files($images_dir);
if(count($image_files)) {
    $index = 0;
    foreach($image_files as $index=>$file) {
        $index++;
        $thumbnail_image = $thumbs_dir.$file;
        if(!file_exists($thumbnail_image)) {
            $extension = get_file_extension($thumbnail_image);
            if($extension) {
                make_thumb($images_dir.$file,$thumbnail_image,$thumbs_width);
            }
        }
        echo '<a href="',$images_dir.$file,'" class="photo-link smoothbox" rel="gallery"><img src="',$thumbnail_image,'" /></a>';
        if($index % $images_per_row == 0) { echo '<div class="clear"></div>'; }
    }
    echo '<div class="clear"></div>';
}
else {
    echo '<p>There are no images in this gallery.</p>';
}
?>
    </div>
    <!-- fin album -->

    <div id="caracteristiques"></div><!--INDISPENSABLE : WHY?-->

    <div class="galery" id="gallery"></div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>
