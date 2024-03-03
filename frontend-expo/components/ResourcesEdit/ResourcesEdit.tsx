import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Category from '../../InterfaceModel/Category';
import TypeRelation from '../../InterfaceModel/TypeRelation';
import TypeRessource from '../../InterfaceModel/TypeRessources';
//import axios from 'axios';

const ResourcesEdit = () => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    contenu: "",
    categorieId: "",
    typeRelationId: "",
    typeRessourceId: "",
  });

  const [categories, setCategories] = useState([]);
  const [typeRelations, setTypeRelations] = useState([]);
  const [typeRessources, setTypeRessources] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchTypeRelations();
    fetchTypeRessources();
  }, []);

  const fetchCategories = async () => {
    fetch('http://localhost/RessourcesRelationnelles/backend/public/api/categories')
    .then(response => response.json())
    .then(data => setCategories(data))
    .catch(error => console.error('Error fetching data:', error));
  };

  const fetchTypeRelations = async () => {
    fetch('http://localhost/RessourcesRelationnelles/backend/public/api/typeRelations')
    .then(response => response.json())
    .then(data => setTypeRelations(data))
    .catch(error => console.error('Error fetching data:', error));
  };

  const fetchTypeRessources = async () => {
    fetch('http://localhost/RessourcesRelationnelles/backend/public/api/typeRessources')
    .then(response => response.json())
    .then(data => setTypeRessources(data))
    .catch(error => console.error('Error fetching data:', error));
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    let formDataToSend = new FormData();
    for (const key in formData) {
        formDataToSend.append(key, formData[key]);
    }

    fetch('http://localhost/RessourcesRelationnelles/backend/public/api/ressources', {
        method: 'POST',
        body: formDataToSend,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Traitement des données de réponse
        console.log(data);
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('There was an error!', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Création d'une ressource</Text>

      <TextInput
        style={styles.input}
        placeholder="Titre*"
        value={formData.titre}
        onChangeText={(text) => handleChange('titre', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Description*"
        value={formData.description}
        onChangeText={(text) => handleChange('description', text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Contenu*"
        multiline
        value={formData.contenu}
        onChangeText={(text) => handleChange('contenu', text)}
      />

      <Picker
          selectedValue={formData.categorieId}
          onValueChange={(itemValue, itemIndex) =>
            handleChange('categorieId', itemValue)
          }>
          {categories.map((option: Category, index) => (
          <Picker.Item key={index} label={option.categorie_libelle} value={option.categorie_id} />
          ))}
      </Picker>

      <Picker
          selectedValue={formData.typeRelationId}
          onValueChange={(itemValue, itemIndex) =>
            handleChange('typeRelationId', itemValue)
          }>
          {typeRelations.map((option: TypeRelation, index) => (
          <Picker.Item key={index} label={option.typeRelation_libelle} value={option.typeRelation_id} />
          ))}
      </Picker>

      <Picker
          selectedValue={formData.typeRessourceId}
          onValueChange={(itemValue, itemIndex) =>
            handleChange('typeRessourceId', itemValue)
          }>
          {typeRessources.map((option: TypeRessource, index) => (
          <Picker.Item key={index} label={option.typeRessources_libelle} value={option.typeRessources_id} />
          ))}
      </Picker>

      <Button title="Enregistrer la ressource" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // For Android
  },
});

export default ResourcesEdit;