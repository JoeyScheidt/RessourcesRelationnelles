import { useState } from "react";
import './Registration.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        name: "",
        firstname: "",
        email: "",
        telephone: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        zipCode: "",
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Prénom*"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                />

                <input 
                    type="tel"
                    placeholder="Numéro de téléphone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    placeholder="Adresse Email*"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Mot de passe*"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Confirmer mot de passe*"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Adresse* (ex: 6 rue du vieux chêne)"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />

                <input 
                    type="text"
                    placeholder="Ville* (ex: Paris)"
                    name="city"
                    value={formData.city}
                    onChange={handleChange} 
                />

                <input
                    type="text"
                    placeholder="Code postal*"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                />

                <div></div>

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
                <p>Formats acceptés : jpeg, jpg, png</p>

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