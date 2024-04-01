<?php

namespace App\Models;

use CodeIgniter\Model;

class RessourceModel extends Model
{
    protected $table            = 'ressource';
    protected $primaryKey       = 'ressource_id';
    protected $useAutoIncrement = true;

    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;

    protected $allowedFields    = ['ressource_titre', 'ressource_description', 'ressource_contenu', 'categorie_id', 'typeRelation_id', 'typeRessources_id'];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    public function getRessourcesWithLibelleTrad($conditions, $isFromAccueil, $decoded)
    {
        if (empty($decoded)) {
            $query = $this->select('ressource.*, categorie.categorie_libelle, typeressources.typeRessources_libelle')
                            ->join('categorie', 'categorie.categorie_id = ressource.categorie_id')
                            ->join('typeressources', 'typeressources.typeRessources_id = ressource.typeRessources_id');
        }
        else {
            $query = $this->select('ressource.*, categorie.categorie_libelle, typeressources.typeRessources_libelle ,
                                    marquer.marquer_favori, marquer.marquer_exploiter, marquer.marquer_mettre_de_cote')
                            ->join('categorie', 'categorie.categorie_id = ressource.categorie_id')
                            ->join('typeressources', 'typeressources.typeRessources_id = ressource.typeRessources_id')
                            ->join('marquer', "marquer.ressource_id = ressource.ressource_id AND marquer.utilisateur_id = {$decoded->user_id}", 'left');
        }
    
        // Ajouter les conditions uniquement si elles sont fournies
        if (!empty($conditions)) {
            $query->where($conditions);
        }

        // Permet d'avoir les dernieres ressources en premier
        if (!empty($isFromAccueil)) {
            $query->orderBy('ressource.ressource_id', 'DESC');
        }

        $results = $query->findAll();

        if (!empty($isFromAccueil)) {
            // Limite les résultats à 5 pour avoir les dernières ressources uniquement
            $results = array_slice($results, 0, 5);
        }
        
        return $results;
    }
}