import React from 'react';
import styles from '../../styles/style';
import { View, Text, Image, TextInput, TouchableOpacity, Platform} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../Provider/AuthProvider';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Alert from '../Alert/Alert';

const Header = ({navigation}: any) => {
    const { isLoggedIn, handleLogout } = useAuth();

    const navigateToScreen = (screenName: any) => {
        navigation.navigate(screenName);
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