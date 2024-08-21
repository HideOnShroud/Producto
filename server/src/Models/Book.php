<?php

namespace Producto\Models;

use PDO;

class Book extends Item {
    private $weight;

    public function __construct(array $data) {
        parent::__construct($data);
        $this->weight = $data['weight'];
    }

    public function getProductType(): string {
        return 'Book';
    }

    public function getWeight(): float {
        return $this->weight;
    }

    public function saveSpecificAttributes(string $productId, PDO $db): void {
        $statement = $db->prepare("INSERT INTO product_book (product_id, weight) VALUES (:product_id, :weight)");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->bindValue(':weight', $this->weight, PDO::PARAM_STR);
        $statement->execute();
    }
}
