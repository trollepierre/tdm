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
						$jack = $_GET['dest'];
						
					}
					else{
						$jack = 'world1';
					} ?>
					message : '<p><a href="http://planificateur.a-contresens.net/itineraire/1261#carte-itineraire/"><span class="icon icon-<?php echo $jack;?>"></span> Un petit apercu de l\'itineraire</a></p>',
					layout : 'other',
					effect : 'cornerexpand',
					type : 'notice',
					//ttl est le temps pendant lequel la notification reste active (en millième de seconde)
					ttl: 15000,
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
