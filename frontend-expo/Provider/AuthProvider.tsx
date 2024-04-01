import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import { API_URL } from '../const';
import { useAlert } from './AlertProvider';

// Créez un contexte pour gérer l'état de connexion de l'utilisateur
const AuthContext = createContext({ isLoggedIn: false });

export const AuthProvider = ({ children }: any) => {
  const { showAlert } = useAlert();
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

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);