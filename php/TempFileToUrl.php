<?php

/**
 * Created by PhpStorm.
 * User: AKS
 * Date: 3/9/2017
 * Time: 11:10 AM
 */
class TempFileToUrl
{
    private $webFolderLocation;
    private $webBaseUrl;

    /**
     * TempFileToUrl constructor.
     * @param $webFolderLocation
     * @param $webBaseUrl
     */
    public function __construct($webFolderLocation, $webBaseUrl)
    {

        $this->webFolderLocation = $webFolderLocation;
        $this->webBaseUrl = $webBaseUrl;
    }


    public function getUrl($fileName)
    {

        rename($fileName, $this->webFolderLocation . $fileName);

        return $this->webFolderLocation . $fileName;

    }
}