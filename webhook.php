Skip to content
 This repository
Explore
Gist
Blog
Help
trollepierre trollepierre
 
4  Unwatch 
  Star 0
 Fork 2trollepierre/tdm PRIVATE
 branch: dev  tdm / webhook.php
trollepierretrollepierre just now Update webhook.php
1 contributor
82 lines (64 sloc)  2.532 kb RawBlameHistory   
<?php 
function verify(){
	echo $_GET['challenge'];
}

function webhook(){
	#'''Receive a list of changed user IDs from Dropbox and process each.'''

	//1 recup de l'header et verifie si signature dropbox
	$signature = (isset(getallheaders()['X-Dropbox-Signature'])) ? getallheaders()['X-Dropbox-Signature'] : "signature invalide" ;
	// echo $signature;
	//comment vérifier la signature ? (non facultatif)

	//2 recup du json
	$data = file_get_contents("php://input"); 
	file_put_contents('dblog.txt',$data);

/*
	$json = (isset($POST['data'])) ? $POST['data'] : "pas de data" ;
	$json2 = (isset($POST['delta'])) ? $POST['delta'] : "pas de delta" ;
	$json3 = (isset($POST['json'])) ? $POST['json'] : "pas de json" ;
	$texte = "la signature est ".$signature."\n\n".$json."\n\n".$json2."\n\n".$json3;
	
	$allHeaders = getallheaders();
	
	$texte.= "\n\n".json_encode($allHeaders)."\n\n"."la signature est ".$signature;
	
	
	$data = file_get_contents("php://input"); 
	$texte.= "\n\n".json_encode($data)."\n\n";/**/
	
/*	$data = $_SERVER; 
	$texte.= "\n\n".json_encode($data)."\n\n";/**/
	
	/*$data="";
	foreach(getallheaders() as $key=>$value)  {
	   $data .= $key.': '.$value."";
	}
	$texte.= "\n\n".json_encode($data)."\n\n";/**/
	
/*	file_put_contents('dblog.txt','set data membete');	
	$data= HttpResponse::setData($texte);
	
	file_put_contents('dblog.txt','httpresponseget membete');	
	$data= HttpResponse::getData();
	$texte.= "\n\n".json_encode($data)."\n\n";/**/
/*file_put_contents('dblog.txt','httpget membete');	
	$data= http_get_request_body();
	$texte.= "\n\n".json_encode($data)."\n\n";
	/**/
	// file_put_contents('dblog.txt',$texte);
	
	//3 repondre rapidement
	//je sais pas
	
}

if(isset($_GET['challenge'])){
	verify();
}else/*if (isset(getallheaders()['X-Dropbox-Signature']))*/ {
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
