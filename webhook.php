<?php 

function verify(){
	echo $_GET['challenge'];
}

verify();
echo '\nchallenge envoyé\n';
/*
from hashlib import sha256
import hmac
import threading
*/

function webhook(){
	#'''Receive a list of changed user IDs from Dropbox and process each.'''

	//1 recup de l'header et verifie si signature dropbox
	$signature = $_GET['X-Dropbox-Signature'];
	echo 'sign     \n';
	echo $signature;
	//2 recup du json
	$json = $POST['json'];
	echo $json;

	/*	  for uid in json.loads(request.data)['delta']['users']:
        # We need to respond quickly to the webhook request, so we do the
        # actual work in a separate thread. For more robustness, it's a
        # good idea to add the work to a reliable queue and process the queue
        # in a worker process.
        threading.Thread(target=process_user, args=(uid,)).start()*/
}

/*@app.route('/webhook', methods=['POST'])
def webhook():
   # '''Receive a list of changed user IDs from Dropbox and process each.'''

    # Make sure this is a valid request from Dropbox
    signature = request.headers.get('X-Dropbox-Signature')
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
webhook();
?>