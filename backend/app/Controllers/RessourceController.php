<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\RessourceModel;
use CodeIgniter\HTTP\ResponseInterface;

class RessourceController extends BaseController
{

    public function options()
    {
        return $this->response->setHeader('Allow', 'PUT, DELETE')->setStatusCode(ResponseInterface::HTTP_OK);
    }

    public function search()
    {
        $model = new RessourceModel();
        $ressources = $model->getRessourcesWithLibelleTrad();

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

    public function update($id) {
        $model = new RessourceModel();

        // Vérifiez si la ressource existe
        $ressource = $model->find($id);

        if ($ressource === null) {
            return $this->response
                        ->setJSON(['message' => 'Ressource non trouvée.'])
                        ->setStatusCode(ResponseInterface::HTTP_NOT_FOUND);
        }

        // Préparez les données à mettre à jour
        $data = [
            'ressource_titre' => $this->request->getJSONVar('titre'),
            'ressource_description' => $this->request->getJSONVar('description'),
            'ressource_contenu' => $this->request->getJSONVar('contenu'),
            'categorie_id' => $this->request->getJSONVar('categorieId'),
            'typeRessources_id' => $this->request->getJSONVar('typeRessourceId'),
        ];

        // Effectuez la mise à jour
        $model->update($id, $data);

        return $this->response
                    ->setJSON(['message' => 'Ressource mise à jour avec succès.', 'id' => $id])
                    ->setStatusCode(ResponseInterface::HTTP_OK);
    }

    public function delete($id)
    {
        // Instancier le modèle de la ressource
        $model = new RessourceModel();

        // Vérifier si la ressource existe
        $ressource = $model->find($id);

        if ($ressource === null) {
            // Si la ressource n'existe pas, renvoyer une réponse 404
            return $this->response
                        ->setJSON(['message' => 'Ressource non trouvée.'])
                        ->setStatusCode(ResponseInterface::HTTP_NOT_FOUND);
        }

        // Supprimer la ressource
        $model->delete($id);

        return $this->response
                    ->setJSON(['message' => 'Ressource supprimée avec succès.', 'id' => $id])
                    ->setStatusCode(ResponseInterface::HTTP_OK);
    }
}
