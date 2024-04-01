<?php

namespace App\Controllers;

use App\Config\Config;
use App\Controllers\BaseController;
use App\Models\MarquerModel;
use App\Models\RessourceModel;
use CodeIgniter\HTTP\ResponseInterface;
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

class RessourceController extends BaseController
{
    public function options()
    {
        return $this->response->setHeader('Allow', 'POST, PUT, DELETE')->setStatusCode(ResponseInterface::HTTP_OK);
    }

    public function search()
    {
        if (count($this->request->getPost()) > 0){
            $model = new RessourceModel();

            $conditions = [];

            $categorieId = $this->request->getPost('categorieId');
            if (!empty($categorieId)) {
                $conditions['ressource.categorie_id'] = $categorieId;
            }

            $typeRelationId = $this->request->getPost('typeRelationId');
            if (!empty($typeRelationId)) {
                $conditions['ressource.typeRelation_id'] = $typeRelationId;
            }

            $typeRessourceId = $this->request->getPost('typeRessourceId');
            if (!empty($typeRessourceId)) {
                $conditions['ressource.typeRessources_id'] = $typeRessourceId;
            }

            $isFromAccueil = $this->request->getPost('isFromAccueil');

            // Récupération du jeton d'authentification depuis l'en-tête de la requête
            $token = $this->request->getHeaderLine('Authorization');
            $decoded=null;

            // Si on accède aux ressources de l'utilisateur on veut également recupérer ses préferences
            if($token) {
                // On supprime "Bearer " pour obtenir uniquement le token JWT
                $token = substr($token, 7);

                $key = Config::JWT_SECRET_KEY;
                // Décodage du jeton JWT
                $decoded = JWT::decode($token, new Key($key, 'HS256'));

                $typeRessourceId = $this->request->getPost('typeRessourceId');
                //$conditions['marquer.utilisateur_id'] = $decoded->user_id;
            }

            $ressources = $model->getRessourcesWithLibelleTrad($conditions, $isFromAccueil, $decoded);

            return $this->response->setJSON($ressources);
        }
    }

    public function create() {
        if (count($this->request->getPost()) > 0){
            $model = new RessourceModel();
            $data = [
                'ressource_titre' => $this->request->getPost('titre'),
                'ressource_description' => $this->request->getPost('description'),
                'ressource_contenu' => $this->request->getPost('contenu'),
                'categorie_id' => $this->request->getPost('categorieId'),
                'typeRelation_id' => $this->request->getPost('typeRelationId'),
                'typeRessources_id' => $this->request->getPost('typeRessourceId'),
            ];
        
            if (!$this->validate([
                'titre' => 'required',
                'description' => 'required',
                'contenu' => 'required',
                'categorieId' => 'required',
                'typeRelationId' => 'required',
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
            'typeRelation_id' => $this->request->getJSONVar('typeRelationId'),
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

    public function marquer() {
        if (count($this->request->getPost()) > 0){
            $model = new MarquerModel();
        
            if (!$this->validate([
                'ressource_id' => 'required',
                'action' => 'required|in_list[favori,exploiter,mettreDeCote]'
            ])) {
                return $this->response
                            ->setJSON(['message' => $this->validator->getErrors()])
                            ->setStatusCode(ResponseInterface::HTTP_BAD_REQUEST);
            }

            // Récupération du jeton d'authentification depuis l'en-tête de la requête
            $token = $this->request->getHeaderLine('Authorization');

            // On supprime "Bearer " pour obtenir uniquement le token JWT
            $token = substr($token, 7);

            $key = Config::JWT_SECRET_KEY;
            // Décodage du jeton JWT
            $decoded = JWT::decode($token, new Key($key, 'HS256'));

            $conditions = [
                'utilisateur_id' => $decoded->user_id,
                'ressource_id' => $this->request->getPost('ressource_id')
            ];
            $marquerListe = $model->where($conditions)->first();
            
            
            // Les données à insert ou update en bdd
            $data = $conditions;

            // Si l'utilisateur n'a jamais marquer la ressource on ajoute en base ses préferences
            if(!$marquerListe) {
                // On met à jour les données selon l'action demandée
                switch ($this->request->getPost('action')) {
                    case 'favori':
                        $data['marquer_favori'] = 1;
                        break;
                    case 'exploiter':
                        $data['marquer_exploiter'] = 1;
                        break;
                    case 'mettreDeCote':
                        $data['marquer_mettre_de_cote'] = 1;
                        break;
                }
                $model->insert($data);
            }
            // Sinon on les met à jour
            else {
                // On met à jour les données selon l'action demandée et on met l'inverse de la donnée en base
                switch ($this->request->getPost('action')) {
                    case 'favori':
                        $data['marquer_favori'] = ($marquerListe['marquer_favori'] == 0) ? 1 : 0;
                        break;
                    case 'exploiter':
                        $data['marquer_exploiter'] = ($marquerListe['marquer_exploiter'] == 0) ? 1 : 0;
                        break;
                    case 'mettreDeCote':
                        $data['marquer_mettre_de_cote'] = ($marquerListe['marquer_mettre_de_cote'] == 0) ? 1 : 0;
                        break;
                }
                $model->update($marquerListe['marquer_id'], $data);
            }

            return $this->response
                        ->setJSON(['message' => 'Préference mise à jour avec succès.'])
                        ->setStatusCode(ResponseInterface::HTTP_OK);
        }
    }
}
