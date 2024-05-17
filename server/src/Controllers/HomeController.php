<?php

namespace Producto\Controllers;

use Producto\Controller;
use Producto\Database\Database;
use Producto\Models\Item;


class HomeController extends Controller{
    public function index() {
        $db = Database::getInstance()->getConnection();
        
        $read = new Item($db);
        $data = $read->read();
        
        $this->jsonResponse($data);
    }
    
    
    public function create() {
        $requestData = file_get_contents('php://input');
        $decodedData = json_decode($requestData, true);
        $db = Database::getInstance()->getConnection();
        $create = new Item($db);
        $result = $create->create($decodedData);
        if ($result) {
            $responseData = [
                'message' => 'Resource created successfully!'
            ];
            $this->jsonResponse($responseData);
        } else {
            $responseData = [
                'error' => 'Failed to create resource.'
            ];
            $this->jsonResponse($responseData, 500);
        }
    
        
    }
    
    
    public function delete() {
        
        $db = Database::getInstance()->getConnection();
        $delete = new Item($db);
        $requestData = file_get_contents('php://input');
        $decodedData = json_decode($requestData, true);
        $id = $decodedData['sku'];
        $result = $delete->delete($id);

        if ($result) {
            $responseData = [
                'message' => 'Resource deleted successfully!'
            ];
            $this->jsonResponse($responseData);
        } else {
            $responseData = [
                'error' => 'Failed to delete resource.'
            ];
            $this->jsonResponse($responseData, 500);
        }
    }
}

