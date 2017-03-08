<?php
/**
 * Created by PhpStorm.
 * User: AKS
 * Date: 7/28/2016
 * Time: 1:45 AM
 */
require('SaveLoadedFileClass.php');
$location = $_FILES['myfile']['tmp_name'];
$extension = $_FILES['myfile']['type'];

$saveLoadedFileClass = new SaveLoadedFile("http://localhost/dev/imgcut/php", getcwd(), 'myfile', $extension);
$saveLoadedFileClass->saveThisLoca  tion($location);

echo $saveLoadedFileClass->getFileLocationOnServer();
die();