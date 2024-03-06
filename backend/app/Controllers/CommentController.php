<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\CommentModel;
use CodeIgniter\HTTP\ResponseInterface;

class CommentController extends BaseController
{
    public function search()
    {
        $model = new CommentModel();
        $comments = $model->findAll();

        return $this->response->setJSON($comments);
    }

    public function create() {
        if (count($this->request->getPost()) > 0){
            $model = new CommentModel();

            return $this->response
                ->setJSON(['message' => 'yes', 'adz' => date('Y-m-d H:i:s'), /*'ybt' => $session->get('user_id') /*'ed' => $_SESSION['user_id']*/])
                ->setStatusCode(ResponseInterface::HTTP_CREATED);

            $data = [
                'commentaire_contenu' => $this->request->getPost('contenu'),
                'commentaire_date' => date('Y-m-d H:i:s'),
                'utilisateur_id' => $_SESSION['user_id'],
                'ressource_id' => $this->request->getPost('ressource_id'),
            ];
        
            // Valide les données entrantes
            if (!$this->validate([
                'commentaire_contenu' => 'required',
                'commentaire_date' => 'required',
                'utilisateur_id' => 'required',
                'ressource_id' => 'required'
            ])) {
                return $this->response
                    ->setJSON(['message' => $this->validator->getErrors()])
                    ->setStatusCode(ResponseInterface::HTTP_BAD_REQUEST);
            }

            $model->insert($data);

            return $this->response
                        ->setJSON(['message' => 'Commentaire ajoutée avec succès.'/*, 'newComment' => $model*/])
                        ->setStatusCode(ResponseInterface::HTTP_CREATED);
        }
    }
}
