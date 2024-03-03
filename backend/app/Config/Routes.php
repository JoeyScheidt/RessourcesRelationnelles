<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'HomeController::index');


// https://codeigniter.com/user_guide/incoming/restful.html
$routes->get('api/helloworld', 'HelloWorld::index');
$routes->group('api', function($routes) {
    $routes->get('ressources', 'RessourceController::search');
    $routes->post('ressources', 'RessourceController::create');
    $routes->get('categories', 'CategoryController::search');
    $routes->get('typeRelations', 'TypeRelationController::search');
    $routes->get('typeRessources', 'TypeRessourceController::search');
    $routes->post('register', 'UserController::register');
    $routes->post('login', 'UserController::login');
});