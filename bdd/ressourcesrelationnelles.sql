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
  `commentaire_titre` varchar(50) DEFAULT NULL,
  `commentaire_contenu` varchar(50) DEFAULT NULL,
  `commentaire_date` date DEFAULT NULL,
  `roleUtilisateur_id` int NOT NULL,
  `utilisateur_id` int NOT NULL,
  `ressource_id` int NOT NULL,
  PRIMARY KEY (`commentaire_id`),
  KEY `roleUtilisateur_id` (`roleUtilisateur_id`,`utilisateur_id`),
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
  `utilisateur_id` int NOT NULL,
  `ressource_id` int NOT NULL,
  `favori` tinyint(1) NOT NULL DEFAULT '0',
  `exploiter` tinyint(1) NOT NULL DEFAULT '0',
  `mettre_de_cote` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`utilisateur_id`,`ressource_id`),
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
-- Structure de la table `ressource`
--

DROP TABLE IF EXISTS `ressource`;
CREATE TABLE IF NOT EXISTS `ressource` (
  `ressource_id` int NOT NULL AUTO_INCREMENT,
  `ressource_titre` varchar(50) DEFAULT NULL,
  `ressource_description` varchar(50) DEFAULT NULL,
  `ressource_contenu` varchar(50) DEFAULT NULL,
  `categorie_id` int NOT NULL,
  PRIMARY KEY (`ressource_id`),
  KEY `categorie_id` (`categorie_id`)
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
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `utilisateur_role` int NOT NULL,
  `utilisateur_id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_adresse_mail` varchar(50) DEFAULT NULL,
  `utilisateur_nom` varchar(50) DEFAULT NULL,
  `utilisateur_prenom` varchar(50) DEFAULT NULL,
  `utilisateur_password` varchar(50) DEFAULT NULL,
  `utilisateur_adresse` varchar(50) DEFAULT NULL,
  `utilisateur_code_postal` int DEFAULT NULL,
  `utilisateur_ville` varchar(50) DEFAULT NULL,
  `utilisateur_photo` varchar(50) DEFAULT NULL,
  `utilisateur_telephone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`utilisateur_id`),
  KEY `utilisateur_role` (`utilisateur_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
