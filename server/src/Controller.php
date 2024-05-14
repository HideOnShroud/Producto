<?php
namespace Producto;

class Controller{
    protected function jsonResponse($data, $statusCode = 200){
        header('Content-Type: application/json');
        http_response_code($statusCode);
        echo json_encode($data);
        exit();
    }

    
    protected function errorResponse($message, $statusCode = 400){
        $response = ['error' => $message];
        $this->jsonResponse($response, $statusCode);
    }
}

