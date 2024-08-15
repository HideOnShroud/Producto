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

        if (isset($this->routes[$method][$uri])) {
            $controllerClass = $this->routes[$method][$uri]['controller'];
            $action = $this->routes[$method][$uri]['action'];

           

            if (class_exists($controllerClass)) {
                $controller = new $controllerClass();
                if (method_exists($controller, $action)) {
                    $controller->$action();
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => "Action $action not found in $controllerClass"]);
                }
            } else {
                http_response_code(500);
                echo json_encode(['error' => "Controller class $controllerClass not found"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(['error' => "No route found for URI: $uri"]);
        }
    }
}
