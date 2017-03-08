<?php

/**
 * Created by PhpStorm.
 * User: AKS
 * Date: 7/28/2016
 * Time: 1:41 AM
 */
Class SaveLoadedFile
{

    private $fileLocationOnServer;
    private $fileName;
    private $fileUrlBase;
    private $mimeType;

    /**
     * SaveLoadedFile constructor.
     * @param $fileUrlBase
     * @param $tempFileLocation
     * @param $fileName
     */
    public function __construct($fileUrlBase, $tempFileLocation, $fileName, $mimeType)
    {

        $this->fileLocationOnServer = $tempFileLocation;
        $this->fileName = $fileName;
        $this->fileUrlBase = $fileUrlBase;
        if ($mimeType == 'image/jpeg') {
            $this->mimeType = "jpg";
        } else if ($mimeType == 'image/png') {
            $this->mimeType = "png";
        }
    }

    public function saveThisLocation($tempFileLocation)
    {

        $x = move_uploaded_file($tempFileLocation, $this->fileLocationOnServer . '/' . $this->fileName . "." . $this->mimeType);

    }

    /**
     *
     */
    public function getFileLocationOnServer()
    {
        return array(
            'url' => $this->fileUrlBase . '/' . $this->fileName . "." . $this->mimeType,
            'location' => $this->fileLocationOnServer . '/' . $this->fileName . "." . $this->mimeType
        );
    }

}