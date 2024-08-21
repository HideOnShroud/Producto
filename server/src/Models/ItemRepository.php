<?php

namespace Producto\Models;

use PDO;

class ItemRepository {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function save(Item $item): bool {
        try {
            $this->db->beginTransaction();

            $statement = $this->db->prepare(
                "INSERT INTO products (sku, name, price, productType) 
                 VALUES (:sku, :name, :price, :productType)"
            );

            $statement->bindValue(':sku', $item->getSku(), PDO::PARAM_STR);
            $statement->bindValue(':name', $item->getName(), PDO::PARAM_STR);
            $statement->bindValue(':price', $item->getPrice(), PDO::PARAM_STR);
            $statement->bindValue(':productType', $item->getProductType(), PDO::PARAM_STR);

            $statement->execute();

            $productId = $item->getSku();
            $attributesHandler = ProductAttributesFactory::createAttributesHandler($item->getProductType());
            $attributesHandler->saveAttributes($productId, $item, $this->db);

            $this->db->commit();
            return true;
        } catch (\PDOException $e) {
            $this->db->rollBack();
            error_log("PDO Exception in save(): " . $e->getMessage()); // Log error
            return false;
        } catch (\Exception $e) {
            $this->db->rollBack();
            error_log("Exception in save(): " . $e->getMessage()); // Log error
            return false;
        }
    }

    public function delete(string $sku): bool {
        try {
            $this->db->beginTransaction();

            $statement = $this->db->prepare("DELETE FROM products WHERE sku = :sku");
            $statement->bindValue(':sku', $sku, PDO::PARAM_STR);
            $statement->execute();

            if ($statement->rowCount() === 0) {
                error_log("No rows deleted. SKU: $sku"); // Log if no rows were deleted
            }

            $this->db->commit();
            return $statement->rowCount() > 0;
        } catch (\PDOException $e) {
            $this->db->rollBack();
            error_log("PDO Exception in delete(): " . $e->getMessage()); // Log error
            return false;
        } catch (\Exception $e) {
            $this->db->rollBack();
            error_log("Exception in delete(): " . $e->getMessage()); // Log error
            return false;
        }
    }

    public function readAll(): array {
        try {
            $statement = $this->db->query("SELECT * FROM products");
            $products = $statement->fetchAll(PDO::FETCH_ASSOC);

            if (empty($products)) {
                error_log("No products found in the products table."); // Log if no products are found
            }

            foreach ($products as &$product) {
                $attributesHandler = ProductAttributesFactory::createAttributesHandler($product['productType']);
                $product['attributes'] = $attributesHandler->loadAttributes($this->db, $product['sku']);
            }

            return $products;
        } catch (\PDOException $e) {
            error_log("PDO Exception in readAll(): " . $e->getMessage()); // Log error
            return [];
        }
    }
}
