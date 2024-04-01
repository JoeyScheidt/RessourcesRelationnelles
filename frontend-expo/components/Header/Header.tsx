import React from 'react';
import styles from '../../styles/style';
import { View, Text, Image, TextInput, TouchableOpacity, Platform} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../Provider/AuthProvider';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Alert from '../Alert/Alert';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAlert } from '../../Provider/AlertProvider';
import { API_URL } from '../../const';

const Header = ({navigation}: any) => {
    const { isLoggedIn } = useAuth();
    const { showAlert } = useAlert();

    const navigateToScreen = (screenName: any) => {
        navigation.navigate(screenName);
    };

    const handleLogout = async () => {
        fetch(`${API_URL}/api/utilisateur/logout`, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(async data => {
            // Supprimer le token de l'utilisateur lors de la déconnexion
            await AsyncStorage.removeItem('token');
            EventRegister.emit('login', 'token')

            showAlert(data.message, 'success');
            navigation.navigate('Home');
        })
        .catch(error => {
            // Gestion des erreurs
            console.error('There was an error!', error);
            showAlert('Une erreur s\'est produite.', 'error');
        });
    };
    
    return (
        <View>
            <View style={styles.topHeader}>
                <Image source={require('../../assets/img/logo.png')} style={styles.logo} resizeMode="contain"/>
                <TextInput style={styles.searchInput} placeholder="Rechercher" />
                <View style={styles.endHeader}>
                    {!isLoggedIn ? (
                        <TouchableOpacity style={styles.loginLink} onPress={() => navigateToScreen('Login')}>
                            <FontAwesomeIcon icon={faCircleUser as IconProp} style={styles.iconUser} />
                            <Text style={styles.loginText}>Se connecter</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.loginLink} onPress={() => handleLogout()}>
                            <FontAwesomeIcon icon={faCircleUser as IconProp} style={styles.iconUser} />
                            <Text style={styles.loginText}>Se déconnecter</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navItems} onPress={() => navigateToScreen('Home')}>
                    <Text style={styles.navLinks}>ACCUEIL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItems} onPress={() => navigateToScreen('Resources')}>
                    <Text style={styles.navLinks}>RESSOURCES</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItems} onPress={() => navigateToScreen('Resources')}>
                    <Text style={styles.navLinks}>MON COMPTE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItems} onPress={() => navigateToScreen('Help')}>
                    <Text style={styles.navLinks}>BESOIN D'AIDE ?</Text>
                </TouchableOpacity>
            </View>

            <Alert />
        </View>
    );
};
  
export default Header;