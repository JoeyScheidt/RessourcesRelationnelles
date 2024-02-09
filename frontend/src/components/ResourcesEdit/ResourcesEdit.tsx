import { useState } from "react";
import './ResourcesEdit.css';

const ResourcesEdit = () => {
    const [formData, setFormData] = useState({
        titre: "",
        description: "",
        contenu: "",
        categorieId: "",
        typeRelationId: "",
        typeRessourcesId: "",
    });
    
    const [errors, setErrors] = useState({});
    
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Validate form data here
        // If form data is valid, submit the form to the server
    };

    return (
        <div className="layout">
            <h3>Création d'une ressource</h3>

            <form onSubmit={handleSubmit} className="formResourcesEdit">
                <input
                    type="text"
                    placeholder="Titre*"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Description*"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <textarea
                    placeholder="Contenu*"
                    name="contenu"
                    value={formData.contenu}
                    onChange={handleChange}
                ></textarea>

                <select
                    name="categorieId"
                    value={formData.categorieId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Sélectionner...</option>
                </select>

                <select
                    name="typeRelationId"
                    value={formData.typeRelationId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Sélectionner...</option>
                </select>

                <select
                    name="typeRessourcesId"
                    value={formData.typeRessourcesId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Sélectionner...</option>
                </select>

                <button 
                    type="submit"
                    className="btnValider"
                >
                    Enregistrer la ressource
                </button>
            </form>
        </div>
    );
};
  
export default ResourcesEdit;