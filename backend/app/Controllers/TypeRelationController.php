<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\TypeRelationModel;

class TypeRelationController extends BaseController
{
    public function search()
    {
        $model = new TypeRelationModel();
        $typeRelations = $model->findAll();

        return $this->response->setJSON($typeRelations);
    }
}
