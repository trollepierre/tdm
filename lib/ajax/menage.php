<?php

chdir("../..");
use \Dropbox as dbx;

//On vide article
include("lib/creerBdd.php");
$reponse = $bdd->query('SELECT count(*) AS count FROM article');
while ($donnees = $reponse->fetch()){
    $countA= htmlspecialchars($donnees['count']) ;
}
$reponse->closeCursor();

include("lib/creerBdd.php");
for ($i=1; $i < $countA ; $i++) { 
  $id = $i;
  $reponse = $bdd->query('SELECT article_uid FROM article WHERE article_uid='.$id);
  while ($donnees = $reponse->fetch()){
    $bdd->exec('DELETE FROM article_galerie WHERE article_uid='.$id);
    $bdd->exec('DELETE FROM article_contenu WHERE article_uid='.$id);
    $bdd->exec('DELETE FROM article WHERE article_uid='.$id);
  }
}
$reponse->closeCursor();
echo $countA.' articles ont été supprimés !';

//On vide challenge
include("lib/creerBdd.php");
$reponse = $bdd->query('SELECT count(*) AS count FROM challenge');
while ($donnees = $reponse->fetch()){
    $countC= htmlspecialchars($donnees['count']) ;
}
$reponse->closeCursor();

include("lib/creerBdd.php");
for ($i=1; $i < $countC ; $i++) { 
  $id = $i;
  $reponse = $bdd->query('SELECT challenge_uid FROM challenge WHERE challenge_uid='.$id);
  while ($donnees = $reponse->fetch()){
    $bdd->exec('DELETE FROM challenge_galerie WHERE challenge_uid='.$id);
    $bdd->exec('DELETE FROM challenge_contenu WHERE challenge_uid='.$id);
    $bdd->exec('DELETE FROM challenge WHERE challenge_uid='.$id);
  }
}
$reponse->closeCursor();
echo $countC.' challenges ont été supprimés !';

/*
$countA = 5;
$countC = 4;

for ($i=1; $i < $countA ; $i++) { 
   header('Location: url.php?id='.$i);
  echo "L'article n° ".$i.' a ete reinitialise !';
}
for ($i=1; $i < $countC ; $i++) { 
  require('lib/ajax/challenge_update.php?id='.$i);
  echo "Le challenge n° ".$i.' a ete reinitialise !';
}*/
?>