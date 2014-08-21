<?php
function readline($prompt = null){
    if($prompt){
        echo $prompt;
    }
    $fp = fopen("php://stdin","r");
    $line = rtrim(fgets($fp, 1024));
    return $line;
}

# Include the Dropbox SDK libraries
require_once "lib/dropbox-sdk/Dropbox/autoload.php";
use \Dropbox as dbx;

$appInfo = dbx\AppInfo::loadFromJsonFile("lib/app-info.json");
$webAuth = new dbx\WebAuthNoRedirect($appInfo, "PHP-Example/1.0");

$authorizeUrl = $webAuth->start();

echo "1. Go to: " . $authorizeUrl . "\n";
echo "2. Click \"Allow\" (you might have to log in first).\n";
echo "3. Copy the authorization code.\n";
$authCode = \trim(\readline("Enter the authorization code here: c040st4Y9SsAAAAAAAAqxMzAE8CVtGc0a4kaKC32Iew"));

list($accessToken, $dropboxUserId) = $webAuth->finish($authCode);
print "Access Token: " . $accessToken . "\n";

$dbxClient = new dbx\Client($accessToken, "PHP-Example/1.0");
$accountInfo = $dbxClient->getAccountInfo();

print_r($accountInfo);

$f = fopen("working-draft.txt", "rb");
$result = $dbxClient->uploadFile("/working-draft.txt", dbx\WriteMode::add(), $f);
fclose($f);
print_r($result);

$folderMetadata = $dbxClient->getMetadataWithChildren("/");
print_r($folderMetadata);

$f = fopen("working-draft.txt", "w+b");
$fileMetadata = $dbxClient->getFile("/working-draft.txt", $f);
fclose($f);
print_r($fileMetadata);
?>
