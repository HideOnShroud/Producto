<?php

namespace Producto\Database;

use Producto\Database\Database;

class Read{
    public function readItems(){
        $db = Database::getInstance()->getConnection();

        try {
            $statement = $db->query("SELECT * FROM items");
            return $statement->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return [];
        }
    }
}