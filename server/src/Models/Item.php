<?php

namespace Producto\Models;

use PDO;

abstract class Item {
    protected $sku;
    protected $name;
    protected $price;

    public function __construct(array $data) {
        $this->sku = $data['sku'];
        $this->name = $data['name'];
        $this->price = $data['price'];
    }

    public function getSku(): string {
        return $this->sku;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getPrice(): float {
        return $this->price;
    }

    abstract public function getProductType(): string;
    abstract public function saveSpecificAttributes(string $productId, PDO $db): void;
}
