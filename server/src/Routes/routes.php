<?php

use Producto\Router;
use Producto\Controllers\HomeController;

$router = new Router();

$router->get("/api/", HomeController::class, "index");
$router->delete("/api/", HomeController::class, "delete");
$router->post("/api/addproduct", HomeController::class, "create");
$router->dispatch();