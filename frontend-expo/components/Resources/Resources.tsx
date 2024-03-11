import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import Category from '../../InterfaceModel/Category';
import { useAuth } from '../../Provider/AuthProvider';
import ResourcesTable from '../ResourcesTable/ResourcesTable';

// Définition du composant Resources
const Resources = ({navigation}: any) => {
    // Utilisation du hook d'authentification pour vérifier si l'utilisateur est connecté
    const { isLoggedIn } = useAuth();

    // Définition des états pour les ressources, les catégories et la valeur sélectionnée
    const [ressources, setRessources] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    // Définition des en-têtes de table
    const tableHead = ['Titre', 'Type', 'Description'];

    // Utilisation du hook d'effet pour récupérer les ressources à partir de l'API lors du chargement du composant
    useEffect(() => {
        fetch('http://localhost/RessourcesRelationnelles/backend/public/api/ressources/search')
            .then(response => response.json())
            .then(data => setRessources(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Utilisation du hook d'effet pour récupérer les catégories à partir de l'API lors du chargement du composant
    useEffect(() => {
        fetch('http://localhost/RessourcesRelationnelles/backend/public/api/categories/search')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Fonction pour naviguer vers un autre écran
    const navigateToScreen = (screenName: any) => {
        navigation.navigate(screenName);
    };

    // Rendu du composant
    return (
        <ScrollView>
            <View style={styles.layout}>
                <Text style={styles.heading}>Listes des ressources</Text>

                // Utilisation du provider d'authentification
                {isLoggedIn ? (
                    <Button title="Mes Ressources" onPress={() => navigateToScreen('MyResources')} />
                ) : null}

                <View style={styles.filtres}>
                    <Text>Catégorie:</Text>

                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) =>
                        setSelectedValue(itemValue)
                        }>
                        {categories.map((option: Category, index) => (
                        <Picker.Item key={index} label={option.categorie_libelle} value={option.categorie_id} />
                        ))}
                    </Picker>

                    <Text>Type de relations:</Text>
                    <TextInput style={styles.input} placeholder="Type de relations" />

                    <Text>Type de ressources:</Text>
                    <TextInput style={styles.input} placeholder="Type de ressources" />
                </View>

                <ResourcesTable tableHead={tableHead} ressources={ressources} displayAction={false} navigation={navigation}></ResourcesTable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 20,
        marginBottom: 10,
    },
    filtres: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    }
});
  
export default Resources;