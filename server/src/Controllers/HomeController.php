<?php

namespace Producto\Controllers;

use Producto\Controller;


class HomeController extends Controller{
    public function index(){
        $this->render("main");
    }
}

