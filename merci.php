<?php require("w/0fonctions.php");
      require("w/1head.php");
?>
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

 <!-- PAGE 1/2  ===========================================================================-->
<?php require("w/4headerScroller.php");?>

<div class="text-align">
	<div id="gros"><?php echo THANK; ?></div>
</div>
<div class="fb-comments" data-width="1500px" data-numposts="5" data-colorscheme="light"></div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>
