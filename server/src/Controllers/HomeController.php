<?php

namespace Producto\Controllers;

use Producto\Controller;
use Producto\Database\Database;
use Producto\Models\ItemFactory;
use Producto\Models\ItemRepository;
use InvalidArgumentException;

class HomeController extends Controller {

    private $itemRepository;

    public function __construct() {
        $db = Database::getInstance()->getConnection();
        $this->itemRepository = new ItemRepository($db);
    }

    public function index() {
        $data = $this->itemRepository->readAll();
        $this->jsonResponse($data);
    }

    public function create() {
        $requestData = file_get_contents('php://input');
        $decodedData = json_decode($requestData, true);

        try {
            $item = ItemFactory::createItem($decodedData);

            if ($item && $this->itemRepository->save($item)) {
                $this->jsonResponse(['message' => 'Resource created successfully!']);
            } else {
                $this->jsonResponse(['error' => 'Failed to create resource.'], 500);
            }
        } catch (InvalidArgumentException $e) {
            $this->jsonResponse(['error' => $e->getMessage()], 400);
        }
    }

    public function delete() {
        $requestData = file_get_contents('php://input');
        $decodedData = json_decode($requestData, true);
        $sku = $decodedData['sku'];

        if ($this->itemRepository->delete($sku)) {
            $this->jsonResponse(['message' => 'Resource deleted successfully!']);
        } else {
            $this->jsonResponse(['error' => 'Failed to delete resource.'], 500);
        }
    }
}
