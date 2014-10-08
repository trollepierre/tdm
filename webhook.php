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
	$uidList = json_decode($data);
	file_put_contents('dblog.txt',$data."\n".$uidList);

	//3 repondre rapidement
	foreach ($uidList as $key => $uid) {
		echo 'Lancer process_user avec en arg uid';
		# threading.Thread(target=process_user, args=(uid,)).start()
		# code...
	}
	
}

function process_user($uid){
	#'''Call /delta for the given user ID and process any changes.'''
	
	//1 identification ?
	/* # OAuth token for the user token = redis_client.hget('tokens', uid)
    # /delta cursor for the user (None the first time) cursor = redis_client.hget('cursors', uid)/***/

	//2  Suite
#    client = DropboxClient(token)
#    has_more = True
// creation d'un client dropbox 
	include("lib/dropboxAPI.php");
	$myCustomClient = new dbx\Client($accessToken, $clientIdentifier);

 	$hasMore = TRUE;
 	$pathPrefix="/Chargements appareil photo/ArticleTdm/";
 	while ($hasMore) {
 		$result = $myCustomClient.getDelta($cursor = null, $pathPrefix);

		$uidList = json_decode($result);
		file_put_contents('delta.txt',$delta."\n".$uidList);
		$hasMore = FALSE;
 	}
/*
def process_user(uid):
    '''Call /delta for the given user ID and process any changes.'''

    # OAuth token for the user
    token = redis_client.hget('tokens', uid)

    # /delta cursor for the user (None the first time)
    cursor = redis_client.hget('cursors', uid)

    client = DropboxClient(token)
    has_more = True

    while has_more:
        result = client.delta(cursor)

        for path, metadata in result['entries']:

            # Ignore deleted files, folders, and non-markdown files
            if (metadata is None or
                    metadata['is_dir'] or
                    not path.endswith('.md')):
                continue

            # Convert to Markdown and store as <basename>.html
            html = markdown(client.get_file(path).read())
            client.put_file(path[:-3] + '.html', html, overwrite=True)

        # Update cursor
        cursor = result['cursor']
        redis_client.hset('cursors', uid, cursor)

        # Repeat only if there's more to do
        has_more = result['has_more']
/**/













if(isset($_GET['challenge'])){
	verify();
}elseif (isset(getallheaders()['X-Dropbox-Signature'])) {
	webhook();
}else {
	echo 'ERROR';
}



?>
