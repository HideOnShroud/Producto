<?php

namespace Producto\Models;

use PDO;

class FurnitureAttributesHandler {
    public function saveAttributes(string $productId, Furniture $furniture, PDO $db): void {
        $statement = $db->prepare("INSERT INTO product_furniture (product_id, height_cm, width_cm, length_cm) VALUES (:product_id, :height_cm, :width_cm, :length_cm)");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->bindValue(':height_cm', $furniture->getHeight(), PDO::PARAM_STR);
        $statement->bindValue(':width_cm', $furniture->getWidth(), PDO::PARAM_STR);
        $statement->bindValue(':length_cm', $furniture->getLength(), PDO::PARAM_STR);
        $statement->execute();
    }

    public function loadAttributes(PDO $db, string $productId): array {
        $statement = $db->prepare("SELECT * FROM product_furniture WHERE product_id = :product_id");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC) ?: [];
    }
}
