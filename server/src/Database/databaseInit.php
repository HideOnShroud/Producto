<?php

use Producto\Database\Database;
require_once 'Database.php';

$db = Database::getInstance()->getConnection();

try {
    // SQL create table
    $sql = "CREATE TABLE IF NOT EXISTS items (
        sku VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255),
        price DECIMAL(10,5),
        productType VARCHAR(100),
        size DECIMAL(10,5),
        weight DECIMAL(10,5),
        height DECIMAL(10,5),
        width DECIMAL(10,5),
        length DECIMAL(10,5),
        UNIQUE(sku)
    )";

    $db->exec($sql);
    echo "Table items created successfully";
} catch(PDOException $e) {
    echo "Error creating table: " . $e->getMessage();
}

$db = null;