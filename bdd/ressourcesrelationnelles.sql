-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 07 fév. 2024 à 15:28
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ressourcesrelationnelles`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `categorie_id` int NOT NULL AUTO_INCREMENT,
  `categorie_libelle` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`categorie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`categorie_id`, `categorie_libelle`) VALUES
(1, 'Communication'),
(2, 'Cultures'),
(3, 'Développement personnel'),
(4, 'Intelligence émotionnelle'),
(5, 'Loisirs'),
(6, 'Monde professionnel'),
(7, 'Parentalité'),
(8, 'Qualité de vie'),
(9, 'Recherche de sens'),
(10, 'Santé physique'),
(11, 'Santé psychique'),
(12, 'Spiritualité'),
(13, 'Vie affective');

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
CREATE TABLE IF NOT EXISTS `commentaire` (
  `commentaire_id` int NOT NULL AUTO_INCREMENT,
  `commentaire_contenu` varchar(50) DEFAULT NULL,
  `commentaire_date` date DEFAULT NULL,
  `utilisateur_id` int NOT NULL,
  `ressource_id` int NOT NULL,
  PRIMARY KEY (`commentaire_id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  KEY `ressource_id` (`ressource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contenir`
--

DROP TABLE IF EXISTS `contenir`;
CREATE TABLE IF NOT EXISTS `contenir` (
  `ressource_id` int NOT NULL,
  `typeRelation_id` int NOT NULL,
  PRIMARY KEY (`ressource_id`,`typeRelation_id`),
  KEY `typeRelation_id` (`typeRelation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `etre`
--

DROP TABLE IF EXISTS `etre`;
CREATE TABLE IF NOT EXISTS `etre` (
  `ressource_id` int NOT NULL,
  `typeRessources_id` int NOT NULL,
  PRIMARY KEY (`ressource_id`,`typeRessources_id`),
  KEY `typeRessources_id` (`typeRessources_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `historiqueressources`
--

DROP TABLE IF EXISTS `historiqueressources`;
CREATE TABLE IF NOT EXISTS `historiqueressources` (
  `roleUtilisateur_id` int NOT NULL,
  `utilisateur_id` int NOT NULL,
  `ressource_id` int NOT NULL,
  `dateModification` date DEFAULT NULL,
  `datePublication` date DEFAULT NULL,
  PRIMARY KEY (`roleUtilisateur_id`,`utilisateur_id`,`ressource_id`),
  KEY `ressource_id` (`ressource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `marquer`
--

DROP TABLE IF EXISTS `marquer`;
CREATE TABLE IF NOT EXISTS `marquer` (
  `marquer_id` int NOT NULL AUTO_INCREMENT,
  `marquer_favori` tinyint(1) NOT NULL DEFAULT '0',
  `marquer_exploiter` tinyint(1) NOT NULL DEFAULT '0',
  `marquer_mettre_de_cote` tinyint(1) NOT NULL DEFAULT '0',
  `utilisateur_id` int NOT NULL,
  `ressource_id` int NOT NULL,
  PRIMARY KEY (`marquer_id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  KEY `ressource_id` (`ressource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reponse`
--

DROP TABLE IF EXISTS `reponse`;
CREATE TABLE IF NOT EXISTS `reponse` (
  `roleUtilisateur_id` int NOT NULL,
  `utilisateur_id` int NOT NULL,
  `commentaire_id` varchar(50) NOT NULL,
  `reponse_contenu` varchar(50) DEFAULT NULL,
  `reponse_date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`roleUtilisateur_id`,`utilisateur_id`,`commentaire_id`),
  KEY `commentaire_id` (`commentaire_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roleutilisateur`
--

DROP TABLE IF EXISTS `roleutilisateur`;
CREATE TABLE IF NOT EXISTS `roleutilisateur` (
  `roleUtilisateur_id` int NOT NULL AUTO_INCREMENT,
  `roleUtilisateur_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`roleUtilisateur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `roleutilisateur`
--

INSERT INTO `roleutilisateur` (`roleUtilisateur_id`, `roleUtilisateur_type`) VALUES
(1, 'citoyen'),
(2, 'citoyen_connecte'),
(3, 'moderateur'),
(4, 'admin'),
(5, 'super_admin');

-- --------------------------------------------------------

--
-- Structure de la table `typerelation`
--

DROP TABLE IF EXISTS `typerelation`;
CREATE TABLE IF NOT EXISTS `typerelation` (
  `typeRelation_id` int NOT NULL AUTO_INCREMENT,
  `typeRelation_libelle` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`typeRelation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `typerelation`
--

INSERT INTO `typerelation` (`typeRelation_id`, `typeRelation_libelle`) VALUES
(1, 'Soi'),
(2, 'Conjoints'),
(3, 'Famille'),
(4, 'Professionnelle'),
(5, 'Amis et communautés'),
(6, 'Inconnus');

-- --------------------------------------------------------

--
-- Structure de la table `typeressources`
--

DROP TABLE IF EXISTS `typeressources`;
CREATE TABLE IF NOT EXISTS `typeressources` (
  `typeRessources_id` int NOT NULL AUTO_INCREMENT,
  `typeRessources_libelle` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`typeRessources_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `typeressources`
--

INSERT INTO `typeressources` (`typeRessources_id`, `typeRessources_libelle`) VALUES
(1, 'Activité / Jeu à réaliser'),
(2, 'Article'),
(3, 'Carte défi'),
(4, 'Cours au format PDF'),
(5, 'Exercice / Atelier'),
(6, 'Fiche de lecture'),
(7, 'Jeu en ligne'),
(8, 'Vidéo');

-- --------------------------------------------------------

--
-- Structure de la table `ressource`
--

DROP TABLE IF EXISTS `ressource`;
CREATE TABLE IF NOT EXISTS `ressource` (
  `ressource_id` int NOT NULL AUTO_INCREMENT,
  `ressource_titre` varchar(50) DEFAULT NULL,
  `ressource_description` varchar(50) DEFAULT NULL,
  `ressource_contenu` varchar(50) DEFAULT NULL,
  `categorie_id` int NOT NULL,
  `typeRelation_id` int NOT NULL,
  `typeRessources_id` int NOT NULL,
  PRIMARY KEY (`ressource_id`),
  KEY `categorie_id` (`categorie_id`),
  KEY `typeRelation_id` (`typeRelation_id`),
  KEY `typeRessources_id` (`typeRessources_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `ressource`
--

INSERT INTO `ressource` (`ressource_titre`, `ressource_description`, `ressource_contenu`, `categorie_id`, `typeRelation_id`, `typeRessources_id`)
VALUES
('Comment cuisiner un délicieux ragoût', 'Découvrez la recette secrète pour un ragoût savoureux', 'Ingrédients : viande, légumes, épices...', 3, 2, 1),
('Les bienfaits de la méditation', 'Apprenez comment méditer pour réduire le stress et trouver la paix intérieure', 'La méditation peut améliorer votre santé mentale et physique.', 7, 4, 2),
('Guide de voyage pour Tokyo', 'Explorez la culture japonaise et les attractions de la ville de Tokyo', 'Découvrez les meilleurs endroits pour manger, visiter et se divertir à Tokyo.', 5, 1, 3),
('Les bases de la programmation en Python', 'Apprenez les concepts fondamentaux de la programmation Python', 'Comprendre les variables, les boucles, les fonctions, etc.', 2, 3, 4),
('Techniques de photographie de paysage', 'Capturez des images époustouflantes de la nature avec ces conseils de photographie de paysage', 'Apprenez à jouer avec la lumière et la composition pour des photos uniques.', 9, 1, 1),
('Conseils pour un sommeil réparateur', 'Améliorez la qualité de votre sommeil avec ces astuces simples', 'Créez une routine de sommeil relaxante pour des nuits paisibles.', 1, 6, 2),
('Stratégies de marketing numérique', 'Découvrez comment promouvoir efficacement votre entreprise en ligne', 'Explorez les médias sociaux, le référencement et la publicité en ligne.', 8, 5, 3),
('Introduction à la cuisine française', 'Découvrez les bases de la cuisine française et ses plats emblématiques', 'Apprenez à préparer des plats comme la ratatouille et les crêpes suzette.', 4, 5, 1),
('Guide de remise en forme pour débutants', 'Commencez votre voyage vers une vie plus saine avec ce guide de remise en forme', 'Des exercices simples et des conseils nutritionnels pour tous les niveaux.', 6, 3, 2),
('Conseils pour une gestion efficace du temps', 'Apprenez à organiser votre temps pour une productivité maximale', 'Utilisez des techniques de gestion du temps pour atteindre vos objectifs.', 10, 5, 3);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `utilisateur_id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_adresse_mail` varchar(50) UNIQUE,
  `utilisateur_nom` varchar(50) DEFAULT NULL,
  `utilisateur_prenom` varchar(50) DEFAULT NULL,
  `utilisateur_password` varchar(100) DEFAULT NULL,
  `utilisateur_adresse` varchar(50) DEFAULT NULL,
  `utilisateur_code_postal` int DEFAULT NULL,
  `utilisateur_ville` varchar(50) DEFAULT NULL,
  `utilisateur_photo` varchar(50) DEFAULT NULL,
  `utilisateur_telephone` varchar(50) DEFAULT NULL,
  `utilisateur_role` int NOT NULL,
  PRIMARY KEY (`utilisateur_id`),
  KEY `utilisateur_role` (`utilisateur_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
