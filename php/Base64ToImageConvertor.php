<?php

/**
 * Created by PhpStorm.
 * User: AKS
 * Date: 3/9/2017
 * Time: 10:10 AM
 */
class Base64ToImageConverter
{


    public function convert($dataUrl)
    {
        if ($dataUrl == null)
            throw new Exception("Data url is empty");

        if (strpos($dataUrl, 'data:image/png;base64,') !== false) {

            $array = explode('data:image/png;base64,', $dataUrl);
            $fileContent = $array[1];
            $extension = "png";

        } else if (strpos($dataUrl, 'data:image/jpeg;base64,') !== false) {
            $array = explode('data:image/jpeg;base64,', $dataUrl);
            $fileContent = $array[1];
            $extension = "png";

        } else
            throw new Exception("Format not recognized");

        $tempDirectory = sys_get_temp_dir();

        // using tempname keeps the file till the end
        // till it is moved by symfony
        // using tmpfile() is a problem because we need to keep the file open to move
        // which is not possible ( because of read lock on file )
        // tmpfile is removed by the system on fclose / session end which is NOT what we
        // want

        // get filename
        $filename = tempnam($tempDirectory, "");

        // open it for write
        $handle = fopen($filename, "w");
        // write
        fwrite($handle, base64_decode($fileContent));
        // close
        fclose($handle);

        $this->replace_extension($filename, $extension);
        return $filename;


    }

    function replace_extension($filename, $new_extension)
    {
        $info = pathinfo($filename);
        return $info['filename'] . '.' . $new_extension;
    }
}