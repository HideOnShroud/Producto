<?php

namespace Producto\Models;

use PDO;

class BookAttributesHandler {
    public function saveAttributes(string $productId, Book $book, PDO $db): void {
        $statement = $db->prepare("INSERT INTO product_book (product_id, weight) VALUES (:product_id, :weight)");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->bindValue(':weight', $book->getWeight(), PDO::PARAM_STR);
        $statement->execute();
    }

    public function loadAttributes(PDO $db, string $productId): array {
        $statement = $db->prepare("SELECT * FROM product_book WHERE product_id = :product_id");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC) ?: [];
    }
}
