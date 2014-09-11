 <?php
 	$DISCOVER='D&eacute;couvre ';
	$WITHPIERREANDBEN='avec Pierre et Beno&icirc;t ';
	$VOUS='vous ?';
	$INTRO = array ("Nous allons commencer par ", "Ensuite nous continuerons vers ", "Nous irons aussi visiter ", "Et nous irons voir ", "Et aussi nous partirons découvrir ", "Enfin nous verrons ", "Finalement nous irons voir ","Nous irons visiter ","Nous irons visiter ","Nous irons visiter ","Nous irons visiter ");
 	$DEBUT = array ("Voici notre itinéraire envisagé","Voir le trajet détaillé","Jeu des destinations : <br/> Devinez d'où viennent ces photos de notre itinéraire");
 	
 	if (isset($_GET['dest'])) 	{
		switch ($_GET['dest']) {
			case 'southAmerica':
			$DESTINATION_TEXT = array (  "le Br&eacute;sil", "l'Argentine", "le Paraguay", "la Bolivie", "le P&eacute;rou", "le Chili");
				break;
			case 'brazil':
			$DESTINATION_TEXT = array ("Rio de Janeiro","Sao Paulo","les chutes de l'Iguazu");
				break;	
			case 'argentina':
			$DESTINATION_TEXT = array ("les chutes l'Iguazu","les &eacute;tangs de l'Iber&aacute;",'Resistencia','Salta');
				break;
			case 'paraguay':
			$DESTINATION_TEXT = array ("Trinidad");
				break;
				case 'bolivia':
			$DESTINATION_TEXT = array ("le Grand Désert Sal&eacute; de Uyuni","la Ville minière de Potosi","La Paz","la Route de la Mort");
				break;
			case 'peru':
			$DESTINATION_TEXT = array ("les Ruines de Machu Picchu","Cuzco","Nazca et ses Glyphes","Lima");
				break;
			case 'chile':
			$DESTINATION_TEXT = array ("Santiago de Chile");
				break;
			case 'oceania':
			$DESTINATION_TEXT = array ("la Nouvelle Z&eacute;lande", "l'Australie");
				break;
			case 'newZealand':
			$DESTINATION_TEXT = array ("Auckland", "le Lac Tekapo", "le Mont Cook", "Queenstown", "Milford Sound", "le Haast Pass");
				break;
			case 'australia':
			$DESTINATION_TEXT = array ( "le Visa Working Holidays", "Sydney", "Les Montagnes Bleus", "Melbourne", "Brisbane", "La Grande Barri&egrave;re de Corail");
				break;
			case 'asia':
			$DESTINATION_TEXT = array ("Singapour","l'Indon&eacute;sie","la Tha&iuml;lande","le Cambodge","le Vi&ecirc;tnam","le Chine","le N&eacute;pal","l'Inde","les Emirats Arabes Unis");
				break;
			case 'indonesia':
			$DESTINATION_TEXT = array ("Bali", "Gili Islands", "Komodo", "Borobudur", "le Mont Bromo");
				break;
			case 'indochina':
			$DESTINATION_TEXT = array (  "Bangkok", "Angkor", "Phnom Penh", "H&ocirc;-Chi-Minh-Ville", "Hano&iuml;", "la Baie de Ha Long");
				break;
			case 'china':
			$DESTINATION_TEXT = array ( "Sichuan", "Jiuzhaigou", "Guilin", "le Mont Huang","La Cit&eacute; Interdite - P&eacute;kin", "La Grande Muraille de Chine", "Zhangye","Lhassa", "Le Palais Potala", "Paysages Tib&eacute;tains",, "Le Mont Everest");
				break;
			case 'tibet':
			$DESTINATION_TEXT = array ("Le Palais Potala", "Paysages Tib&eacute;tains", "Le Mont Everest");
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
			$DESTINATION_TEXT = array ("H&ocirc;-Chi-Minh-Ville","Hano&iuml;","la Baie de Ha Long");
				break;
			default:
			$DESTINATION_TEXT = array (  "Vous &ecirc;tes Perdu ? D&eacute;sol&eacute; cette page n'existe pas.");
				break;
		}
	}else{ 
			$DESTINATION_TEXT = array (  "l'Am&eacute;rique du Sud", "l'Oc&eacute;anie", "l'Asie");
	} 


    ?>
