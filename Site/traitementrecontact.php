<?php
session_start();
//On va v�rifier :
//Si le jeton est pr�sent dans la session et dans le formulaire
if(isset($_SESSION['token']) && isset($_SESSION['token_time']) && isset($_POST['token']))
{
	//Si le jeton de la session correspond � celui du formulaire
	if($_SESSION['token'] == $_POST['token'])
	{
		//On stocke le timestamp qu'il �tait il y a 15 minutes
		$timestamp_ancien = time() - (15*60);
		//Si le jeton n'est pas expir�
		if($_SESSION['token_time'] >= $timestamp_ancien){
			//Si le referer est bon
			if($_SERVER['HTTP_REFERER'] == 'http://www.recontact.me/contact.php'){
			
			// Connexion � la base de donn�es
			$host = 'mysql1.alwaysdata.com';
			$database = 'recontact_mails';
			$user = 'recontact';
			$pass = 'kit';
			try{
				$bdd = new PDO('mysql:host=' . $host . ';dbname=' . $database , $user , $pass);
				}catch(Exception $e){
				die('Erreur : '.$e->getMessage());
				// header('Location: index.php?bug=OK7');
				}

			// Insertion du message � l'aide d'une requ�te pr�par�e
			$req = $bdd->prepare('INSERT INTO recontactmail (email) VALUES(?)');
			$req->execute(array($_POST['email']));
 
			// R�cup�ration des variables n�cessaires au mail de confirmation	
			$email = $_POST['email'];
 			$firstname = $_POST["firstname"];
			$subject = $_POST["subject"];
			$message = $_POST["message"];

			$mail = htmlentities($email);  // virer les saloperies de code
			$irstname = htmlentities($firstname);  // virer les saloperies de code
			$ubject = htmlentities($subject);  // virer les saloperies de code
			$essage = htmlentities($message);  // virer les saloperies de code
			
			// G�n�ration al�atoire d'une cl�
			$cle = md5(microtime(TRUE)*100000);
 
			// Insertion de la cl� dans la base de donn�es (� adapter en INSERT si besoin)
			$stmt = $bdd->prepare("UPDATE recontactmail SET cle=:cle WHERE email like :email");
			$stmt->bindParam(':cle', $cle);
			$stmt->bindParam(':email', $email);
			$stmt->execute();
 			
 			// header('Location: index.php?bug=OK8');
 
			// Pr�paration du mail contenant le lien d'activation
			$destinataire = "benoit.lefebvre@centrale-marseille.fr";
			$destinataire .= ', ' . 'contact@recontact.me' ;
			$sujet = "Activez votre compte" ;
			$entete = "From: contact@recontact.me" ;
	
			// Le lien d'activation est compos� du login(log) et de la cl�(cle)
			$contenu = "Super ".$irstname." ! Tu as rejoint la communaut� des gens qui suivent notre voyage !
 
			Ton message a pour sujet : ".$ubject."
			Ton message est : ".$essage."
			Ton  mail ".$mail.
			
			"
			
			
 
			----------------
			Ceci est un mail automatique, Merci de ne pas y r�pondre.";
 
 
			mail($destinataire, $sujet, $contenu, $entete) ; // Envoi du mail
	
			//pompe sur: 
			//http://m-gut.developpez.com/tutoriels/php/mail-confirmation/

//Pour finir, activez votre compte en cliquant sur le lien ci-dessous (ou un copier/coller dans votre navigateur internet)
	//		http://recontact.me/validation.php?log=".urlencode($login)."&cle=".urlencode($cle)."
 

			// Redirection du visiteur vers la page du minichat
			echo "<script>alert('Mon alerte dit ".$mail." apres ce mail : ".$irstname." ok');</script>";
			header('Location: index.php?done=OK');
			}else{
			header('Location: index.php?bug=OK6');	
			}
		}else{
		header('Location: index.php?bug=OK5');	
		}
	}else{
	header('Location: index.php?bug=OK4');	
	}
}else{
if((isset($_SESSION['token']))){
// header('Location: index.php?bug=OK11');

}else{
header('Location: index.php?bug=OK12');	
} 
if((isset($_SESSION['token_time']))) {
// header('Location: index.php?bug=OK21');

}else{
header('Location: index.php?bug=OK22');


}

if ((isset($_POST['token']))){
// header('Location: index.php?bug=OK31');
}else{
	header('Location: index.php?bug=OK32');
}
// require("langchange.php");
// header('Location: index.php?bug=OK4');
//SINON, ON RAJOUTE DES ELSE ET DES MESSAGES D'ERREUR
}
?>

