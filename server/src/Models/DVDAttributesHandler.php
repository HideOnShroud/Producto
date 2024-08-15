<?php

namespace Producto\Models;

use PDO;

class DVDAttributesHandler {
    public function saveAttributes(string $productId, DVD $dvd, PDO $db): void {
        $statement = $db->prepare("INSERT INTO product_dvd (product_id, size_mb) VALUES (:product_id, :size_mb)");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->bindValue(':size_mb', $dvd->getSize(), PDO::PARAM_STR);
        $statement->execute();
    }

    public function loadAttributes(PDO $db, string $productId): array {
        $statement = $db->prepare("SELECT * FROM product_dvd WHERE product_id = :product_id");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC) ?: [];
    }
}
