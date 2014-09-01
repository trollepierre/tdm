
<?php require("w/0fonctions.php");
      require("w/1head.php");
?>
</head>

<!--
<!DOCTYPE html>
<html>
<head>-->
  <title>Destinations map</title>
  <link rel="stylesheet" href="css/jquery-jvectormap-1.2.2.css" type="text/css" media="screen"/>
  <script src="js/jquery-1.8.2.js"></script>
  <script src="js/jquery-jvectormap-1.2.2.min.js"></script>
  <script src="js/jquery-jvectormap-world-mill-en.js"></script>
  <script src="js/url-map1.js"></script>
</head>
<!-- <body> -->


<body class="home page page-id-4 page-template page-template-page-home-php custom-background">
<?php require("w/2lightbox.php");?>
<?php require("w/4headerScroller.php");?>

<div class="text-align">
  <div id="d-map" style="width: 900px; height: 600px; text-align: center ;margin-left: auto;  margin-right: auto;"></div>
</div>
  <script>
      

	  
	  $(function() {
			$('#d-map').vectorMap({
				hoverOpacity: 0.7, // opacity for :hover
				hoverColor: false,
				markerStyle: {
				  initial: {
				  // Couleur des marqueurs
					r: '2',
					fill: '#FF2F2F',
					stroke: '#000000'
				  }
				},
				
								markers: [
								// Definition des marqueurs (y compris liens url)
				  {latLng: [48.69, 2.09], name: 'Paris', weburl : "http://www.recontact.me/destinations.php"},
				  {latLng: [-22.65, -43.67], name: 'Rio de Janeiro', weburl : "http://www.recontact.me/destination.php?dest=rio"},
				  {latLng: [-23.85, -46.89], name: 'São Paulo', weburl : "http://www.recontact.me/destination.php?dest=sao"},
				  {latLng: [-25.47, -54.60], name: 'Iguazu Falls', weburl : "http://www.recontact.me/destination.php?dest=iguazu"},
				  {latLng: [-27.20, -55.89], name: 'Trinidad', weburl : "http://www.recontact.me/destination.php?dest=trinidad"},
				  {latLng: [-25.26, -57.67], name: 'Asunción', weburl : "http://www.recontact.me/destination.php?dest=asuncion"},
				  {latLng: [-28.10, -57.62], name: 'Esteros del Iberá', weburl : "http://www.recontact.me/destination.php?dest=ibera"},
				{latLng: [-27.20, -58.96], name: 'Resistencia', weburl : "http://www.recontact.me/destination.php?dest=resistencia"},
				{latLng: [-24.26, -65.40], name: 'Salta', weburl : "http://www.recontact.me/destination.php?dest=salta"},
				{latLng: [-20.63, -66.75], name: 'Uyuni', weburl : "http://www.recontact.me/destination.php?dest=uyuni"},
				{latLng: [-19.06, -65.76], name: 'Potosi', weburl : "http://www.recontact.me/destination.php?dest=potosi"},
				{latLng: [-16.35, -68.47], name: 'La Paz', weburl : "http://www.recontact.me/destination.php?dest=lapaz"},
				{latLng: [-15.62, -67.65], name: 'Death road', weburl : "http://www.recontact.me/destination.php?dest=routeDeLaMort"},
				{latLng: [-13.72, -71.69], name: 'Cusco', weburl : "http://www.recontact.me/destination.php?dest=Cusco"},
				{latLng: [-13.20, -72.74], name: 'Machu Picchu', weburl :"http://www.recontact.me/destination.php?dest=machupicchu"},
				{latLng: [-14.60, -75.14], name: 'Nazca Lines', weburl : "http://www.recontact.me/destination.php?dest=nazca"},
				{latLng: [-11.65, -77.38], name: 'Lima', weburl : "http://www.recontact.me/destination.php?dest=lima"},
				{latLng: [-33.48, -70.87], name: 'Santiago de Chile', weburl : "http://www.recontact.me/destination.php?dest=santiago"},
				{latLng: [-36.87, 174.74], name: 'Auckland', weburl : "http://www.recontact.me/destination.php?dest=auckland"},
				{latLng: [-43.71, 170.84], name: 'Tekapo Lake', weburl : "http://www.recontact.me/destination.php?dest=tekapo"},
				{latLng: [-43.09, 170.84], name: 'Mount Cook', weburl : "http://www.recontact.me/destination.php?dest=cook"},
				{latLng: [-45.05, 168.67], name: 'Queenstown', weburl : "http://www.recontact.me/destination.php?dest=queenstown"},
				{latLng: [-46.26, 167.92], name: 'Milford Sound', weburl : "http://www.recontact.me/destination.php?dest=milford"},
				{latLng: [-44.08, 169.35], name: 'Haast Pass', weburl : "http://www.recontact.me/destination.php?dest=haastPass"},
				{latLng: [-34.35, 150.75], name: 'Sydney', weburl : "http://www.recontact.me/destination.php?dest=sydney"},
				{latLng: [-34.01, 146.55], name: 'Blue Montains', weburl : "http://www.recontact.me/destination.php?dest=bluemountains"},
				{latLng: [-37.69, 145.13], name: 'Melbourne', weburl : "http://www.recontact.me/destination.php?dest=melbourne"},
				{latLng: [-27.13, 152.84], name: 'Brisbane', weburl : "http://www.recontact.me/destination.php?dest=brisbane"},
				{latLng: [-18.03, 148.03], name: 'Great Barrier Reef', weburl : "http://www.recontact.me/destination.php?dest=barrier"},
				{latLng: [1.49, 103.43], name: 'Singapore', weburl : "http://www.recontact.me/destination.php?dest=singapore"},
				{latLng: [-8.39, 115.35], name: 'Bali', weburl : "http://www.recontact.me/destination.php?dest=bali"},
				{latLng: [-8.61, 116.92], name: 'Gili Islands', weburl : "http://www.recontact.me/destination.php?dest=giliIslands"},
				{latLng: [-7.34, 110.11], name: 'Borobudur', weburl : "http://www.recontact.me/destination.php?dest=borobudur"},
				{latLng: [-7.87, 112.80], name: 'Mount Bromo', weburl : "http://www.recontact.me/destination.php?dest=bromo"},		
				{latLng: [13.82, 100.67], name: 'Bangkok', weburl : "http://www.recontact.me/destination.php?dest=bangkok"},
				{latLng: [13.31, 104.56], name: 'Angkor', weburl : "http://www.recontact.me/destination.php?dest=angkor"},
				{latLng: [11.39, 104.49], name: 'Phnom-Penh', weburl : "http://www.recontact.me/destination.php?dest=phnomPenh"},
				{latLng: [10.50, 106.66], name: 'Hô Chi Minh', weburl : "http://www.recontact.me/destination.php?dest=hochominh"},
				{latLng: [21.16, 105.46], name: 'Hà Noi', weburl : "http://www.recontact.me/destination.php?dest=hanoi"},
				{latLng: [20.51, 106.89], name: 'Halong Bay', weburl : "http://www.recontact.me/destination.php?dest=halongbay"},
				{latLng: [29.65, 103.97], name: 'Sichuan', weburl : "http://www.recontact.me/destination.php?dest=sichuan"},
				{latLng: [34.90, 104.19], name: 'Jiuzhaigou valley',weburl : "http://www.recontact.me/destination.php?dest=jiuzhaigou"},
				{latLng: [26.11, 108.61], name: 'Guilin', weburl : "http://www.recontact.me/destination.php?dest=guilin"},
				{latLng: [39.77, 116.10], name: 'Beijing', weburl : "http://www.recontact.me/destination.php?dest=beijing"},
				{latLng: [40.97, 116.77], name: 'Great Wall of China', weburl : "http://www.recontact.me/destination.php?dest=wall"},
				{latLng: [39.96, 99.62], name: 'Zhangye', weburl : "http://www.recontact.me/destination.php?dest=zhangye"},
				{latLng: [30.67, 90.26], name: 'Lhassa', weburl : "http://www.recontact.me/destination.php?dest=lhasa"},
				{latLng: [30.47, 91.01], name: 'Potala Palace', weburl : "http://www.recontact.me/destination.php?dest=potala"},
				{latLng: [27.99, 86.74], name: 'Mount Everest', weburl : "http://www.recontact.me/destination.php?dest=everest"},
				{latLng: [27.79, 85.02], name: 'Kahtmandu', weburl : "http://www.recontact.me/destination.php?dest=kathmandu"},
				{latLng: [25.06, 83.82], name: 'Varanasi', weburl : "http://www.recontact.me/destination.php?dest=varanasi"},
				{latLng: [22.44, 87.27], name: 'Calcutta', weburl : "http://www.recontact.me/destination.php?dest=kolkata"},
				{latLng: [25.65, 78.43], name: 'Taj Mahal - Agra', weburl : "http://www.recontact.me/destination.php?dest=agra"},
				{latLng: [28.75, 77.83], name: 'New Delhi', weburl : "http://www.recontact.me/destination.php?dest=newDelhi"},
				{latLng: [23.86, 76.63], name: 'Rajasthan', weburl : "http://www.recontact.me/destination.php?dest=rajasthan"},
				{latLng: [33.24, 76.71], name: 'Leh Ladakh', weburl : "http://www.recontact.me/destination.php?dest=ladakh"}
				  ],
				onRegionClick: function(event, code){
                        //Destinations du trajet - Liens url
						if (code == "FR") {window.location.href = 'http://www.recontact.me'}
                        if (code == "BR") {window.location = 'http://www.recontact.me/destination.php?dest=brazil'}
                        if (code == "PY") {window.location = 'http://www.recontact.me/destination.php?dest=paraguay'}
                        if (code == "AR") {window.location = 'http://www.recontact.me/destination.php?dest=argentina'}
                        if (code == "BO") {window.location = 'http://www.recontact.me/destination.php?dest=bolivia'}
                        if (code == "PE") {window.location = 'http://www.recontact.me/destination.php?dest=peru'}
                        if (code == "CL") {window.location = 'http://www.recontact.me/destination.php?dest=chile'}
                        if (code == "NZ") {window.location = 'http://www.recontact.me/destination.php?dest=newZealand'}
                        if (code == "AU") {window.location = 'http://www.recontact.me/destination.php?dest=australia'}
                        if (code == "SG") {window.location = 'http://www.recontact.me/destination.php?dest=singapore'}
                        if (code == "ID") {window.location = 'http://www.recontact.me/destination.php?dest=indonesia'}
                        if (code == "TH") {window.location = 'http://www.recontact.me/destination.php?dest=thailand'}
                        if (code == "KH") {window.location = 'http://www.recontact.me/destination.php?dest=cambodia'}
                        if (code == "VN") {window.location = 'http://www.recontact.me/destination.php?dest=vietnam'}
                        if (code == "CN") {window.location = 'http://www.recontact.me/destination.php?dest=china'}
                        if (code == "NP") {window.location = 'http://www.recontact.me/destination.php?dest=nepal'}
						if (code == "IN") {window.location = 'http://www.recontact.me/destination.php?dest=india'}
						if (code == "AE") {window.location = 'http://www.recontact.me/destination.php?dest=uae'}
						if (code == "SA") {window.location = 'http://www.recontact.me/destination.php?dest=uae'}
                        //Autres pays => pour faire apparaitre les pages continent - Liens url
                        if (code == "CO") {window.location = 'http://www.recontact.me/destination.php?dest=southAmerica'}
                        if (code == "UY") {window.location = 'http://www.recontact.me/destination.php?dest=southAmerica'}
                        if (code == "VE") {window.location = 'http://www.recontact.me/destination.php?dest=southAmerica'}
                        if (code == "GY") {window.location = 'http://www.recontact.me/destination.php?dest=southAmerica'}
                        if (code == "FK") {window.location = 'http://www.recontact.me/destination.php?dest=southAmerica'}
                        if (code == "PG") {window.location = 'http://www.recontact.me/destination.php?dest=oceania'}
                        if (code == "NC") {window.location = 'http://www.recontact.me/destination.php?dest=oceania'}
                        if (code == "FJ") {window.location = 'http://www.recontact.me/destination.php?dest=oceania'}
                        if (code == "RU") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
                        if (code == "IR") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
                        if (code == "TR") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
                        if (code == "MN") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
                        if (code == "JP") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
                        if (code == "KZ") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
                        if (code == "PK") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
                        if (code == "AF") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
                        if (code == "UZ") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
                        if (code == "MM") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
                        if (code == "MY") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
                        if (code == "IQ") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
						if (code == "LA") {window.location = 'http://www.recontact.me/destination.php?dest=asia'}
                                               
				},
				onMarkerClick: function(events, index) {
					$(location).attr('href', markers[index].weburl);
				},
				series: {
				  regions: [{
					values: {
					// Couleur des pays
						FR:'#FF4E4E',
						BR:'#18A7C4', //Am sud
						PY:'#1F64FB', //Am sud
						AR:'#33B9EE', //Am sud
						BO:'#5A78FD', //Am sud
						PE:'#1FDCCD', //Am sud
						CL:'#2B1FDC', //Am sud
						NZ:'#FC9920', //Oceanie
						AU:'#F55E0D', //Oceanie
						SG:'#2A970F', //Asie du SE
						ID:'#429833', //Asie du SE
						TH:'#068918', //Asie du SE
						KH:'#5EFD6D', //Asie du SE
						VN:'#1EAF04', //Asie du SE
						CN:'#C6FF07', //Asie
						NP:'#DDF45E', //Asie
						IN:'#FCE237',  //Asie  
						AE:'#FFDD01'
						
						
					}
				  }]
				}
				
				
			});
		});
    </script>
<div class="vide">
</div>

<?php require("w/8footer.php");?>
<?php require("w/9end.php");?>

<!-- 
</body>
</html>
 -->

