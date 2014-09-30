<?php require( "lang/lang.php");?>
<!DOCTYPE html>
<html lang="en-US" prefix="og: http://ogp.me/ns#">

<head>
    <script type="text/javascript" src="js/b9.js"></script>
    <script type="text/javascript" src="js/M0.js"></script>
    <script type="text/javascript" src="js/b5.js"></script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo TITLE; ?></title>
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="xmlrpc.php">

    <link rel="icon" href="img/terre.ico" type="image/x-icon">
    <link rel="canonical" href="http://www.recontact.fr/" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="One year around the world" />
    <meta property="og:url" content="http://www.recontact.me/" />
    <meta property="og:site_name" content="WORLDTRIP" />
    <!-- super utile -->

    <link rel="alternate" type="application/rss+xml" title="Home Comments Feed" href="http://www.recontact.me" />
    <link rel='stylesheet' id='style-css' href='css/style.css' type='text/css' media='all' />
    <link rel="stylesheet" href="css/css.css">
<?php if ($lang == 'fr') {  
echo '<link rel = "stylesheet"    href = "css/fr.css" >';
} else { 
echo '<link rel = "stylesheet"    href = "css/en.css" >';
} ?>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/demo_notif.css" />
    <link rel="stylesheet" type="text/css" href="css/ns-default_notif.css" />
    <link rel="stylesheet" type="text/css" href="css/ns-style-other_notif.css" />
    <script src="js/modernizr.custom.js"></script>
    <script src="js/snap.svg-min.js"></script>
    <script src="js/classie.js"></script>
    <script src="js/notificationFx.js"></script>
    <style type="text/css" id="custom-background-css">
        body.custom-background {
            background-color: #ffffff;
        }
    </style>     
