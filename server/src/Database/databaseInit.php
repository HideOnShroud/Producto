<?php

require_once 'Database.php';
require_once 'DatabaseInitializer.php';
use Producto\Database\Database;
use Producto\Database\DatabaseInitializer;

$db = Database::getInstance()->getConnection();
DatabaseInitializer::initialize($db);
$db = null;
