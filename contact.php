<?php	
session_start();//On démarre les sessions
$token = uniqid(rand(), true);//On génére un jeton totalement unique (c'est capital :D)
$_SESSION['token'] = $token;//Et on le stocke
$_SESSION['token_time'] = time();//On enregistre aussi le timestamp correspondant au moment de la création du token
//Maintenant, on affiche notre page normalement, le champ caché token en plus
?>
<?php require("w/0fonctions.php");
      require("w/1head.php");
?>
</head>
<body class="home page page-id-4 page-template page-template-page-home-php custom-background">
<?php require("w/2lightbox.php");?>

 <!-- PAGE 1/2  ===========================================================================-->
<?php require("w/4headerScroller.php");?>
<?php require("w/6contact.php");?>
<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>
