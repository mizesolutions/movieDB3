<?php
  /*
  Brian Mize
  CSCD378
  Movie DB assignment
  */
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  $data = $_POST['data'];

  $poster = $data[0];
  $overview = $data[1];
  $year = $data[2];
  $title = $data[3];
  $studio = $data[4];
  $price = $data[5];

  require_once "../format_function/dollarFormat_functions.php";

  try {

    $conn = new PDO("mysql:host=$se;dbname=mizesolu_tmdbList", $us, $pa);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO MOVIES (POSTER, OVERVIEW, YEAR, TITLE, STUDIO, PRICE)
            VALUES (:Poster,:Overview,:Year,:Title,:Studio,:Price)";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':Poster', $poster, PDO::PARAM_STR);
    $stmt->bindParam(':Overview', $overview, PDO::PARAM_STR);
    $stmt->bindParam(':Year', $year, PDO::PARAM_STR);
    $stmt->bindParam(':Title', $title, PDO::PARAM_STR);
    $stmt->bindParam(':Studio', $studio, PDO::PARAM_STR);
    $stmt->bindParam(':Price', $price, PDO::PARAM_STR);
    $stmt->execute();

    http_response_code(201);

    $conn = null;

  } catch(PDOException $e){
    echo $conn;
    echo $e->getMessage();

  }

?>
