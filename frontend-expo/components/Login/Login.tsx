import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners'
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAlert } from '../../Provider/AlertProvider';

const Login = ({navigation}: any) => {
    const { showAlert } = useAlert();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createAccount = () => {
        navigation.navigate('Registration');
    }
  
    // Fonction pour gérer la connexion
    const handleLogin = () => {
        // Création d'un objet FormData pour envoyer les données de connexion
      let formDataToSend = new FormData();
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);

      // Envoi de la requête de connexion à l'API
      fetch('http://localhost/RessourcesRelationnelles/backend/public/api/utilisateur/login', {
        method: 'POST',
        body: formDataToSend
      })
      .then(response => {
        // Si la réponse n'est pas OK, on lance une erreur
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Sinon, on convertit la réponse en JSON
        return response.json();
      })
      .then(async data => {
        // Stockage du jeton jwt dans le stockage local
        await AsyncStorage.setItem('token', data.token);
        // Émission d'un événement de connexion avec le jeton comme donnée
        EventRegister.emit('login', 'token')

        // Affichage d'une alerte avec le message de l'API
        showAlert(data.message, 'success');
        // Navigation vers l'écran d'accueil
        navigation.navigate('Home');
      })
      .catch(error => {
        // Gestion des erreurs
        console.error('There was an error!', error);
        showAlert('Une erreur s\'est produite.', 'error');
      });
    }

    return (
        <View style={styles.layout}>
            <View style={styles.loginForm}>
                <Text style={styles.title}>Connexion</Text>
                <TextInput
                    style={styles.loginInput}
                    placeholder="Adresse mail"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    secureTextEntry
                    style={styles.loginInput}
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPassword}>Mot de passe oublié?</Text>
                </TouchableOpacity>

                <View style={styles.containerBtn}>
                    <TouchableOpacity onPress={createAccount} style={[styles.createBtn, styles.button]}>
                        <Text style={styles.buttonText}>Créer un compte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogin} style={[styles.loginBtn, styles.button]}>
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
  
export default Login;

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    loginForm: {
        width: '100%',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    loginInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    forgotPassword: {
        textAlign: 'left',
        textDecorationLine: 'underline',
        color: '#000091',
        marginBottom: 10,
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    loginBtn: {
        backgroundColor: '#000091',
        flex: 1,
        marginLeft: 10,
    },
    createBtn: {
        backgroundColor: '#6CB9F4',
        flex: 1,
        marginRight: 10,
    },
});