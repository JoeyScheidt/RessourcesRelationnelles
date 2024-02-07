<?php
// https://codeigniter.com/user_guide/incoming/restful.html
namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;

class HelloWorld extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        // Créez votre réponse JSON
        $data = ['message' => 'Hello, World!'];

        // Utilisez la méthode `respond()` pour renvoyer la réponse au client au format JSON
        return $this->respond($data);
    }
}

?>