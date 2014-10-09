 <?php
 	$DISCOVER='Découvre ';
	$WITHPIERREANDBEN='avec Pierre et Beno&icirc;t ';
	$VOUS='vous ?';
	$INTRO = array ("Nous allons commencer par ", "Ensuite nous continuerons vers ", "Nous irons aussi visiter ", "Et nous irons voir ", "Et aussi nous partirons découvrir ", "Enfin nous verrons ", "Finalement nous irons voir ","Nous irons visiter ","Nous irons visiter ","Nous irons visiter ","Nous irons visiter ");
 	$DEBUT = array ("Voici notre itinéraire envisagé","Voir le trajet détaillé","Jeu des destinations : <br/> Devinez d'où viennent ces photos de notre itinéraire");
 	
 	if (isset($_GET['dest'])) 	{
		switch (htmlspecialchars($_GET['dest'])) {
			case 'ghest':
				$DESTINATION_TEXT = array (  "le Brésil", "l'Argentine", "le Paraguay", "la Bolivie", "le Pérou", "le Chili");
				break;
			case 'ghost':
				$DESTINATION_TEXT = array ("Voici la maps","Devinez d'où viennnent ces photos",  "le Brésil", "l'Argentine", "le Paraguay", "la Bolivie", "le Pérou", "le Chili");
				break;
			case 'southAmerica':
			$DESTINATION_TEXT = array (  "le Brésil", "l'Argentine", "le Paraguay", "la Bolivie", "le Pérou", "le Chili");
				break;
			case 'brazil':
			$DESTINATION_TEXT = array ("Rio de Janeiro","Sao Paulo","les chutes de l'Iguazu");
				break;	
			case 'argentina':
			$DESTINATION_TEXT = array ("les chutes l'Iguazu","les étangs de l'Iberà",'Resistencia','Salta');
				break;
			case 'paraguay':
			$DESTINATION_TEXT = array ("Trinidad");
				break;
				case 'bolivia':
			$DESTINATION_TEXT = array ("le Grand Désert Salé de Uyuni","la Ville minière de Potosi","La Paz","la Route de la Mort");
				break;
			case 'peru':
			$DESTINATION_TEXT = array ("les Ruines de Machu Picchu","Cuzco","Nazca et ses Glyphes","Lima");
				break;
			case 'chile':
			$DESTINATION_TEXT = array ("Santiago de Chile");
				break;
			case 'oceania':
			$DESTINATION_TEXT = array ("la Nouvelle Zélande", "l'Australie");
				break;
			case 'newZealand':
			$DESTINATION_TEXT = array ("Auckland", "le Lac Tekapo", "le Mont Cook", "Queenstown", "Milford Sound", "le Haast Pass");
				break;
			case 'australia':
			$DESTINATION_TEXT = array (  "Sydney", "Les Montagnes Bleus", "Melbourne", "Brisbane", "La Grande Barrière de Corail");
				break;
			case 'asia':
			$DESTINATION_TEXT = array ("Singapour","l'Indonésie","la Thaïlande","le Cambodge","le Viêt Nam","le Chine","le Népal","l'Inde","les Emirats Arabes Unis");
				break;
			case 'indonesia':
			$DESTINATION_TEXT = array ("Bali", "Gili Islands", "Komodo", "Borobudur", "le Mont Bromo");
				break;
			case 'indochina':
			$DESTINATION_TEXT = array (  "Bangkok", "Angkor", "Phnom Penh", "Hô-Chi-Minh-Ville", "Hano&iuml;", "la Baie de Ha Long");
				break;
			case 'china':
			$DESTINATION_TEXT = array ( "Sichuan", "Jiuzhaigou", "Guilin", "le Mont Huang","La Cité Interdite - Pékin", "La Grande Muraille de Chine", "Zhangye","Lhassa", "Le Palais Potala", "Paysages Tibétains", "Le Mont Everest");
				break;
			case 'tibet':
			$DESTINATION_TEXT = array ("Le Palais Potala", "des Paysages Tibétains", "Le Mont Everest");
				break;
			case 'nepal':
			$DESTINATION_TEXT = array (  "Le Mont Everest", "Kathmandou");
				break;
			case 'india':
			$DESTINATION_TEXT = array (  "Varanasi", "Calcutta", "Rajasthan", "Taj Mahal, Agra", "Leh Ladakh", "New Delhi");
				break;
			case 'uae':
			$DESTINATION_TEXT = array ("Duba&iuml;");
				break;
			case 'thailand':
			$DESTINATION_TEXT = array ("Bangkok");
				break;
			case 'cambodia':
			$DESTINATION_TEXT = array ("Angkor","Phnom Penh");
				break;
			case 'vietnam':
			$DESTINATION_TEXT = array ("Hô-Chi-Minh-Ville","Hanoï","la Baie de Ha Long");
				break;
			default:
			$DESTINATION_TEXT = array (  "Vous êtes Perdu ? Désolé cette page n'existe pas.");
				break;
		}
	}else{ 
			$DESTINATION_TEXT = array (  "l'Amérique du Sud", "l'Océanie", "l'Asie");
	} 


    ?>
