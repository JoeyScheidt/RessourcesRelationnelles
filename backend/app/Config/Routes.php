<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');


// https://codeigniter.com/user_guide/incoming/restful.html
$routes->get('api/helloworld', 'HelloWorld::index');
$routes->group('api', function($routes) {
    $routes->get('ressources', 'RessourceController::index');
    $routes->post('ressources', 'RessourceController::create');

});