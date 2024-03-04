import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../Provider/AuthProvider';

const Header = ({navigation}: any) => {
    const { isLoggedIn } = useAuth(); // Utilisez le contexte d'authentification
    const { handleLogout } = useAuth(); // Utilisez useAuth pour obtenir la fonction handleLogout du contexte

    const navigateToScreen = (screenName: any) => {
        navigation.navigate(screenName);
    };

    const handleLogoutPress = () => {
        handleLogout(); // Appelez la fonction handleLogout lorsque le bouton est pressé
    };
    
    return (
        <View>
            <View style={styles.mainHeader}>
                <Image source={require('../../assets/img/ministere.png')} style={styles.ministereLogo} resizeMode="contain" />
                <Text style={styles.headerText}>(Re)sources Relationnelles</Text>
                <View style={styles.endHeader}>
                    {!isLoggedIn ? (
                        <TouchableOpacity style={styles.loginLink} onPress={() => navigateToScreen('Login')}>
                            <FontAwesomeIcon icon={faCircleUser} style={styles.iconUser} />
                            <Text>Se connecter</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.loginLink} onPress={() => handleLogoutPress()}>
                            <FontAwesomeIcon icon={faCircleUser} style={styles.iconUser} />
                            <Text>Se déconnecter</Text>
                        </TouchableOpacity>
                    )}
                    <TextInput style={styles.searchInput} placeholder="Rechercher" />
                </View>
            </View>

            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navItems} onPress={() => navigateToScreen('Home')}>
                    <Text style={styles.navLinks}>Accueil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItems} onPress={() => navigateToScreen('Resources')}>
                    <Text style={styles.navLinks}>Ressources</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItems} onPress={() => navigateToScreen('Help')}>
                    <Text style={styles.navLinks}>Aide</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        alignItems: 'center',
    },
    ministereLogo: {
        width: 100,
        height: 100,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    endHeader: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        marginVertical: 10,
    },
    loginLink: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        color: '#000091',
        borderColor: '#000091',
        padding: 5,
    },
    iconUser: {
        marginRight: 8,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        width: '60%',
    },
    navbar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    navItems: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        paddingVertical: 20,
        alignItems: 'center',
    },
    navLinks: {
        textDecorationLine: 'none',
        color: 'black',
    },
});
  
export default Header;