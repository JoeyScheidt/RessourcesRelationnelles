<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\RessourceModel;

class RessourceController extends BaseController
{
    public function index()
    {
        $model = new RessourceModel();
        $ressources = $model->findAll();

        return $this->response->setJSON($ressources);
    }

    public function create() {
        $model = new RessourceModel();
        $model = new RessourceModel();
        $data = [
            'titre' => $this->request->getPost('titre'),
            'description' => $this->request->getPost('description'),
            'contenu' => $this->request->getPost('contenu'),
            // Ajoutez d'autres champs selon votre table de base de données
        ];

        // Validation des données
        if (!$this->validate([
            'titre' => 'required',
            'description' => 'required',
            'contenu' => 'required',
            // Ajoutez d'autres règles de validation selon vos champs
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
