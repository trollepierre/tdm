<?php
// @app.route('/webhook', methods=['GET'])
 

    // def verify():
function verify(){
    // '''Respond to the webhook verification (GET request) by echoing back the challenge parameter.'''
    // return request.args.get('challenge')
echo $_GET['challenge'];
}
    verify();
?>

