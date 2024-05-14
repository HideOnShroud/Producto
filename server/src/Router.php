<?php
namespace Producto;

class Router {
    protected $routes = [];

    public function addRoute($route, $controller, $action, $method) {
        $this->routes[$method][$route] = ['controller' => $controller, 'action' => $action];
    }


    public function get($route, $controller, $action) {
        $this->addRoute($route, $controller, $action, "GET");
    }


    public function post($route, $controller, $action) {
        $this->addRoute($route, $controller, $action, "POST");
    }


    public function delete($route, $controller, $action) {
        $this->addRoute($route, $controller, $action, "DELETE");
    }

    
    public function dispatch() {
        $uri = strtok($_SERVER['REQUEST_URI'], '?');
        $method = $_SERVER['REQUEST_METHOD'];

        if (array_key_exists($uri, $this->routes[$method])) {
            $controllerClass = $this->routes[$method][$uri]['controller'];
            $action = $this->routes[$method][$uri]['action'];

            $controller = new $controllerClass();
            $controller->$action();
        } else {
            http_response_code(404);
            echo json_encode(['error' => "No route found for URI: $uri"]);
        }
    }
}
