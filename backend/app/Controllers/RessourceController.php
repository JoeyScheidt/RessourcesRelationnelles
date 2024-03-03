<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\RessourceModel;
use CodeIgniter\HTTP\ResponseInterface;

class RessourceController extends BaseController
{
    public function search()
    {
        $model = new RessourceModel();
        $ressources = $model->findAll();

        return $this->response->setJSON($ressources);
    }

    public function create() {
        if (count($this->request->getPost()) > 0){
            $model = new RessourceModel();
            $data = [
                'ressource_titre' => $this->request->getPost('titre'),
                'ressource_description' => $this->request->getPost('description'),
                'ressource_contenu' => $this->request->getPost('contenu'),
                'categorie_id' => $this->request->getPost('categorieId'),
                'typeRessources_id' => $this->request->getPost('typeRessourceId'),
            ];
        
            if (!$this->validate([
                'titre' => 'required',
                'description' => 'required',
                'contenu' => 'required',
                'categorieId' => 'required',
                'typeRessourceId' => 'required'
            ])) {
                return $this->response
                            ->setJSON(['message' => $this->validator->getErrors()])
                            ->setStatusCode(ResponseInterface::HTTP_BAD_REQUEST);
            }

            $model->insert($data);

            return $this->response
                        ->setJSON(['message' => 'Ressource créée avec succès.', 'id' => $model->getInsertID()])
                        ->setStatusCode(ResponseInterface::HTTP_CREATED);
        }
    }
}
