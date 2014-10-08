<?php
	if (isset($_GET['dest'])) 	{
		switch (htmlspecialchars($_GET['dest'])) {
			case 'southAmerica':
				$LINK = array ('brazil', 'argentina', 'paraguay', 'bolivia', 'peru', 'chile');
				$GMAP = 'https://goo.gl/maps/ZmN32';
				$MAP = 'brazil';
				$COLORS='#009bd3';
				break;
			case 'brazil':
				$LINK = array ('rio','sao','iguazu');
				$COLORS='#1491AA';
				$GMAP = 'https://goo.gl/maps/hILoi';
				break;	
			case 'argentina':
				$LINK = array ('iguazu','ibera','resistencia','salta');
				$COLORS='#288AB0';
				$GMAP = '';
				break;
			case 'paraguay':
				$LINK = array ('trinidad');
				$COLORS='#1549B8';
				$GMAP = '';
				break;
			case 'bolivia':
				$LINK = array ('uyuni','potosi','lapaz','routeDeLaMort');
				$COLORS='#3E54B3';
				$GMAP = '';
				break;
			case 'peru':
				$LINK = array ('machupicchu','cusco','nazca','lima');
				$COLORS='#17A498';
				$GMAP = '';
				break;
			case 'chile':
				$LINK = array ('santiago');
				$COLORS='#2118AA';
				$GMAP = '';
				break;
			case 'oceania':
				$LINK = array ('newZealand', 'australia');
				$COLORS='#D48D09';
				$GMAP = '';
				break;
			case 'newZealand':
				$LINK = array ('auckland','tekapo','cook','queenstown','milford','haastPass');
				$COLORS='#B97118';
				$GMAP = 'https://maps.google.com/maps?f=d&source=embed&saddr=Christchurch,+Canterbury,+Nouvelle-Z%C3%A9lande&daddr=Tekapo,+Canterbury,+Nouvelle-Z%C3%A9lande+to:Mount+Cook+National+Park,+Canterbury,+Nouvelle-Z%C3%A9lande+to:State+Highway+8,+Alexandra,+Otago,+Nouvelle-Z%C3%A9lande+to:Dunedin,+Otago,+Nouvelle-Z%C3%A9lande+to:Queenstown,+Otago,+Nouvelle-Z%C3%A9lande+to:Milford+Sound,+New+Zealand+to:Wanaka,+New+Zealand+to:Southern+Alps+Media,+Southern+Alps+Media,+695+Aubrey+Rd,+Wanaka+9343,+Nouvelle-Z%C3%A9lande+to:Haast+Pass+to:Greymouth,+West+Coast,+Nouvelle-Z%C3%A9lande+to:Christchurch,+Nouvelle-Z%C3%A9lande&hl=fr&geocode=FerAZ_0dQThKCikB7cVjSC8ybTFFmXmEhu8ABQ%3BFXljYv0dfB8qCim31PesCZkrbTHA2GSrhu8AKg%3BFWLMZv0dfv8lCiFgWFxlh-8ADyntspyr4cUrbTFgWFxlh-8ADw%3BFWloTf0dgbEYCilri_vT3UgqqDFpox-JNLWbTw%3BFRjyQ_0djqopCik9UV8P4OQrqDFBmXmEhu8ABQ%3BFQbhUP0ddJYNCilf3qjX8R3VqTEApnmEhu8ABQ%3BFYbTVv0dJOkBCinhSUu6TeDVqTEA3mSrhu8AKg%3BFTPiVf0dQsAUCilvLey5HUbVqTHgwXmEhu8ABQ%3BFXBBVv0dIkIVCik1K2EDBU_VqTEsiDsybb6qgA%3BFWAWX_0dcBMYCikxSDxKRmLVbDENhi9khLXo6Q%3BFShCeP0dCng0CilTENVN2T8vbTGgcnmEhu8ABQ%3BFerAZ_0dQThKCikB7cVjSC8ybTFFmXmEhu8ABQ&aq=0&oq=chr&sll=-43.133061,171.606445&sspn=4.690365,10.821533&mra=ls&ie=UTF8&ll=-43.133061,171.606445&spn=3.681025,4.905224&t=m&dg=feature';
				break;
			case 'australia':
				$LINK = array ('sydney','bluemountains','melbourne','brisbane','barrier');
				$COLORS='#C24B0B';
				$GMAP = 'https://goo.gl/maps/JdgSo';
				break;
			case 'asia':
				$LINK = array ('singapore','indonesia','thailand','cambodia','vietnam','china','nepal','india','uae');
				$COLORS='#DDDD00';
				$GMAP = 'https://goo.gl/maps/8X5Fp';
				break;
			case 'indonesia':
				$LINK = array ('bali','giliIslands','komodo','borobudur','bromo');
				$COLORS='#367A2A';
				$GMAP = '';
				break;
			case 'indochina':
				$LINK = array ('bangkok','angkor','phnomPenh','hochiminh','hanoi','halongbay');
				$COLORS='#00ff00';
				$GMAP = 'https://goo.gl/maps/8X5Fp';
				break;
			case 'china':
				$LINK = array ('sichuan','jiuzhaigou','guilin','mountHuang','beijing','wall','zhangye','lhasa','potala','tibetan','everest');
				$COLORS='#ACDE08';
				$GMAP = 'https://maps.google.com/maps?ll=30.997251,106.484198&z=4&t=h&hl=fr&gl=US&mapclient=embed&saddr=Pingxiang,+Chongzuo,+Guangxi,+Chine&daddr=Yunnan,+Chine+to:Sichuan,+Chine+to:Vall%C3%A9e+de+Jiuzhaigou,+Jiuzhaigou,+Sichuan,+Chine+to:Guilin,+Guangxi,+Chine+to:Tianzi+Mountain+to:Mt+Huangshan+to:Zhejiang,+Chine+to:Panjin,+Liaoning,+Chine+to:Zhangye,+Gansu,+Chine+to:Lhassa,+R%C3%A9gion+autonome+du+Tibet,+Chine&dg=feature';
				break;
			case 'tibet':
				$LINK = array ('lhasa','tibetan','everest');
				$COLORS='#C5DA07';
				$GMAP = '';
				break;
			case 'nepal':
				$LINK = array ('everest2','kathmandu');
				$COLORS='#C5D955';
				$GMAP = 'https://www.google.com/maps/preview?ll=26.834994,79.636975&z=4&t=m&hl=fr&gl=US&mapclient=embed&saddr=Katmandou,+N%C3%A9pal&daddr=Gorakhpur,+Uttar+Pradesh,+Inde+to:Varanasi,+Uttar+Pradesh,+Inde+to:Calcutta,+Bengale-Occidental,+Inde+to:Bombay,+Maharashtra,+Inde+to:Udaipur,+Rajasthan,+Inde+to:Jaisalmer,+Rajasthan,+Inde+to:26.1167418,+72.8951152+to:New+Delhi,+Delhi,+Inde+to:Leh';
				break;
			case 'india':
				$LINK = array ('varanasi','kolkata','rajasthan','agra','ladakh','newDelhi');
				$COLORS='#DDC631';
				$GMAP = 'https://www.google.com/maps/preview?ll=26.834994,79.636975&z=4&t=m&hl=fr&gl=US&mapclient=embed&saddr=Katmandou,+N%C3%A9pal&daddr=Gorakhpur,+Uttar+Pradesh,+Inde+to:Varanasi,+Uttar+Pradesh,+Inde+to:Calcutta,+Bengale-Occidental,+Inde+to:Bombay,+Maharashtra,+Inde+to:Udaipur,+Rajasthan,+Inde+to:Jaisalmer,+Rajasthan,+Inde+to:26.1167418,+72.8951152+to:New+Delhi,+Delhi,+Inde+to:Leh';
				break;
			case 'uae':
				$LINK = array ('dubai');
				$COLORS='#E6C801';
				$GMAP = '';
				break;
			case 'thailand':
				$LINK = array ('bangkok');
				$COLORS='#068918';
				$GMAP = 'https://goo.gl/maps/8X5Fp';
				break;
			case 'cambodia':
				$LINK = array ('angkor','phnomPenh');
				$COLORS='#41AE4C';
				$GMAP = 'https://goo.gl/maps/8X5Fp';
				break;
			case 'vietnam':
				$LINK = array ('hochiminh','hanoi','halongbay');
				$COLORS='#169200';
				$GMAP = 'https://goo.gl/maps/3aaMF';
				break;
			default:
				$LINK = array ('lost');
				$COLORS='#bbbbbb';
				$GMAP = "http://planificateur.a-contresens.net/itineraire/1733#.U_-L_Pl_v9V";
				break;
		}
	}else{ 
		$LINK = array ('southAmerica', 'oceania', 'asia');
		$COLORS='#777777';
		$COLORS_TAB = array ('#009bd3', '#D48D09', '#DDDD00');
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
