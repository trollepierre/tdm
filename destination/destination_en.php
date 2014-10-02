 <?php
 	$DISCOVER='Discover ';
	$WITHPIERREANDBEN='with Pierre and Beno&icirc;t.';
	$VOUS='you?';
	$INTRO = array ("We will start with ", "Then we continue in ", "We will visit also ", "And we will see ", "And also we will discover ", "Finally we will see ", "Lastly we see ","We visit ","We will visit ", "We will visit ","We will visit ","We will visit ");
	$DEBUT = array("This is the planified itinerary","View the detailled map","Destination game: <br/> Guess where do these pictures on the itinerary come from");
	
	if (isset($_GET['dest'])) 	{
		switch (htmlspecialchars($_GET['dest'])) {
			case 'southAmerica':
				$DESTINATION_TEXT = array ('Brazil','Argentina', 'Paraguay', 'Bolivia', 'Peru', 'Chile');
				break;
			case 'brazil':
				$DESTINATION_TEXT = array ("Rio de Janeiro","Sao Paulo","Iguazu Falls");
				break;	
			case 'argentina':
				$DESTINATION_TEXT = array ('Iguazu Falls','Iber&aacute; Wetlands','Resistencia','Salta');
				break;
			case 'paraguay':
				$DESTINATION_TEXT = array ('Trinidad');
				break;
				case 'bolivia':
				$DESTINATION_TEXT = array ('the salted desert of Uyuni','Potosi','La Paz','Death Road');
				break;
			case 'peru':
				$DESTINATION_TEXT = array ('Machu Picchu','Cusco','Nazca lines','Lima');
				break;
			case 'chile':
				$DESTINATION_TEXT = array ('Santiago de Chile');
				break;
			case 'oceania':
				$DESTINATION_TEXT = array ('New Zealand', 'Australia');
				break;
			case 'newZealand':
				$DESTINATION_TEXT = array ('Auckland','Lake Tekapo', 'Mount Cook', 'Queenstown', 'Milford Sound', 'Haast Pass');
				break;
			case 'australia':
				$DESTINATION_TEXT = array ('Sydney', 'Blue Mountains', 'Melbourne', 'Brisbane', 'Great barrier reef');
				break;
			case 'asia':
				$DESTINATION_TEXT = array ('Singapore','Indonesia','Thailand','Cambodia','Vietnam','China','Nepal','India','United Arab Emirates');
				break;
			case 'indonesia':
				$DESTINATION_TEXT = array ('Bali', 'Gili Islands', 'Komodo', 'Borobudur', 'Mount Bromo');
				break;
			case 'indochina':
				$DESTINATION_TEXT = array ('Bangkok','Angkor', 'Phnom Penh', 'H&ocirc;-Chi-Minh-Ville', 'Hano&iuml;', 'Ha Long Bay');
				break;
			case 'china':
				$DESTINATION_TEXT = array ('Sichuan','Jiuzhaigou', 'Guilin', 'Mount Huang','Forbidden City in Beijing', 'Great Wall of China', 'Zhangye','Lhasa','Potala Palace', 'Tibetan landscapes', 'Mount Everest');
				break;
			case 'tibet':
				$DESTINATION_TEXT = array ('Lhasa Potala Palace','Tibetan landscapes', 'Mount Everest');
				break;
			case 'nepal':
				$DESTINATION_TEXT = array ('Mount Everest', 'Kathmandu');
				break;
			case 'india':
				$DESTINATION_TEXT = array ('Varanasi','Kolkata', 'Rajasthan', 'Taj Mahal, Agra', 'Leh Ladakh', 'Delhi');
				break;
			case 'uae':
				$DESTINATION_TEXT = array ('Duba&iuml;');
				break;
			case 'thailand':
				$DESTINATION_TEXT = array ('Bangkok');
				break;
			case 'cambodia':
				$DESTINATION_TEXT = array ('Angkor','Phnom Penh');
				break;
			case 'vietnam':
				$DESTINATION_TEXT = array ('H&ocirc;-Chi-Minh-Ville','Hano&iuml;','Ha Long Bay');
				break;
			default:
				$DESTINATION_TEXT = array (  "Lost? Sorry this page doesn't exist.");
				break;
		}
	}else{ 
				$DESTINATION_TEXT = array (  'South America', 'Oceania', 'Asia');
	} 


    ?>

