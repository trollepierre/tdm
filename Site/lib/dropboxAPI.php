<?php
# Include the Dropbox SDK libraries
require_once "lib/dropbox-sdk/Dropbox/autoload.php";
use \Dropbox as dbx;
$clientIdentifier="WorldTrip-RecontactMe/1.0";
$accessToken = "c040st4Y9SsAAAAAAAAqzA0x7Rp_Q_mL0CA33osGVk6J6GsbXEvCLmOobG8RFM1L";
$dbxClient = new dbx\Client($accessToken, $clientIdentifier);
$accountInfo = $dbxClient->getAccountInfo();
$folderMetadata = $dbxClient->getMetadataWithChildren("/");
?>
