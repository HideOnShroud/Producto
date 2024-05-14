<?php

namespace Producto\Database;

use Producto\Database\Database;

class Delete
{
    public function deleteItem($id){
        $db = Database::getInstance()->getConnection();

        try {
            $stmt = $db->prepare("DELETE FROM items WHERE sku = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            return true;
        } catch (\PDOException $e) {
            return false;
        }
    }
}