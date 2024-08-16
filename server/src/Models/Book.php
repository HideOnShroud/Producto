<?php

namespace Producto\Models;

use PDO;

class Book extends Item {
    private $weight;

    public function __construct(array $data) {
        parent::__construct($data);
        $this->weight = $data['weight_kg'];
    }

    public function getProductType(): string {
        return 'Book';
    }

    public function getWeight(): float {
        return $this->weight;
    }

    public function saveSpecificAttributes(string $productId, PDO $db): void {
        $statement = $db->prepare("INSERT INTO product_book (product_id, weight_kg) VALUES (:product_id, :weight_kg)");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->bindValue(':weight_kg', $this->weight, PDO::PARAM_STR);
        $statement->execute();
    }
}
