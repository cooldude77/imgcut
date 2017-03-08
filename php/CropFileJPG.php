<?php

/**
 * Created by PhpStorm.
 * User: AKS
 * Date: 7/28/2016
 * Time: 2:18 AM
 */
class CropFileJPG extends CropFile
{
    public function __construct($locationOfSourceFile)
    {
        parent::__construct($locationOfSourceFile);
    }

    public function crop($sourceFileLocation, $croppedFileLocation, $sourceX, $sourceY, $cropWidth, $cropHeight)
    {
        $sourceImage = imagecreatefromjpeg($sourceFileLocation);
        $destinationImage = imagecreatetruecolor($cropWidth, $cropHeight);


        imagecopyresampled($destinationImage, $sourceImage, 0, 0, $sourceX, $sourceY, $cropWidth, $cropHeight, $cropWidth, $cropHeight);

        imagejpeg($destinationImage, $croppedFileLocation);
        imagedestroy($sourceImage);

        return $destinationImage;
    }
}