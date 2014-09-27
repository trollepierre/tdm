<?php require("w/0fonctions.php");
      require("w/1head.php");
?>
<!-- cumulus-->
    <script type="text/javascript" src="lib/cumulus/swfobject.js"></script>
    <style type="text/css">
        body, html { height: 100%; background-color:#eee; }
        div.tagcloud { margin: 0px; }
        div.tagcloud2  {text-align:center;}
    </style>
<!--fin cumulus-->

</head>
<body class="home page page-id-4 page-template page-template-page-home-php custom-background">
<?php require("w/2lightbox.php");?>

 <!-- PAGE 1/2  ===========================================================================-->
<?php require("w/4headerScroller.php");?>

<div class="text-align">
<div class="tagcloud col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<div>
								<p><?php echo NUAGE; ?></p>
							</div>
							<div id="tagcloud2"></div>
							<script type="text/javascript">
								var flashvars = {
									fontname: "georgia, _serif",
									fontweight: "normal",
									hicolor: "0x003366",
									
								};
								var params = { menu: "false" };
								var attributes = {};
								swfobject.embedSWF( "lib/cumulus/tagcloud.swf", "tagcloud2", "900", "600", "10.0.0", "lib/cumulus/expressInstall.swf", flashvars, params, attributes );
							</script>
</div>	
					</div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>
