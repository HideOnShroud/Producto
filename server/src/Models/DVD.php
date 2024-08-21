<?php

namespace Producto\Models;

use PDO;

class Dvd extends Item {
    private $size;

    public function __construct(array $data) {
        parent::__construct($data);
        $this->size = $data['size'];
    }

    public function getProductType(): string {
        return 'Dvd';
    }

    public function getSize(): float {
        return $this->size;
    }

    public function saveSpecificAttributes(string $productId, PDO $db): void {
        $statement = $db->prepare("INSERT INTO product_dvd (product_id, size) VALUES (:product_id, :size)");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->bindValue(':size', $this->size, PDO::PARAM_STR);
        $statement->execute();
    }
}
