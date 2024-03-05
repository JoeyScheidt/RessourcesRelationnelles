import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';

// Créez un contexte pour gérer l'état de connexion de l'utilisateur
const AuthContext = createContext({ isLoggedIn: false, handleLogout: () => {} });

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    checkLoginStatus();

    // Ajouter un écouteur de changement à AsyncStorage
    const listener = EventRegister.addEventListener('login', (data) => {
        if(data=="token") {
            checkLoginStatus();
        }
    })

    // Retirer l'écouteur de changement lors du démontage du composant
    return () => {
        EventRegister.removeEventListener('login');
    };
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // L'utilisateur est connecté
        setIsLoggedIn(true);
      } else {
        // L'utilisateur n'est pas connecté
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'état de connexion : ', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Supprimer le token de l'utilisateur lors de la déconnexion
      await AsyncStorage.removeItem('token');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion : ', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);