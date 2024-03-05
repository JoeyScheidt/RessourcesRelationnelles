import React, { useState } from 'react';
import styles from '../../styles/style';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAlert } from '../../Provider/AlertProvider';

const Registration = ({navigation}: any) => {
    const { showAlert } = useAlert();

    const [formData, setFormData] = useState({
        name: '',
        firstname: '',
        email: '',
        telephone: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        zipCode: '',
        profilePicture: null,
    });

    const handleChange = (name: string, value: any) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (profilePicture: any) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            profilePicture: profilePicture,
        }));
    };

    const handleSubmit = () => {
        let formDataToSend = new FormData();
        for (const key in formData) {
            if (Object.prototype.hasOwnProperty.call(formData, key)) {
                const value = formData[key as keyof typeof formData];
                if (value !== null) {
                    formDataToSend.append(key, value);
                }
            }
        }

        fetch('http://localhost/RessourcesRelationnelles/backend/public/api/utilisateur/register', {
            method: 'POST',
            body: formDataToSend
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            showAlert(data.message, 'success');
            navigation.navigate('Login');
        })
        .catch(error => {
            // Gestion des erreurs
            console.error('There was an error!', error);
            showAlert('Une erreur s\'est produite.', 'error');
        });
    };

    return (
        <ScrollView>
            <View style={styles.layout}>
                <Text style={styles.heading}>Inscription à (Re)sources Relationnelles</Text>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.registerInput}
                        placeholder="Nom*"
                        value={formData.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />

                    <TextInput
                        style={styles.registerInput}
                        placeholder="Prénom*"
                        value={formData.firstname}
                        onChangeText={(text) => handleChange('firstname', text)}
                    />

                    <TextInput
                        style={styles.registerInput}
                        placeholder="Numéro de téléphone"
                        value={formData.telephone}
                        onChangeText={(text) => handleChange('telephone', text)}
                    />

                    <TextInput
                        style={styles.registerInput}
                        placeholder="Adresse Email*"
                        value={formData.email}
                        onChangeText={(text) => handleChange('email', text)}
                    />

                    <TextInput
                        secureTextEntry
                        style={styles.registerInput}
                        placeholder="Mot de passe*"
                        value={formData.password}
                        onChangeText={(text) => handleChange('password', text)}
                    />

                    <TextInput
                        secureTextEntry
                        style={styles.registerInput}
                        placeholder="Confirmer mot de passe*"
                        value={formData.confirmPassword}
                        onChangeText={(text) => handleChange('confirmPassword', text)}
                    />

                    <TextInput
                        style={styles.registerInput}
                        placeholder="Adresse* (ex: 6 rue du vieux chêne)"
                        value={formData.address}
                        onChangeText={(text) => handleChange('address', text)}
                    />

                    <TextInput
                        style={styles.registerInput}
                        placeholder="Ville* (ex: Paris)"
                        value={formData.city}
                        onChangeText={(text) => handleChange('city', text)}
                    />

                    <TextInput
                        style={styles.registerInput}
                        placeholder="Code postal*"
                        value={formData.zipCode}
                        onChangeText={(text) => handleChange('zipCode', text)}
                    />

                    <TouchableOpacity style={styles.uploadContainer}>
                        <Text style={styles.uploadText}>Ajouter une photo de profil:</Text>
                        <Text style={styles.uploadButtonText}>Sélectionner une photo</Text>
                    </TouchableOpacity>
                    <Text style={styles.uploadInfo}>Formats acceptés : jpeg, jpg, png</Text>

                    <TouchableOpacity onPress={handleSubmit} style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>Valider l'inscription</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

// const styles = StyleSheet.create({
//     layout: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingHorizontal: 20,
//     },
//     heading: {
//         fontSize: 20,
//         marginBottom: 20,
//     },
//     formContainer: {
//         width: '100%',
//     },
//     registerInput: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//     },
//     uploadContainer: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//     },
//     uploadText: {
//         marginBottom: 5,
//     },
//     uploadButtonText: {
//         color: 'blue',
//     },
//     uploadInfo: {
//         marginBottom: 10,
//         color: '#888',
//     },
//     button: {
//         backgroundColor: '#000091',
//         borderRadius: 5,
//         padding: 10,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: 'white',
//     },
// });

export default Registration;