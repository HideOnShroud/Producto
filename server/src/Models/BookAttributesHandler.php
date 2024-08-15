<?php

namespace Producto\Models;

use PDO;

class BookAttributesHandler {
    public function saveAttributes(string $productId, Book $book, PDO $db): void {
        $statement = $db->prepare("INSERT INTO product_book (product_id, weight_kg) VALUES (:product_id, :weight_kg)");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->bindValue(':weight_kg', $book->getWeight(), PDO::PARAM_STR);
        $statement->execute();
    }

    public function loadAttributes(PDO $db, string $productId): array {
        $statement = $db->prepare("SELECT * FROM product_book WHERE product_id = :product_id");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC) ?: [];
    }
}
