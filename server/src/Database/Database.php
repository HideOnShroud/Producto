<?php

namespace Producto\Database;

use PDO;
use PDOException;

class Database
{
    private static $instance;
    private $connection;


    private function __construct(){
        // database config
        $config = include __DIR__ . '/../config/database.php';

        $dsn = "mysql:host={$config['host']};dbname={$config['database']};port={$config['port']};charset={$config['charset']}";

        try {
            $this->connection = new PDO($dsn, $config['username'], $config['password']);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die('Database connection failed: ' . $e->getMessage());
        }
    }


    // sngleton method
    public static function getInstance(){
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }


    public function getConnection(){
        return $this->connection;
    }
}
