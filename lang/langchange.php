<?php		

 	     $lang = 'fr';
			//définition de la durée du cookie (1 an)
			$expire = 365*24*3600; 
		//	$expire = 10; 
			//enregistrement du cookie au nom de lang
			setcookie('lang', $lang, time() + $expire); 
	// header('Location: http://www.recontact.me/');
?>	
		
