<?php 

function verify(){
	echo $_GET['challenge'];
}


function webhook(){
	#'''Receive a list of changed user IDs from Dropbox and process each.'''

	//1 recup de l'header et verifie si signature dropbox
	$signature = (isset($_GET['X-Dropbox-Signature'])) ? $_GET['X-Dropbox-Signature'] : "signature invalide" ;
	// echo $signature;
	//comment vérifier la signature ? (non facultatif)

	//2 recup du json
	$json = (isset($POST['data'])) ? $POST['data'] : "pas de data" ;
	$json2 = (isset($POST['delta'])) ? $POST['delta'] : "pas de delta" ;
	$json3 = (isset($POST['json'])) ? $POST['json'] : "pas de json" ;
	$texte = $signature."\n\n".$json."\n\n".$json2."\n\n".$json3;

$url = 'http://dev.recontact.me/webhook.php';

$alpha =(get_headers($url));

$beta= (get_headers($url, 1));

$gamma = getallheaders();
$texte.= "\n".$alpha."\n".$beta."\n\n\n".$gamma;
	file_put_contents('dblog.txt',$texte);
	//3 repondre rapidement
	//je sais pas
	
}

if(isset($_GET['challenge'])){
	verify();
}
else/*if (isset($_GET['X-Dropbox-Signature']))*/ {
	webhook();
}
/*
from hashlib import sha256
import hmac
import threading

@app.route('/webhook', methods=['POST'])
def webhook():
   # '''Receive a list of changed user IDs from Dropbox and process each.'''

    # Make sure this is a valid request from Dropbox
    signature = request.headers.get('X-Dropbox-Signature')
$POST['json'];
    if signature != hmac.new(APP_SECRET, request.data, sha256).hexdigest():
        abort(403)

    for uid in json.loads(request.data)['delta']['users']:
        # We need to respond quickly to the webhook request, so we do the
        # actual work in a separate thread. For more robustness, it's a
        # good idea to add the work to a reliable queue and process the queue
        # in a worker process.
        threading.Thread(target=process_user, args=(uid,)).start()
    return ''
/**/
?>
