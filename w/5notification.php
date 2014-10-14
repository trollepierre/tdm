<!--cette balise est à insérer dans la page...-->
		<div class="notification-shape shape-box" id="notification-shape" data-path-to="m 0,0 500,0 0,500 -500,0 z">
			<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 500" preserveAspectRatio="none">
				<path d="m 0,0 500,0 0,500 0,-500 z"/>
			</svg>
		</div>
	
	
		<!--Le script-->
		<script>
			(function() {
				//La variable qui porte la notification. Ne pas toucher.
				var svgshape = document.getElementById( 'notification-shape' ),
					s = Snap( svgshape.querySelector( 'svg' ) ),
					path = s.select( 'path' ),
					pathConfig = {
						from : path.attr( 'd' ),
						to : svgshape.getAttribute( 'data-path-to' )
					};
					
			(function() {
				path.animate( { 'path' : pathConfig.to }, 300, mina.easeinout );
				// La notification en soi...
				var notification = new NotificationFx({
					wrapper : svgshape,
					//Ci-dessous, le texte visible dans la notification.
					//La petite image est gérée par une police d'écriture que je me suis amusé à modifier... 
					//Par exemple, si tu veux changer l'image pour voir le continent Asie, il faut changer 'icon-world1' par 'icon-asia'.
					//Ces classes sont contenues dans 'demo.css'
					
					
					<?php if (isset($_GET['dest'])) 	{
						$jack = htmlspecialchars($_GET['dest']);
						$MESSAGE1 = MESSAGENOTIFICATION;
					}
					else{
						$jack = 'world1';
						$MESSAGE1 = MESSAGENOTIFICATIONHOME;
						$MESSAGE2 = '';
					} ?>

					//la référence à GMAP ne fonctionnait pas... j'ai donc mis ça ici:
					<?php switch ($jack) 	{ 
							    case 'southAmerica': 
							    	$GMAP = "https://goo.gl/maps/ZmN32";  
							    	$MESSAGE2 = SOUTHAMERICA;
							    break;
							    case 'oceania': 
									$GMAP = "https://www.google.com/maps/d/edit?mid=zXLF-N9yPKCg.kM0szFZUMN_Q";
									$MESSAGE2 = OCEANIA;
							    break;
							    case 'asia':
							        $GMAP = "https://www.google.com/maps/d/edit?mid=zXLF-N9yPKCg.k5LAq2qsz5_8";
							        $MESSAGE2 = ASIA;
							    break;
							    case 'china': 
							        $GMAP = "https://maps.google.com/maps?ll=30.997251,106.484198&z=4&t=h&hl=fr&gl=US&mapclient=embed&saddr=Pingxiang,+Chongzuo,+Guangxi,+Chine&daddr=Yunnan,+Chine+to:Sichuan,+Chine+to:Vall%C3%A9e+de+Jiuzhaigou,+Jiuzhaigou,+Sichuan,+Chine+to:Guilin,+Guangxi,+Chine+to:Tianzi+Mountain+to:Mt+Huangshan+to:Zhejiang,+Chine+to:Panjin,+Liaoning,+Chine+to:Zhangye,+Gansu,+Chine+to:Lhassa,+R%C3%A9gion+autonome+du+Tibet,+Chine&dg=feature";
							        $MESSAGE2 = CHINA;
							    break;
							    
							    case 'india':
							        $GMAP = "https://www.google.com/maps/preview?ll=26.834994,79.636975&z=4&t=m&hl=fr&gl=US&mapclient=embed&saddr=Katmandou,+N%C3%A9pal&daddr=Gorakhpur,+Uttar+Pradesh,+Inde+to:Varanasi,+Uttar+Pradesh,+Inde+to:Calcutta,+Bengale-Occidental,+Inde+to:Bombay,+Maharashtra,+Inde+to:Udaipur,+Rajasthan,+Inde+to:Jaisalmer,+Rajasthan,+Inde+to:26.1167418,+72.8951152+to:New+Delhi,+Delhi,+Inde+to:Leh";
							        $MESSAGE2 = INDIA;
								break;
							    
							   	default:
							        $GMAP = "http://www.recontact.me/planif.php";
					}?>

					message : '<p><a target="_blank" href="<?php echo $GMAP;?>"><span class="icon icon-<?php echo $jack;?>"></span><?php echo $MESSAGE1;?> <?php echo $MESSAGE2;?></a></p>',
					layout : 'other',
					effect : 'cornerexpand',
					type : 'notice',
					//ttl est le temps pendant lequel la notification reste active (en millième de seconde)
					ttl: 1500000,
					onClose : function() {
						setTimeout(function() {
							path.animate( { 'path' : pathConfig.from }, 300, mina.easeinout );
						}, 200 );
					}
				});

				// show the notification
				notification.show();
				
				
				

				})();
			})();
		</script>
