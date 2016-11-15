<?php

$TITLE = $_POST['data'];

$client = new http\Client;
$request = new http\Client\Request;

$body = new http\Message\Body;
$body->append('{}');

$request->setRequestUrl('https://api.themoviedb.org/3/search/movie');
$request->setRequestMethod('GET');
$request->setBody($body);

$request->setQuery(new http\QueryString(array(
  'query' => ''.$TITLE.'',
  'language' => 'en-US',
  'api_key' => '6daa32042b6b68aa55beeeb9a9d599a7'
)));

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();

?>
