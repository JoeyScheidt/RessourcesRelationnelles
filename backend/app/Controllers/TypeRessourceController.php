<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\TypeRessourceModel;

class TypeRessourceController extends BaseController
{
    public function search()
    {
        $model = new TypeRessourceModel();
        $typeRessources = $model->findAll();

        return $this->response->setJSON($typeRessources);
    }
}
