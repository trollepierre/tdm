<?php `git pull`;
$filename="PullGitHasWorked.txt"
if (touch($filename)) {
    echo $filename . ' modification time has been changed to present time';
} else {
    echo 'Sorry, could not change modification time of ' . $filename;
}
