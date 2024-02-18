import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Resources = ({navigation}: {navigation: any}) => {

    const handleButtonClick = (route: any) => {
        navigation.navigate(route);
    };

    return (
        <View style={styles.layout}>
            <Text style={styles.heading}>Listes des ressources</Text>

            <Button title="Création de ressources" onPress={() => handleButtonClick('ResourcesEdit')} />

            <View style={styles.filtres}>
                <Text>Catégorie:</Text>
                <TextInput style={styles.input} placeholder="Catégorie" />

                <Text>Type de relations:</Text>
                <TextInput style={styles.input} placeholder="Type de relations" />

                <Text>Type de ressources:</Text>
                <TextInput style={styles.input} placeholder="Type de ressources" />
            </View>
        </View>
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
});
  
export default Resources;