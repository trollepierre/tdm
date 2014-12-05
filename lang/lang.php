<?php 
 	if(isset($_COOKIE['lang'])) {
 	     $lang = $_COOKIE['lang'];
	} else {
 	     // si aucune langue n'est déclarée on tente de reconnaitre la langue par défaut du navigateur
	     $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2); 
 	}

	$lang=='fr'  ;       
 	include('lang/fr.php'); 
	 
 	 
 	 
 	 //définition de la durée du cookie (1 an)
 	 $expire = 365*24*3600; 
 	 
	//enregistrement du cookie au nom de lang
 	 setcookie('lang', $lang, time() + $expire); 
 	 
?>
