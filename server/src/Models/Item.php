<?php

namespace Producto\Models;

use PDO;

class Item
{
    protected $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function create($data) {
        $sku = $data['sku'];
        $name = $data['name'];
        $price = $data['price'];
        $productType = $data['productType'];
        $size = $data['size'];
        $weight = $data['weight'];
        $height = $data['height'];
        $width = $data['width'];
        $length = $data['length'];

        try {
            $statement = $this->db->prepare("INSERT INTO items (sku, name, price, productType, size, weight, height, width, length ) VALUES (:sku, :name, :price, :productType, :size, :weight, :height, :width, :length)");
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

    public function read() {
        try {
            $statement = $this->db->query("SELECT * FROM items");
            return $statement->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return [];
        }
    }

    public function delete($id) {

        try {
            $statement = $this->db->prepare("DELETE FROM items WHERE sku = :id");
            $statement->bindParam(':id', $id);
            $statement->execute();
            return true;
        } catch (\PDOException $e) {
            return false;
        }
    }
}
