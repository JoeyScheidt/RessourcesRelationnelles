<?php

namespace App\Controllers;

use App\Config\Config;
use App\Controllers\BaseController;
use App\Models\UserModel;
use CodeIgniter\HTTP\ResponseInterface;
use App\Helpers\Hash;
use \Firebase\JWT\JWT;

class UserController extends BaseController 
{
    public function register() {
        if (count($this->request->getPost()) > 0){
            $objUtilisateur = new UserModel();
            $data = [
                'utilisateur_role '  => 2,
                'utilisateur_adresse_mail' => $this->request->getPost('email'),
                'utilisateur_nom' => $this->request->getPost('name'),
                'utilisateur_prenom' => $this->request->getPost('firstname'),
                'utilisateur_adresse_mail' => $this->request->getPost('email'),
                'utilisateur_password' => Hash::make($this->request->getPost('password')),
                'utilisateur_adresse' => $this->request->getPost('address'),
                'utilisateur_code_postal' => $this->request->getPost('zipCode'),
                'utilisateur_ville' => $this->request->getPost('city'),
                'utilisateur_telephone' => $this->request->getPost('telephone'),
            ];

            $objUtilisateur->insert($data);
            
            return $this->response
                    ->setJSON(['message' => 'Utilisateur créée avec succès.'])
                    ->setStatusCode(ResponseInterface::HTTP_OK);
        }
    }

    public function login() {
        if (count($this->request->getPost()) > 0){
            $objUtilisateur = new UserModel();
            $arrayWhere = ['utilisateur_adresse_mail' => $this->request->getPost('email')];
            $user = $objUtilisateur->where($arrayWhere)->first();

            if($user != null && Hash::verify($this->request->getPost('password'), $user['utilisateur_password'])) {
                // Génération du jeton JWT
                $key = Config::JWT_SECRET_KEY;
                $payload = [
                    'user_id' => $user['utilisateur_id']
                ];

                // Générez le jeton JWT
                $jwt = JWT::encode($payload, $key);
                
                return $this->response
                    ->setJSON([
                        'message' => 'Utilisateur connecté avec succès.',
                        'token' => $jwt
                    ])
                    ->setStatusCode(ResponseInterface::HTTP_OK);
            } else {
                return $this->response
                    ->setJSON(['message' => 'Identifiants invalides.'])
                    ->setStatusCode(ResponseInterface::HTTP_BAD_REQUEST);
            }
        }
    }
}
