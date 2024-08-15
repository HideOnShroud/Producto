<?php

require_once 'path/to/Database.php';
require_once 'path/to/DatabaseInitializer.php';

$db = Producto\Database\Database::getInstance()->getConnection();
Producto\Database\DatabaseInitializer::initialize($db);
$db = null;
