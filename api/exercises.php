<?php
/*  require_once '../includes/config.php'; // The mysql database connection script
  $status = '%';
  if (isset($_GET['status'])) {
    $status = $_GET['status'];
  }
  $query = "select ID, TASK, STATUS from tasks where status like '$status' order by status,id desc";
  $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

  $arr = array();
  if($result->num_rows > 0) {
   while($row = $result->fetch_assoc()) {
   $arr[] = $row;
   }
  }
*/
  $arr = array (
             "exercises"  => array("a" => "orange", "b" => "banana", "c" => "apple")
         );
  # JSON-encode the response
  echo $json_response = json_encode($arr);
?>