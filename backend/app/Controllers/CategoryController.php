<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\CategoryModel;

class CategoryController extends BaseController
{
    public function search()
    {
        $model = new CategoryModel();
        $categories = $model->findAll();

        return $this->response->setJSON($categories);
    }
}
