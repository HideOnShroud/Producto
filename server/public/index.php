<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require '../vendor/autoload.php';

// require_once'../src/Database/Database.php';
// require_once'../src/Database/DatabaseInitializer.php';
// $db = Producto\Database\Database::getInstance()->getConnection();
// Producto\Database\DatabaseInitializer::initialize($db);
// $db = null; // Close the connection

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight request
    exit;
}


$router = require '../src/Routes/routes.php';
// $router->dispatch();
// if you cannot run databaseInit.php, you can uncomment the following line to create the tables then comment it back.