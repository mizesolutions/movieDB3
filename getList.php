<?php
  /*
  Brian Mize
  CSCD378
  Movie DB assignment
  */
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  require_once "../format_function/dollarFormat_functions.php";

  try {
    $conn = new PDO("mysql:host=$se;dbname=mizesolu_movieList", $us, $pa);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = 'SELECT TITLE
            FROM MOVIES
            ORDER BY TITLE ASC';

    // store result in $result
    $result = $conn->query($sql);

    http_response_code(200);

    $conn = null;

    echo json_encode($result->fetchAll(PDO::FETCH_ASSOC));

  } catch(PDOException $e){
    echo $conn;
    echo $e->getMessage();
  }

?>
