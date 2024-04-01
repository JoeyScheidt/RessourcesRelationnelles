import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import Category from '../../InterfaceModel/Category';
import ResourcesTable from '../ResourcesTable/ResourcesTable';
import { API_URL } from '../../const';
import TypeRelation from '../../InterfaceModel/TypeRelation';
import TypeRessource from '../../InterfaceModel/TypeRessources';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyResources = ({navigation}: any) => {
    const [ressources, setRessources] = useState([]);
    const [categories, setCategories] = useState([]);
    const [relationType, setRelationType] = useState([]);
    const [resourceType, setResourceType] = useState([]);
    const [selectedCategorie, setSelectedCategorie] = useState("");
    const [selectedRelationType, setSelectedRelationType] = useState("");
    const [selectedResourceType, setSelectedResourceType] = useState("");

    const tableHeadConnected = ['Titre', 'Type', 'Description', ''];

    useEffect(() => {
        fetchData();
        onSearch();
    }, []);

    const fetchData = () => {
        // On récupérer la liste des filtres
        Promise.all([
            fetch(`${API_URL}/api/categories/search`).then(response => response.json()),
            fetch(`${API_URL}/api/typeRelations/search`).then(response => response.json()),
            fetch(`${API_URL}/api/typeRessources/search`).then(response => response.json())
        ]).then(([categoriesData, relationTypeData, resourceTypeData]) => {
            setCategories(categoriesData);
            setRelationType(relationTypeData);
            setResourceType(resourceTypeData);
        }).catch(error => console.error('Error fetching data:', error));
    };

    const onSearch = async () => {
        let formDataToSend = new FormData();
        formDataToSend.append("categorieId", selectedCategorie);
        formDataToSend.append("typeRelationId", selectedRelationType);
        formDataToSend.append("typeRessourceId", selectedResourceType);

        const token = await AsyncStorage.getItem('token');

        fetch(`${API_URL}/api/ressources/search`, {
            method: 'POST',
            body: formDataToSend,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => setRessources(data))
        .catch(error => console.error('Error fetching data:', error));
    };

    const navigateToScreen = (screenName: any) => {
        navigation.navigate(screenName);
    };

    return (
        /// NE PAS METTRE DE VIEW DANS SCROLLVIEW BC taille dynaamyqye donc = 0
        <ScrollView>
            <Text style={styles.heading}>Listes des mes ressources</Text>

            <Button title="Création de ressources" onPress={() => navigateToScreen('ResourcesEdit')} />

            <View style={styles.filtres}>
                <Text>Catégorie:</Text>
                <Picker
                    selectedValue={selectedCategorie}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCategorie(itemValue)
                    }>

                    <Picker.Item label="Sélectionner une catégorie" value="" />
                    
                    {categories.map((option: Category, index) => (
                        <Picker.Item key={index} label={option.categorie_libelle} value={option.categorie_id} />
                    ))}
                </Picker>

                <Text>Type de relations:</Text>
                <Picker
                    selectedValue={selectedRelationType}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedRelationType(itemValue)
                    }>

                    <Picker.Item label="Sélectionner un type de relation" value="" />
                    
                    {relationType.map((option: TypeRelation, index) => (
                        <Picker.Item key={index} label={option.typeRelation_libelle} value={option.typeRelation_id} />
                    ))}
                </Picker>

                <Text>Type de ressources:</Text>
                <Picker
                    selectedValue={selectedResourceType}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedResourceType(itemValue)
                    }>

                    <Picker.Item label="Sélectionner un type de ressources" value="" />
                    
                    {resourceType.map((option: TypeRessource, index) => (
                        <Picker.Item key={index} label={option.typeRessources_libelle} value={option.typeRessources_id} />
                    ))}
                </Picker>

                <TouchableOpacity style={styles.searchBtn} onPress={() => onSearch()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </TouchableOpacity>
            </View>

            <ResourcesTable tableHead={tableHeadConnected} ressources={ressources} displayAction={true} navigation={navigation}></ResourcesTable>
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
    searchBtn: {
        borderWidth: 1,
        color: '#000091',
        borderColor: '#000091',
        padding: 5,
        margin: 5,
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