<?php

use Producto\Router;
use Producto\Controllers\HomeController;

$router = new Router();

$router->get("/", HomeController::class, "index");
$router->delete("/", HomeController::class, "delete");
$router->post("/addproduct", HomeController::class, "create");
$router->dispatch();