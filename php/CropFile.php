<?php

/**
 * Created by PhpStorm.
 * User: AKS
 * Date: 7/28/2016
 * Time: 2:14 AM
 */
abstract class CropFile
{
    private $locationOfSourceFile;
    private $locationOfUrl;

    /**
     * CropFile constructor.
     * @param $locationOfSourceFile
     */
    public function __construct($locationOfSourceFile,$locationOfUrl)
    {
        $this->locationOfSourceFile = $locationOfSourceFile;
        $this->locationOfUrl = $locationOfUrl;
    }

    /**
     * @return mixed
     */
    public function getLocationOfSourceFile()
    {
        return $this->locationOfSourceFile;
    }

}