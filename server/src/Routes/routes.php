<?php

use Producto\Router;
use Producto\Controllers\HomeController;
$router = new Router();

$router->get("/", HomeController::class, "index");
$router->dispatch();