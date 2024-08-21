<?php

namespace Producto\Models;

use PDO;

class FurnitureAttributesHandler {
    public function saveAttributes(string $productId, Furniture $furniture, PDO $db): void {
        $statement = $db->prepare("INSERT INTO product_furniture (product_id, height, width, length) VALUES (:product_id, :height, :width, :length)");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->bindValue(':height', $furniture->getHeight(), PDO::PARAM_STR);
        $statement->bindValue(':width', $furniture->getWidth(), PDO::PARAM_STR);
        $statement->bindValue(':length', $furniture->getLength(), PDO::PARAM_STR);
        $statement->execute();
    }

    public function loadAttributes(PDO $db, string $productId): array {
        $statement = $db->prepare("SELECT * FROM product_furniture WHERE product_id = :product_id");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC) ?: [];
    }
}
