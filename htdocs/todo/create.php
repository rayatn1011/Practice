<?php
    /**
     * @param string $todo
     */

    // store $toodo ingto DB
    // return result: success & data
    $result = [
        'status' => 'success',
        'data' => $_POST['todo'],
    ]; 

    echo json_encode($result);
?>