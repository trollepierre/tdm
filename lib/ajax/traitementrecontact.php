<?php
if ((isset($_POST["email"]))&&(isset($_POST["firstname"])))
{ // Check if the "from" input field is filled out
$mail = htmlentities($email); // virer les saloperies de code
$irstname = htmlentities($firstname); // virer les saloperies de code
$irstname = $_POST["irstname"];
$mail= $_POST["mail"];
$temps = 3600*24; //Vous passez en argument le temps de validité (en secondes)
if($irstname == "article"){
$ir="url";
}else if($irstname == "challenge"){
  $ir="challenge_update";
}else{
$ir="challenge_update";
}
$mail=2;
header('Location: '.$ir.'.php?id='.$mail);
}
?>
