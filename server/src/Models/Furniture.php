<?php

namespace Producto\Models;

use PDO;

class Furniture extends Item {
    private $height;
    private $width;
    private $length;

    public function __construct(array $data) {
        parent::__construct($data);
        $this->height = $data['height_cm'];
        $this->width = $data['width_cm'];
        $this->length = $data['length_cm'];
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
        $statement = $db->prepare("INSERT INTO product_furniture (product_id, height_cm, width_cm, length_cm) VALUES (:product_id, :height_cm, :width_cm, :length_cm)");
        $statement->bindValue(':product_id', $productId, PDO::PARAM_STR);
        $statement->bindValue(':height_cm', $this->height, PDO::PARAM_STR);
        $statement->bindValue(':width_cm', $this->width, PDO::PARAM_STR);
        $statement->bindValue(':length_cm', $this->length, PDO::PARAM_STR);
        $statement->execute();
    }
}
