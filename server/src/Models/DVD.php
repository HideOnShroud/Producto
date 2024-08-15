<?php

namespace Producto\Models;

use PDO;

class DVD extends Item {
    private $size;

    public function __construct(array $data) {
        parent::__construct($data);
        $this->size = $data['size_mb'];
    }

    public function getProductType(): string {
        return 'DVD';
    }

    public function getSize(): float {
        return $this->size;
    }

    public function saveSpecificAttributes(string $productId, PDO $db): void {
        $statement = $db->prepare("INSERT INTO product_dvd (product_id, size_mb) VALUES (:product_id, :size_mb)");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->bindValue(':size_mb', $this->size, PDO::PARAM_STR);
        $statement->execute();
    }
}