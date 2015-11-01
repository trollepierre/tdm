<div class="container col-sm-6 col-sm-offset-2 col-lg-6 col-lg-offset-2">
<br/>
<br/>
<?php	if (!isset($_POST["submit"]))  {   ?>
 <form class="form-horizontal" id="form" name="form" method="post" action="lib/ajax/traitementrecontact.php" style="margin-top: 60px;">  
	 <?php if ($lang=='fr' ) { ?>
               <div class="pcontact">  Ecrire exactement "article" ou "challenge" si on repare un article ou un defi </div>
    <?php }else{ ?>
              <div class="pcontact">  Write exactly "article" or "challenge" depending on what to repare </div>
    <?php } ?>

	<fieldset>  
		<input type="hidden" name="token" id="token" value="<?php echo $token;?>"/>
		<div class="form-group">  
			<label class="control-label" for="firstname"> <?php echo "article/challenge"; ?></label>  
			<div class="controls">  
				<input type="text" class="form-control" id="firstname" name="firstname">  
			</div>  
		</div>  
		<div class="form-group">  
			<label class="control-label" for="email">N°</label>  
			<div class="controls">  
				<input type="text" class="form-control" id="email" name="email">  
			</div>  
		</div> 
		
		<div class="form-actions">  
			<button type="submit" class="btn btn-primary"><?php echo "REPARE"; ?></button>  
			<button class="btn"><?php echo CANCEL; ?></button>  
		</div>  
		</div>  
	</fieldset>  
<?php
}else
{// the user has submitted the form
	if ((isset($_POST["email"]))&&(isset($_POST["firstname"]))) 
	{ // Check if the "from" input field is filled out
		$mail = htmlentities($email);  // virer les saloperies de code
		$irstname = htmlentities($firstname);  // virer les saloperies de code
	
		$irstname = $_POST["irstname"];
		$mail= $_POST["mail"];

		$temps = 3600*24;   //Vous passez en argument le temps de validité (en secondes)
	
		if($irstname == "article"){
		$ir="url";
		}else if($irstname == "challenge"){
		$ir="challenge_update";
		}
		header('Location: lib/ajax/'.$ir.'.php?id='.$mail);
	}
}
?>

</div>
<div class="vide">
<br/>
<br/>
</div>
