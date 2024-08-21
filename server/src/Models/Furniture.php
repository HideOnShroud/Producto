<?php

namespace Producto\Models;

use PDO;

class Furniture extends Item {
    private $height;
    private $width;
    private $length;

    public function __construct(array $data) {
        parent::__construct($data);
        $this->height = $data['height'];
        $this->width = $data['width'];
        $this->length = $data['length'];
    }

    public function getProductType(): string {
        return 'Furniture';
    }

    public function getHeight(): float {
        return $this->height;
    }

    public function getWidth(): float {
        return $this->width;
    }

    public function getLength(): float {
        return $this->length;
    }

    public function saveSpecificAttributes(string $productId, PDO $db): void {
        $statement = $db->prepare("INSERT INTO product_furniture (product_id, height, width, length) VALUES (:product_id, :height, :width, :length)");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->bindValue(':height', $this->height, PDO::PARAM_STR);
        $statement->bindValue(':width', $this->width, PDO::PARAM_STR);
        $statement->bindValue(':length', $this->length, PDO::PARAM_STR);
        $statement->execute();
    }
}
