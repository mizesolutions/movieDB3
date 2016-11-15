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
  $year = $data[1];
  $studio = $data[2];
  $price = $data[3];
  $ID = $data[4];

  require_once "../format_function/dollarFormat_functions.php";

  try {

    $conn = new PDO("mysql:host=$se;dbname=mizesolu_movies", $us, $pa);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "UPDATE MOVIES SET TITLE = :Title,
            YEAR = :Year,
            STUDIO = :Studio,
            PRICE = :Price
            WHERE ID = :ID";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':Title', $title, PDO::PARAM_STR);
    $stmt->bindParam(':Year', $year, PDO::PARAM_STR);
    $stmt->bindParam(':Studio', $studio, PDO::PARAM_STR);
    $stmt->bindParam(':Price', $price, PDO::PARAM_STR);
    $stmt->bindParam(':ID', $ID, PDO::PARAM_STR);
    $stmt->execute();

    http_response_code(200);

    $conn = null;

  } catch(PDOException $e){
    echo $conn;
    echo $e->getMessage();
  }

?>
