<?php

namespace Producto\Models;

use InvalidArgumentException;

class ProductAttributesFactory {
    public static function createAttributesHandler(string $productType) {
        $handlerClass = __NAMESPACE__ . '\\' . ucfirst(strtolower($productType)) . 'AttributesHandler';

        if (!class_exists($handlerClass)) {
            throw new InvalidArgumentException("Handler class $handlerClass does not exist");
        }

        return new $handlerClass();
    }
}
