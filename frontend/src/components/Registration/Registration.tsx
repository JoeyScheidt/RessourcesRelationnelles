import { useState } from "react";
import './Registration.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        zipCode: "",
        securityNumber: "",
        profilePicture: null,
    });
    
    const [errors, setErrors] = useState({});
    
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    
    const handleFileChange = (e: any) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            profilePicture: e.target.files[0],
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Validate form data here
        // If form data is valid, submit the form to the server
    };

    return (
        <div>
            <h3>Inscription à (Re)sources Relationnelles</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom*"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Prénom*"
                    value={formData.email}
                    onChange={handleChange}
                />


                <input 
                    type="tel"
                    placeholder="Numéro de téléphone"
                />

                <input
                    type="email"
                    placeholder="Adresse Email*"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Mot de passe*"
                    value={formData.password}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Confirmer mot de passe*"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Adresse* (ex: 6 rue du vieux chêne)"
                    value={formData.address}
                    onChange={handleChange}
                />

                <input 
                    type="text"
                    placeholder="Ville* (ex: Paris)"
                    value={formData.city}
                    onChange={handleChange} 
                />

                <input
                    type="text"
                    placeholder="Code postal*"
                    value={formData.zipCode}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="N° de sécurité social"
                    value={formData.securityNumber}
                    onChange={handleChange}
                />

                <div className="containerInputPhoto">
                    <label htmlFor="profilePicture">Ajouter une photo de profil:</label>
                    <input 
                        type="file"
                        id="profilePicture"
                        name="profilePicture" 
                        placeholder="Ajouter une photo de profil:"
                        onChange={handleFileChange} 
                    />
                </div>
                <p>Format acceptés : jpeg, jpg, png</p>

                <div></div>
                <button 
                    type="submit"
                    className="btnValider"
                >
                    Valider l'inscription
                </button>
            </form>
        </div>
    );
};
  
export default Registration;