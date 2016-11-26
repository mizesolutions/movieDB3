<?php
  /*
  Brian Mize
  CSCD378
  Movie DB assignment
  */

  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  $ID = $_POST['data'];

  require_once "../format_function/dollarFormat_functions.php";

  try {

    $conn = new PDO("mysql:host=$se;dbname=mizesolu_tmdbList", $us, $pa);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "DELETE FROM MOVIES WHERE ID = :ID";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':ID', $ID[0], PDO::PARAM_STR);
    $stmt->execute();

    http_response_code(204);

    $conn = null;

  } catch(PDOException $e){
    echo $conn;
    echo $e->getMessage();
  }

?>
