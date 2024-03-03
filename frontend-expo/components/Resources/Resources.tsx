import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
import Category from '../../InterfaceModel/Category';
import { useAuth } from '../../Provider/AuthProvider';

const Resources = ({navigation}: any) => {
    const { isLoggedIn } = useAuth(); // Utilisez le contexte d'authentification

    const [ressources, setRessources] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    const tableHead = ['Title', 'Description', 'Category'];

    useEffect(() => {
      fetch('http://localhost/RessourcesRelationnelles/backend/public/api/ressources')
        .then(response => response.json())
        .then(data => setRessources(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost/RessourcesRelationnelles/backend/public/api/categories')
          .then(response => response.json())
          .then(data => setCategories(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    const testCallApi = () => {
        console.log(ressources)
        console.log(categories)
        console.log(isLoggedIn)
    };
    
    const generateRows = (data: any) => {
        let rows: any[];
        rows= [];
        data.forEach((item: any) => {
          rows.push(
            [
              <TouchableOpacity key={item.ressource_id} style={{ flex: 1, padding: 10 }}>
                <Text style={styles.cellText}>{item.ressource_titre}</Text>
              </TouchableOpacity>,
              <Text key={`${item.ressource_id}-desc`} style={[styles.cellText, { flex: 3, padding: 10 }]}>{item.ressource_description}</Text>,
              <Text key={`${item.ressource_id}-cat`} style={[styles.cellText, { flex: 1, padding: 10 }]}>{item.categorie_id}</Text>,
            ]
          );
        });
        return rows;
      };

    const navigateToScreen = (screenName: any) => {
        navigation.navigate(screenName);
    };

    return (
        <ScrollView>
            <View style={styles.layout}>
                <Text style={styles.heading}>Listes des ressources</Text>

                <Button title="Test" onPress={() => testCallApi()} />

                {isLoggedIn ? (
                    <Button title="Mes Ressources" onPress={() => navigateToScreen('MyResources')} />
                ) : null}

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

                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    <Row data={tableHead} style={{ height: 40, backgroundColor: '#F7F6E7' }} textStyle={{ textAlign: 'center' }} />
                    <Rows data={generateRows(ressources)} textStyle={{ textAlign: 'center' }} />
                </Table>
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
    },
    cellText: {
        textAlign: 'center',
    },
});
  
export default Resources;