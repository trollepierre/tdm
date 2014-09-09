<div class="container col-sm-6 col-sm-offset-2 col-lg-6 col-lg-offset-2">
<br/>
<br/>
<?php	if (!isset($_POST["submit"]))  {   ?>
 <form class="form-horizontal" id="form" name="form" method="post" action="w/traitementrecontact.php" style="margin-top: 60px;">  
	 <?php if ($lang=='fr' ) { ?>
               <div class="pcontact">  Contacte-nous et nous répondrons dès que possible. Merci de contribuer à notre voyage ! </div>
    <?php }else{ ?>
              <div class="pcontact">  Contact us and we will reply as fast as possible. Thank you for contributing to our trip! </div>
    <?php } ?>

	<fieldset>  
		<input type="hidden" name="token" id="token" value="<?php echo $token;?>"/>
		<div class="form-group">  
			<label class="control-label" for="firstname"> <?php echo FIRSTNAME; ?>, <?php echo LASTNAME; ?></label>  
			<div class="controls">  
				<input type="text" class="form-control" id="firstname" name="firstname">  
			</div>  
		</div>  
		<div class="form-group">  
			<label class="control-label" for="email">Email</label>  
			<div class="controls">  
				<input type="email" class="form-control" id="email" name="email">  
			</div>  
		</div> 
		<div class="form-group">  
			<label class="control-label" for="subject"><?php echo SUJET; ?></label>  
			<div class="controls">  
				<input type="text" class="form-control" id="subject" name="subject">  
			</div>  
		</div>  						
		<div class="form-group">  
			<label class="control-label" for="message">Message</label>  
			<div class="controls">  
				<textarea class="form-control" id="message" name="message" rows="5"></textarea>  
			</div>  
		</div>  
		<div class="form-actions">  
			<button type="submit" class="btn btn-primary"><?php echo SEND; ?></button>  
			<button class="btn"><?php echo CANCEL; ?></button>  
		</div>  
		</div>  
	</fieldset>  
<?php
}else
{// the user has submitted the form
	if ((isset($_POST["email"]))&&(isset($_POST["firstname"]))&&(isset($_POST["lastname"]))&&(isset($_POST["subject"]))&&(isset($_POST["message"]))) 
	{ // Check if the "from" input field is filled out
		$mail = htmlentities($email);  // virer les saloperies de code
		$irstname = htmlentities($firstname);  // virer les saloperies de code
		$ubject = htmlentities($subject);  // virer les saloperies de code
		$essage = htmlentities($message);  // virer les saloperies de code
		
		$irstname = $_POST["irstname"];
		$ubject = $_POST["ubject"];
		$essage = $_POST["essage"];
		
		$mailcheck = spamcheck($_POST["mail"]); // Check if "email" email address is valid
	
		if ($mailcheck==FALSE) 
		{
			echo "<script>alert('Mon alerte dit ".$mail." apres ce mail : ".$irstname." ok');</script>";
		echo "Invalid input";
			header('Location: index.php?bug=OK8');	
		}else{
		$temps = 3600*24;   //Vous passez en argument le temps de validité (en secondes)
	
		$mail = $_POST["mail"];
						// send mail
		echo "<script>alert('Mon alerte dit ".$mail." apres ce mail : ".$irstname." ok');</script>";
		header('Location: index.php?bug=OK11');	
		echo "Thank you for sending us feedback";
		 									?>	</form><?php
		header('Location: index.php?bug=OK10');	
		}
	}else{
		echo "<script>alert('Mon alerte dit ".$mail." apres ce mail : ".$irstname." ok');</script>";
		header('Location: index.php?bug=OK9');	
	}
}
?>

</div>
<div class="vide">
<br/>
<br/>
</div>
