<?php
/**
 * Created by PhpStorm.
 * User: AKS
 * Date: 3/9/2017
 * Time: 11:17 AM
 */

// Todo : validate
$dataUrl = $_POST['dataUrl'];

$converter = new Base64ToImageConverter();
$file = $converter->convert($dataUrl);

$tempFileToUrl = new TempFileToUrl($file, "c:\\xampp\\htdocs\\dev\\imgcut\\temp\\" . $file);
$url = $tempFileToUrl->getUrl($file);