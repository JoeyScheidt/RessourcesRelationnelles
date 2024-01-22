CREATE TABLE TypeRelation(
   typeRelation_id INT,
   typeRelation_libelle VARCHAR(50),
   PRIMARY KEY(typeRelation_id)
);

CREATE TABLE TypeRessources(
   typeRessources_id INT,
   typeRessources_libelle VARCHAR(50),
   PRIMARY KEY(typeRessources_id)
);

CREATE TABLE Categorie(
   categorie_id INT,
   categorie_libelle VARCHAR(50),
   PRIMARY KEY(categorie_id)
);

CREATE TABLE RoleUtilisateur(
   roleUtilisateur_id INT,
   roleUtilisateur_type VARCHAR(50),
   PRIMARY KEY(roleUtilisateur_id)
);

CREATE TABLE Utilisateur(
   roleUtilisateur_id INT,
   utilisateur_id INT,
   utilisateur_adresse_mail VARCHAR(50),
   utilisateur_nom VARCHAR(50),
   utilisateur_prenom VARCHAR(50),
   utilisateur_password VARCHAR(50),
   utilisateur_adresse VARCHAR(50),
   utilisateur_code_postal INT,
   utilisateur_ville VARCHAR(50),
   utilisateur_photo VARCHAR(50),
   utilisateur_telephone VARCHAR(50),
   PRIMARY KEY(roleUtilisateur_id, utilisateur_id),
   FOREIGN KEY(roleUtilisateur_id) REFERENCES RoleUtilisateur(roleUtilisateur_id)
);

CREATE TABLE Ressource(
   ressource_id INT,
   ressource_titre VARCHAR(50),
   ressource_description VARCHAR(50),
   ressource_contenu VARCHAR(50),
   categorie_id INT NOT NULL,
   PRIMARY KEY(ressource_id),
   FOREIGN KEY(categorie_id) REFERENCES Categorie(categorie_id)
);

CREATE TABLE Commentaire(
   commentaire_id VARCHAR(50),
   commentaire_titre VARCHAR(50),
   commentaire_contenu VARCHAR(50),
   commentaire_date DATE,
   roleUtilisateur_id INT NOT NULL,
   utilisateur_id INT NOT NULL,
   ressource_id INT NOT NULL,
   PRIMARY KEY(commentaire_id),
   FOREIGN KEY(roleUtilisateur_id, utilisateur_id) REFERENCES Utilisateur(roleUtilisateur_id, utilisateur_id),
   FOREIGN KEY(ressource_id) REFERENCES Ressource(ressource_id)
);

CREATE TABLE Contenir(
   ressource_id INT,
   typeRelation_id INT,
   PRIMARY KEY(ressource_id, typeRelation_id),
   FOREIGN KEY(ressource_id) REFERENCES Ressource(ressource_id),
   FOREIGN KEY(typeRelation_id) REFERENCES TypeRelation(typeRelation_id)
);

CREATE TABLE Etre(
   ressource_id INT,
   typeRessources_id INT,
   PRIMARY KEY(ressource_id, typeRessources_id),
   FOREIGN KEY(ressource_id) REFERENCES Ressource(ressource_id),
   FOREIGN KEY(typeRessources_id) REFERENCES TypeRessources(typeRessources_id)
);

CREATE TABLE HistoriqueRessources(
   roleUtilisateur_id INT,
   utilisateur_id INT,
   ressource_id INT,
   dateModification DATE,
   datePublication DATE,
   PRIMARY KEY(roleUtilisateur_id, utilisateur_id, ressource_id),
   FOREIGN KEY(roleUtilisateur_id, utilisateur_id) REFERENCES Utilisateur(roleUtilisateur_id, utilisateur_id),
   FOREIGN KEY(ressource_id) REFERENCES Ressource(ressource_id)
);

CREATE TABLE Reponse(
   roleUtilisateur_id INT,
   utilisateur_id INT,
   commentaire_id VARCHAR(50),
   reponse_contenu VARCHAR(50),
   reponse_date VARCHAR(50),
   PRIMARY KEY(roleUtilisateur_id, utilisateur_id, commentaire_id),
   FOREIGN KEY(roleUtilisateur_id, utilisateur_id) REFERENCES Utilisateur(roleUtilisateur_id, utilisateur_id),
   FOREIGN KEY(commentaire_id) REFERENCES Commentaire(commentaire_id)
);

CREATE TABLE Marquer(
   roleUtilisateur_id INT,
   utilisateur_id INT,
   ressource_id INT,
   favori LOGICAL,
   exploiter LOGICAL,
   mettre_de_cote LOGICAL,
   PRIMARY KEY(roleUtilisateur_id, utilisateur_id, ressource_id),
   FOREIGN KEY(roleUtilisateur_id, utilisateur_id) REFERENCES Utilisateur(roleUtilisateur_id, utilisateur_id),
   FOREIGN KEY(ressource_id) REFERENCES Ressource(ressource_id)
);
