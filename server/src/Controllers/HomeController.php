<?php

namespace Producto\Controllers;

use Producto\Controller;
use Producto\Database\Create;
use Producto\Database\Delete;
use Producto\Database\Read;

class HomeController extends Controller{
    public function index() {
        $read = new Read();
        $data = $read->readItems();
       
        $this->jsonResponse($data);
    }


    public function create() {
        $requestData = file_get_contents('php://input');
        $decodedData = json_decode($requestData, true);
        $create = new Create();
        $result = $create->createItem($decodedData);
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

        $delete = new Delete();
        $requestData = file_get_contents('php://input');
        $decodedData = json_decode($requestData, true);
        $id = $decodedData['sku'];
        $result = $delete->deleteItem($id);

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

