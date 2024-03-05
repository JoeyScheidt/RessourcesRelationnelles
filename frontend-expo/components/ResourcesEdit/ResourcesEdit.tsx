import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Category from '../../InterfaceModel/Category';
import TypeRelation from '../../InterfaceModel/TypeRelation';
import TypeRessource from '../../InterfaceModel/TypeRessources';
import { useRoute } from '@react-navigation/native';
import { useAlert } from '../../Provider/AlertProvider';

const ResourcesEdit = ({navigation}: any) => {
    const { showAlert } = useAlert();

    const route = useRoute();
    const resource = route.params?.resource;

    const goBack = () => {
      navigation.goBack();
    };
    
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

      // Si une ressource est passée en paramètre, remplissez le formulaire avec ses données
      if (resource) {
        setFormData({
          titre: resource.ressource_titre,
          description: resource.ressource_description,
          contenu: resource.ressource_contenu,
          categorieId: resource.categorie_id,
          typeRelationId: resource.typeRelation_id,
          typeRessourceId: resource.typeRessource_id,
        });
      }
    }, []);

    const fetchCategories = async () => {
      fetch('http://localhost/RessourcesRelationnelles/backend/public/api/categories/search')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching data:', error));
    };

    const fetchTypeRelations = async () => {
      fetch('http://localhost/RessourcesRelationnelles/backend/public/api/typeRelations/search')
      .then(response => response.json())
      .then(data => setTypeRelations(data))
      .catch(error => console.error('Error fetching data:', error));
    };

    const fetchTypeRessources = async () => {
      fetch('http://localhost/RessourcesRelationnelles/backend/public/api/typeRessources/search')
      .then(response => response.json())
      .then(data => setTypeRessources(data))
      .catch(error => console.error('Error fetching data:', error));
    };

    // Permet d'initialiser les picker dans le cas où on est en création
    useEffect(() => {
      if (categories.length > 0 && !resource) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          categorieId: categories[0].categorie_id
        }));
      }
    }, [categories]);
    
    useEffect(() => {
      if (typeRelations.length > 0 && !resource) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          typeRelationId: typeRelations[0].typeRelation_id
        }));
      }
    }, [typeRelations]);
    
    useEffect(() => {
      if (typeRessources.length > 0 && !resource) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          typeRessourceId: typeRessources[0].typeRessources_id
        }));
      }
    }, [typeRessources]);

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

      if(resource) {
        fetch('http://localhost/RessourcesRelationnelles/backend/public/api/ressources/update/'+resource.ressource_id, {
          method: 'PUT',
          body: JSON.stringify(formData),
        })
        .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          showAlert(data.message, 'success');
          navigation.navigate('Resources');
        })
        .catch(error => {
          // Gestion des erreurs
          console.error('There was an error!', error);
          showAlert('Une erreur s\'est produite.', 'error');
        });
      }
      else {
        fetch('http://localhost/RessourcesRelationnelles/backend/public/api/ressources/create', {
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
          showAlert(data.message, 'success');
          navigation.navigate('Resources');
        })
        .catch(error => {
          // Gestion des erreurs
          console.error('There was an error!', error);
          showAlert('Une erreur s\'est produite.', 'error');
        });
      }
    };

    return (
      <View style={styles.container}>
        <Button title="Retour" onPress={goBack} />

        {!resource ? (
          <Text style={styles.title}>Création d'une ressource</Text>
        ) : (
          <Text style={styles.title}>Edition d'une ressource</Text>
        )}

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

        {!resource ? (
          <Button title="Créer la ressource" onPress={handleSubmit} />
        ) : (
          <Button title="Enregistrer les modifications" onPress={handleSubmit} />
        )}
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