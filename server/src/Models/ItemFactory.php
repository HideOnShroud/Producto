<?php

namespace Producto\Models;

use InvalidArgumentException;

class ItemFactory {
    public static function createItem(array $data): ?Item {
        if (!isset($data['productType'])) {
            throw new InvalidArgumentException("Product type is missing");
        }

        $className = __NAMESPACE__ . '\\' . ucfirst(strtolower($data['productType']));

        if (!class_exists($className)) {
            throw new InvalidArgumentException("Class $className does not exist");
        }

        if (!is_subclass_of($className, Item::class)) {
            throw new InvalidArgumentException("$className is not a subclass of Item");
        }

        return new $className($data);
    }
}
