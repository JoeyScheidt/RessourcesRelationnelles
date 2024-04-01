<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'HomeController::index');


// https://codeigniter.com/user_guide/incoming/restful.html
$routes->get('api/helloworld', 'HelloWorld::index');
$routes->group('api', function($routes) {
    $routes->group('ressources', function($routes) {
        $routes->post('search', 'RessourceController::search');
        $routes->options('search', 'RessourceController::options');
        $routes->post('create', 'RessourceController::create');
        $routes->put('update/(:num)', 'RessourceController::update/$1');
        $routes->options('update/(:num)', 'RessourceController::options');
        $routes->delete('delete/(:num)', 'RessourceController::delete/$1');
        $routes->options('delete/(:num)', 'RessourceController::options');
        $routes->post('marquer', 'RessourceController::marquer');
        $routes->options('marquer', 'RessourceController::options');
    });
    $routes->group('commentaires', function($routes) {
        $routes->post('search', 'CommentController::search');
        $routes->post('create', 'CommentController::create');
        $routes->options('create', 'CommentController::options');
    });
    $routes->group('categories', function($routes) {
        $routes->get('search', 'CategoryController::search');
    });
    $routes->group('typeRelations', function($routes) {
        $routes->get('search', 'TypeRelationController::search');
    });
    $routes->group('typeRessources', function($routes) {
        $routes->get('search', 'TypeRessourceController::search');
    });
    $routes->group('utilisateur', function($routes) {
        $routes->post('register', 'UserController::register');
        $routes->post('login', 'UserController::login');
        $routes->get('logout', 'UserController::logout');
        $routes->post('forgotPassword', 'UserController::sendEmail');
    });
});