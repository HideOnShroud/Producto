<?php

namespace Producto\Models;

use PDO;

class DvdAttributesHandler {
    public function saveAttributes(string $productId, Dvd $dvd, PDO $db): void {
        $statement = $db->prepare("INSERT INTO product_dvd (product_id, size) VALUES (:product_id, :size)");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->bindValue(':size', $dvd->getSize(), PDO::PARAM_STR);
        $statement->execute();
    }

    public function loadAttributes(PDO $db, string $productId): array {
        $statement = $db->prepare("SELECT * FROM product_dvd WHERE product_id = :product_id");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC) ?: [];
    }
}
