import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '../../const';
import Comment from '../../InterfaceModel/Comment';
import { useAlert } from '../../Provider/AlertProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../Provider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalConfirmation from '../ModalConfirmation/ModalConfirmation';

const ResourcesView = ({navigation}: any) => {
    const { isLoggedIn } = useAuth();
    const { showAlert } = useAlert();

    const route = useRoute();
    const resource = route.params?.resource;

    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [isModerateur, setIsModerateur] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const goBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                let formDataToSend = new FormData();
                formDataToSend.append("ressource_id", resource.ressource_id);
    
                const token = await AsyncStorage.getItem('token');
                const headers = {};
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
    
                const response = await fetch(`${API_URL}/api/commentaires/search`, {
                    method: 'POST',
                    body: formDataToSend,
                    headers: headers
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                setComments(data.commentsList);
                setIsModerateur(data.isModerateur);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchComments();
    }, []);

    const onDeleteComment = async (item: any) => {
        // Fermer la boîte de dialogue après confirmation
        setModalVisible(false);

        const token = await AsyncStorage.getItem('token');
        
        fetch(`${API_URL}/api/commentaires/delete/` + item.commentaire_id, {
            method: 'DELETE',
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
            navigation.navigate('Resources');
        })
        .catch(error => {
            // Gestion des erreurs
            console.error('There was an error!', error);
            showAlert('Une erreur s\'est produite.', 'error');
        });
    };

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
        <ScrollView>
            <Button title="Retour" onPress={goBack} />

            {resource && (
                <View style={styles.container}>
                    <Text style={styles.title}>{resource.ressource_titre}</Text>
                    <Text style={styles.description}>{resource.ressource_description}</Text>
                    <Text style={styles.content}>{resource.ressource_contenu}</Text>

                    {isLoggedIn ? (
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
                    ) : null}

                    {comments.length>0 ? (
                        <View style={styles.comments}>
                            <Text style={styles.commentsTitle}>Commentaires :</Text>
                            {comments.map((comment: Comment, index) => (
                                <View key={index} style={styles.commentItem}>
                                    <Text style={styles.commentContent}>{comment.commentaire_contenu}</Text>
                                    <Text style={styles.commentDate}>{comment.commentaire_date}</Text>
                                    {isModerateur ? (
                                        <View>
                                            <TouchableOpacity onPress={() => {setSelectedItem(comment); setModalVisible(true);}}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </TouchableOpacity>
                                            <ModalConfirmation modalVisible={modalVisible} setModalVisible={setModalVisible} onDelete={() => onDeleteComment(selectedItem)}></ModalConfirmation>
                                        </View>
                                    ) : null}
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.comments}>
                            <Text>Aucun commentaire pour cette ressource</Text>
                        </View>
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
        marginBottom: 15,
    },
    content: {
        marginTop: 10,
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