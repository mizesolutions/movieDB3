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
    $conn = new PDO("mysql:host=$se;dbname=mizesolu_movies", $us, $pa);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare('SELECT * FROM MOVIES WHERE ID = ?');
    $stmt->execute([$ID[0]]);

    http_response_code(200);

    $conn = null;

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

  } catch(PDOException $e){
    echo $conn;
    echo $e->getMessage();
  }

?>
