<?php

namespace Producto\Database;

use PDO;

class DatabaseInitializer
{
    public static function initialize(PDO $db)
    {
        try {
            $db->exec("DROP TABLE IF EXISTS product_dvd");
            $db->exec("DROP TABLE IF EXISTS product_book");
            $db->exec("DROP TABLE IF EXISTS product_furniture");
            $db->exec("DROP TABLE IF EXISTS products");

            $db->exec("CREATE TABLE IF NOT EXISTS products (
                sku VARCHAR(50) PRIMARY KEY,
                name VARCHAR(255),
                price DECIMAL(10,2),
                productType VARCHAR(100)
            )");

            $db->exec("CREATE TABLE IF NOT EXISTS product_dvd (
                product_id VARCHAR(50) PRIMARY KEY,
                size_mb DECIMAL(10,2),
                FOREIGN KEY (product_id) REFERENCES products(sku) ON DELETE CASCADE
            )");

            $db->exec("CREATE TABLE IF NOT EXISTS product_book (
                product_id VARCHAR(50) PRIMARY KEY,
                weight_kg DECIMAL(10,2),
                FOREIGN KEY (product_id) REFERENCES products(sku) ON DELETE CASCADE
            )");

            $db->exec("CREATE TABLE IF NOT EXISTS product_furniture (
                product_id VARCHAR(50) PRIMARY KEY,
                height_cm DECIMAL(10,2),
                width_cm DECIMAL(10,2),
                length_cm DECIMAL(10,2),
                FOREIGN KEY (product_id) REFERENCES products(sku) ON DELETE CASCADE
            )");

            echo "Tables created successfully";
        } catch (\PDOException $e) {
            echo "Error creating tables: " . $e->getMessage();
        }
    }
}
