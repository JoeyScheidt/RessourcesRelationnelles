import React, { useEffect, useState } from 'react';
import styles from '../../styles/style';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { API_URL } from '../../const';
import ResourcesTable from '../ResourcesTable/ResourcesTable';

const Home = ({navigation}: any) => {
    const [ressources, setRessources] = useState([]);

    const tableHead = ['Titre', 'Type', 'Description'];

    useEffect(() => {
        let formDataToSend = new FormData();
        formDataToSend.append("categorieId", "");
        formDataToSend.append("typeRelationId", "");
        formDataToSend.append("typeRessourceId", "");
        formDataToSend.append("isFromAccueil", "true");

        fetch(`${API_URL}/api/ressources/search`, {
            method: 'POST',
            body: formDataToSend,
        })
        .then(response => response.json())
        .then(data => setRessources(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <View>
            <Text style={styles.title}>Les dernières des ressources</Text>
            <View style={styles.layout}></View>
            <ScrollView>
                <ResourcesTable tableHead={tableHead} ressources={ressources} displayAction={false} navigation={navigation}></ResourcesTable>
            </ScrollView>
        </View>
    );
};

export default Home;