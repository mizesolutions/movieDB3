<?php

$data = $_POST['data'];

$title = $data[0];

$urlString = "https://api.themoviedb.org/3/search/movie?query=";
$urlString += rawurldecode($title);
$urlString += "&language=en-US&api_key=6daa32042b6b68aa55beeeb9a9d599a7";

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $urlString,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_POSTFIELDS => "{}",
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
?>
