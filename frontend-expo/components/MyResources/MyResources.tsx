import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import Category from '../../InterfaceModel/Category';
import ResourcesTable from '../ResourcesTable/ResourcesTable';

const MyResources = ({navigation}: any) => {
    const [ressources, setRessources] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    const tableHeadConnected = ['Titre', 'Type', 'Description', ''];

    useEffect(() => {
        fetch('http://localhost/RessourcesRelationnelles/backend/public/api/ressources/search')
            .then(response => response.json())
            .then(data => setRessources(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost/RessourcesRelationnelles/backend/public/api/categories/search')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const navigateToScreen = (screenName: any) => {
        navigation.navigate(screenName);
    };

    return (
        <ScrollView>
            <View style={styles.layout}>
                <Text style={styles.heading}>Listes des mes ressources</Text>

                <Button title="Création de ressources" onPress={() => navigateToScreen('ResourcesEdit')} />

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

                <ResourcesTable tableHead={tableHeadConnected} ressources={ressources} displayAction={true} navigation={navigation}></ResourcesTable>
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
  
export default MyResources;