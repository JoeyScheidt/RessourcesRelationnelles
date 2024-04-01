import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '../../const';
import Comment from '../../InterfaceModel/Comment';
import { useAlert } from '../../Provider/AlertProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResourcesView = ({navigation}: any) => {
    const { showAlert } = useAlert();

    const route = useRoute();
    const resource = route.params?.resource;

    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const goBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        let formDataToSend = new FormData();
        formDataToSend.append("ressource_id", resource.ressource_id);
        fetch(`${API_URL}/api/commentaires/search`, {
            method: 'POST',
            body: formDataToSend,
        })
        .then(response => response.json())
        .then(data => setComments(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleCommentSubmit = async () => {
        if (commentText.trim() !== '') {
            let formDataToSend = new FormData();
            formDataToSend.append("contenu", commentText);
            formDataToSend.append("ressource_id", resource.ressource_id);

            const token = await AsyncStorage.getItem('token');

            fetch(`${API_URL}/api/commentaires/create`, {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                showAlert(data.message, 'success');

                // Mettre à jour les commentaires localement
                //setComments([...comments, data.newComment]);
                //setCommentText('');
                //navigation.navigate('Resources');
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('There was an error!', error);
                showAlert('Une erreur s\'est produite.', 'error');
            });

        }
    };

    return (
        <ScrollView>
            <Button title="Retour" onPress={goBack} />

            {resource && (
                <View style={styles.container}>
                    <Text style={styles.title}>{resource.ressource_titre}</Text>
                    <Text style={styles.description}>{resource.ressource_description}</Text>
                    <Text style={styles.content}>{resource.ressource_contenu}</Text>

                    <View style={styles.commentContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Ajouter un commentaire"
                            value={commentText}
                            onChangeText={setCommentText}
                        />
                        <TouchableOpacity style={styles.commentButton} onPress={handleCommentSubmit}>
                            <Text style={styles.commentButtonText}>Envoyer</Text>
                        </TouchableOpacity>
                    </View>

                    {comments.length>0 ? (
                        <View style={styles.comments}>
                            <Text style={styles.commentsTitle}>Commentaires :</Text>
                            {comments.map((comment: Comment, index) => (
                                <View key={index} style={styles.commentItem}>
                                    <Text style={styles.commentContent}>{comment.commentaire_contenu}</Text>
                                    <Text style={styles.commentDate}>{comment.commentaire_date}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text>Aucun commentaire pour cette ressource</Text>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    commentButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    commentButtonText: {
        color: 'white',
    },
    comments: {
        marginTop: 20,
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentItem: {
        marginBottom: 5,
    },
    commentContent: {
        fontSize: 16,
        marginBottom: 5,
    },
    commentDate: {
        fontSize: 12,
        color: '#666',
    },
});
  
export default ResourcesView;