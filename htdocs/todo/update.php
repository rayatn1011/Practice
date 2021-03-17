<?php
/**
 * @param integer $id
 * @param string $todo
 */

// find todo from DB,by $id
// update todo content by $todo
// store todo into DB

// return result: success &data
$result = [
    'status' => 'success',
    'data' => $_POST['todo'],
]; 

echo json_encode($result);
?>