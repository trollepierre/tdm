<?php
exec('git pull',$output2);
touch(var_dump($output2));
touch('end.txt');

$output = exec('git pull');
touch($output);
`git pull`;
touch('file.txt');
exec(`git pull`,$output1);
exec('git pull',$output2);
exec(git pull,$output3);
touch($output3[0]);
touch($output1[0]);
touch($output2[0]);
touch('f.txt');
?>