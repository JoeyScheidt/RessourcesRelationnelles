<?php

namespace App\Controllers;

use App\Config\Config;
use App\Controllers\BaseController;
use App\Models\CommentModel;
use CodeIgniter\HTTP\ResponseInterface;
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

class CommentController extends BaseController
{
    public function options()
    {
        return $this->response->setHeader('Allow', 'POST, DELETE')->setStatusCode(ResponseInterface::HTTP_OK);
    }

    public function search()
    {
        if (count($this->request->getPost()) > 0){
            $model = new CommentModel();

            $conditions = [
                'ressource_id' => $this->request->getPost('ressource_id')
            ];
            $comments = $model->where($conditions)->findAll();

            // Récupération du jeton d'authentification depuis l'en-tête de la requête
            $token = $this->request->getHeaderLine('Authorization');

            // Si on accède aux ressources de l'utilisateur on veut également recupérer ses préferences
            if($token) {
                // On supprime "Bearer " pour obtenir uniquement le token JWT
                $token = substr($token, 7);

                $key = Config::JWT_SECRET_KEY;
                // Décodage du jeton JWT
                $decoded = JWT::decode($token, new Key($key, 'HS256'));

                return $this->response
                ->setJSON(['commentsList' => $comments, 'isModerateur' => $decoded->user_role==3])
                ->setStatusCode(ResponseInterface::HTTP_OK);
            }
            else {
                return $this->response
                ->setJSON(['commentsList' => $comments, 'isModerateur' => false])
                ->setStatusCode(ResponseInterface::HTTP_OK);
            }
        }
    }

    public function create() {
        if (count($this->request->getPost()) > 0){
            $model = new CommentModel();
            
            // Récupération du jeton d'authentification depuis l'en-tête de la requête
            $token = $this->request->getHeaderLine('Authorization');

            // On supprime "Bearer " pour obtenir uniquement le token JWT
            $token = substr($token, 7);

            $key = Config::JWT_SECRET_KEY;
            // Décodage du jeton JWT
            $decoded = JWT::decode($token, new Key($key, 'HS256'));

            $data = [
                'commentaire_contenu' => $this->request->getPost('contenu'),
                'commentaire_date' => date('Y-m-d H:i:s'),
                'utilisateur_id' => $decoded->user_id,
                'ressource_id' => $this->request->getPost('ressource_id'),
            ];
        
            // Valide les données entrantes
            if (!$this->validate([
                'contenu' => 'required',
                'ressource_id' => 'required'
            ])) {
                return $this->response
                    ->setJSON(['message' => $this->validator->getErrors()])
                    ->setStatusCode(ResponseInterface::HTTP_BAD_REQUEST);
            }

            $model->insert($data);

            return $this->response
                        ->setJSON(['message' => 'Commentaire ajoutée avec succès.'])
                        ->setStatusCode(ResponseInterface::HTTP_CREATED);
        }
    }

    public function delete($id)
    {
        // Récupération du jeton d'authentification depuis l'en-tête de la requête
        $token = $this->request->getHeaderLine('Authorization');

        if(!empty($token)) {
            // On supprime "Bearer " pour obtenir uniquement le token JWT
            $token = substr($token, 7);

            $key = Config::JWT_SECRET_KEY;
            // Décodage du jeton JWT
            $decoded = JWT::decode($token, new Key($key, 'HS256'));

            if($decoded->user_role!=3) {
                return $this->response
                    ->setJSON(['message' => 'Vous n\'avez pas les droits d\'effectuer cette action'])
                    ->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
            }

            // Instancier le modèle du commentaire
            $model = new CommentModel();

            // Vérifier si le commentaire existe
            $comment = $model->find($id);

            if ($comment === null) {
                // Si le commentaire n'existe pas, renvoyer une réponse 404
                return $this->response
                            ->setJSON(['message' => 'Commentaire non trouvée.'])
                            ->setStatusCode(ResponseInterface::HTTP_NOT_FOUND);
            }

            // Supprimer le commentaire
            $model->delete($id);

            return $this->response
                        ->setJSON(['message' => 'Commentaire supprimée avec succès.', 'id' => $id])
                        ->setStatusCode(ResponseInterface::HTTP_OK);
        }
    }
}
