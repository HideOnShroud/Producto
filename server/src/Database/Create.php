<?php

namespace Producto\Database;

use Producto\Database\Database;

class Create
{
    public function createItem($data){
        $db = Database::getInstance()->getConnection();
        
        $sku = $data['sku'] ?? '';
        $name = $data['name'] ?? '';
        $price = $data['price'] ?? '';
        $productType = $data['productType'] ?? '';
        $size = $data['size'] ?? null;
        $weight = $data['weight'] ?? null;
        $height = $data['height'] ?? null;
        $width = $data['width'] ?? null;
        $length = $data['length'] ?? null;

        try {
            $statement = $db->prepare("INSERT INTO items (sku, name, price, productType, size, weight, height, width, length ) VALUES (:sku, :name, :price, :productType, :size, :weight, :height, :width, :length)");
            $statement->bindParam(':sku', $sku);
            $statement->bindParam(':name', $name);
            $statement->bindParam(':price', $price);
            $statement->bindParam(':productType', $productType);
            $statement->bindParam(':size', $size);
            $statement->bindParam(':weight', $weight);
            $statement->bindParam(':height', $height);
            $statement->bindParam(':width', $width);
            $statement->bindParam(':length', $length);
            $statement->execute();
            return true;
        } catch (\PDOException $e) {
            return false;
        }
    }
}