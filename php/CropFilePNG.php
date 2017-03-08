<?php

/**
 * Created by PhpStorm.
 * User: AKS
 * Date: 7/28/2016
 * Time: 2:18 AM
 */
class CropFilePNG extends CropFile
{

    public function __construct($locationOfSourceFile, $locationOfUrl)
    {
        parent::__construct($locationOfSourceFile, $locationOfUrl);
    }

    public function crop($croppedFileLocation, $sourceX, $sourceY, $cropWidth, $cropHeight)
    {
        $sourceImage = imagecreatefrompng($this->getLocationOfSourceFile());
        $destinationImage = imagecreatetruecolor($cropWidth, $cropHeight);


        imagecopyresampled($destinationImage, $sourceImage, 0, 0, $sourceX, $sourceY, $cropWidth, $cropHeight, $cropWidth, $cropHeight);

        imagepng($destinationImage, $croppedFileLocation);
        imagedestroy($sourceImage);

        return

    }
}