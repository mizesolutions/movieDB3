<?php
  /*
  Brian Mize
  CSCD378
  Movie DB assignment
  */
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  $data = $_POST['data'];

  $title = $data[0];

  require_once "../format_function/dollarFormat_functions.php";

  try {

    $conn = new PDO("mysql:host=$se;dbname=mizesolu_movieList", $us, $pa);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO MOVIES (TITLE)
            VALUES (:Title)";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':Title', $title, PDO::PARAM_STR);
    $stmt->execute();

    http_response_code(201);

    $conn = null;

  } catch(PDOException $e){
    echo $conn;
    echo $e->getMessage();

  }

?>
