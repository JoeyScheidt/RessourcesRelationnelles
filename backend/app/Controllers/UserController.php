<?php

namespace App\Controllers;

use App\Config\Config;
use App\Controllers\BaseController;
use App\Models\UserModel;
use App\Models\UserRoleModel;
use CodeIgniter\HTTP\ResponseInterface;
use App\Helpers\Hash;
use \Firebase\JWT\JWT;

class UserController extends BaseController 
{
    public function register() {
        if (count($this->request->getPost()) > 0){
            $objUtilisateurRole = new UserRoleModel();

            // Cherche l'id du pour un utilisateur ayant le role citoyen connecté
            $role = $objUtilisateurRole->where('roleUtilisateur_type', 'citoyen_connecte')->first();

            $objUtilisateur = new UserModel();
            $data = [
                'utilisateur_role'  => $role['roleUtilisateur_id'],
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
                // Début de la session
                //session_start();
                //$_SESSION['user_id'] = $user['utilisateur_id'];

                // Génération du jeton JWT
                $key = Config::JWT_SECRET_KEY;
                $payload = [
                    'user_id' => $user['utilisateur_id'],
                    'user_role' => $user['utilisateur_role']
                ];

                // Encodage du jeton JWT
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

    public function logout() {
        // Fin de la session
        //session_destroy();

        return $this->response
                ->setJSON(['message' => 'Utilisateur déconnecté avec succès.',])
                ->setStatusCode(ResponseInterface::HTTP_OK);
    }

    public function sendEmail()
    {
        if (count($this->request->getPost()) > 0){

            // Charger la bibliothèque Email
            /*$email = new Email();

            // Configuration de l'e-mail
            $config['SMTPHost'] = 'smtp.gmail.com';
            $config['SMTPPort'] = 587;
            $config['SMTPUser'] = 'ressources.relationnelles.gouv@gmail.com';
            $config['SMTPPass'] = 'RessourcesEmail50';
            $config['mailType'] = 'html';

            // Initialiser la configuration de l'e-mail
            $email->initialize($config);

            // Composer l'e-mail
            $email->setTo('thomas.doppler00@gmail.com');
            $email->setFrom('ressources.relationnelles.gouv@gmail.com', 'Votre Nom');
            $email->setSubject('Sujet de l\'e-mail');
            $email->setMessage('Contenu de l\'e-mail');*/

            $email = \Config\Services::email();

            $email->setFrom('ressources.relationnelles@gouv.com', 'NoReply');
            $email->setTo($this->request->getPost('email'));

            $email->setSubject('Mot de passe oublié');
            $email->setMessage('Vous avez oublié votre mot de passe. Si oui cliquez sur le lien ci-dessous.');

            if($email->send()) {
                return $this->response
                    ->setJSON([
                        'message' => 'Email envoyé.',
                    ])
                    ->setStatusCode(ResponseInterface::HTTP_OK);
            } else {
                return $this->response
                    ->setJSON(['message' => 'Email non envoyé.'])
                    ->setStatusCode(ResponseInterface::HTTP_BAD_REQUEST);
            }
        }
    }
}
