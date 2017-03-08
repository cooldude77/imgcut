<?php
/**
 * Created by PhpStorm.
 * User: AKS
 * Date: 7/28/2016
 * Time: 2:14 AM
 */

$location = $_POST['image_file_location'];

$cropBoxX = 0;
$cropBoxY = 0;

$cropBoxX1 = (int)$_POST['crop_box_input_x1'];
$cropBoxY1 = (int)$_POST['crop_box_input_y1'];

$cropWidth = (int)$_POST['crop_box_input_width'];
$cropHeight = (int)$_POST['crop_box_input_height'];

$sourceImageWidth = (int)$_POST['source_image_input_width'];
$sourceImageHeight = (int)$_POST['source_image_input_height'];

$sourceZoomedWidth = (int)$_POST['source_image_input_zoomed_width'];
$sourceZoomedHeight = (int)$_POST['source_image_input_zoomed_height'];


$mimeType = mime_content_type($location);

if ($mimeType == 'image/jpeg') {
    $cropFile = new CropFileJPG($location);
} else if ($mimeType == 'image/png') {
    $cropFile = new CropFilePNG($location);
}

 $cropFile->crop($location, 0, 0, $cropWidth, $cropHeight);

echo $cropFile->getCroppedFileLocation();

die();