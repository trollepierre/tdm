<?php
echo '<p> Derniers commentaires </p>';
use \Dropbox as dbx;

    if (isset($_GET['id'])) {
        $id=htmlspecialchars($_GET['id']);
    }else{
        include("lib/creerBdd.php");
        $reponse = $bdd->query('SELECT count(*) AS count FROM article');
        while ($donnees = $reponse->fetch()){
            $id= htmlspecialchars($donnees['count']) ;
        }
        $reponse->closeCursor();
    }
$id=1;
// Connexion à la base de données
  include("lib/creerBdd.php");

// Récupération des commentaires
$req = $bdd->prepare('SELECT auteur, commentaire, DATE_FORMAT(date_commentaire, \'%d/%m/%Y à %Hh%imin%ss\') AS date_commentaire_fr FROM commentaires WHERE article_uid = ? ORDER BY date_commentaire');
$req->execute(array($id));

while ($donnees = $req->fetch())
{

echo '<p><strong>';
echo htmlspecialchars($donnees['auteur']); 
echo '</strong> le ' ;
echo $donnees['date_commentaire_fr']; 
echo'</p><p>';
echo nl2br(htmlspecialchars($donnees['commentaire'])); 
echo'</p>';
} // Fin de la boucle des commentaires
$req->closeCursor();
?>