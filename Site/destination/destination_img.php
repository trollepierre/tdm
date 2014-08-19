<?php
	if (isset($_GET['dest'])) 	{
		switch ($_GET['dest']) {
			case 'southAmerica':
				$LINK = array ('brazil', 'argentina', 'paraguay', 'bolivia', 'peru', 'chile');
				$COLORS='#009bd3';
				break;
			case 'brazil':
				$LINK = array ('rio','sao','iguazu');
				$COLORS='#009bd3';
				break;	
			case 'argentina':
				$LINK = array ('iguazu','ibera','resistencia','salta');
				$COLORS='#009bd3';
				break;
			case 'paraguay':
				$LINK = array ('trinidad');
				$COLORS='#009bd3';
				break;
			case 'bolivia':
				$LINK = array ('uyuni','potosi','lapaz','routeDeLaMort');
				$COLORS='#009bd3';
				break;
			case 'peru':
				$LINK = array ('machupicchu','cusco','nazca','lima');
				$COLORS='#009bd3';
				break;
			case 'chile':
				$LINK = array ('santiago');
				$COLORS='#009bd3';
				break;
			case 'oceania':
				$LINK = array ('newZealand', 'australia');
				$COLORS='#ffa500';
				break;
			case 'newZealand':
				$LINK = array ('auckland','tekapo','cook','queenstown','milford','haastPass');
				$COLORS='#ffa500';
				break;
			case 'australia':
				$LINK = array ('collect','sydney','bluemountains','melbourne','brisbane','barrier');
				$COLORS='#ffa500';
				break;
			case 'asia':
				$LINK = array ('singapore','indonesia','thailand','cambodia','vietnam','china','nepal','india','uae');
				$COLORS='#ffff00';
				break;
			case 'indonesia':
				$LINK = array ('bali','giliIslands','komodo','borobudur','bromo');
				$COLORS='#00ff00';
				break;
			case 'indochina':
				$LINK = array ('bangkok','angkor','phnomPenh','hochiminh','hanoi','halongbay');
				$COLORS='#00ff00';
				break;
			case 'china':
				$LINK = array ('sichuan','jiuzhaigou','guilin','mountHuang','beijing','wall','zhangye','lhasa','potala','tibetan','trekking','everest');
				$COLORS='#ffff00';
				break;
			case 'tibet':
				$LINK = array ('lhasa','potala','tibetan','trekking','everest');
				$COLORS='#ffff00';
				break;
			case 'nepal':
				$LINK = array ('trekking','everest','kathmandu');
				$COLORS='#ffff00';
				break;
			case 'india':
				$LINK = array ('varanasi','kolkata','rajasthan','agra','ladakh','newDehli');
				$COLORS='#ffff00';
				break;
			case 'uae':
				$LINK = array ('dubai');
				$COLORS='#ffff00';
				break;
			case 'thailand':
				$LINK = array ('bangkok');
				$COLORS='#00ff00';
				break;
			case 'cambodia':
				$LINK = array ('angkor','phnomPenh');
				$COLORS='#00ff00';
				break;
			case 'vietnam':
				$LINK = array ('hochiminh','hanoi','halongbay');
				$COLORS='#00ff00';
				break;
			default:
				$LINK = array ('lost');
				$COLORS='#bbbbbb';
				break;
		}
	}else{ 
		$LINK = array ('southAmerica', 'oceania', 'asia');
		$COLORS='#777777';
		$COLORS_TAB = array ('#009bd3', '#ffa500', '#ffff00');
	} 


	if(isset($_COOKIE['lang'])) {
 		$lang = $_COOKIE['lang'];
 		 
	} else {
		$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2); 
 	}
	 
   	if ($lang=='fr') {   
 	     require("destination/destination_fr.php");
	 } else  {     
 	     require("destination/destination_en.php");
	 } 
	
?>
