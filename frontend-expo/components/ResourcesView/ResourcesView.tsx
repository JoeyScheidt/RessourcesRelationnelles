import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ResourcesView = ({navigation}: any) => {
    const route = useRoute();
    const resource = route.params?.resource;

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<string[]>([]);

    const goBack = () => {
        navigation.goBack();
    };

    const handleCommentSubmit = () => {
        if (comment.trim() !== '') {
            setComments([...comments, comment]);
            setComment('');
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
                            value={comment}
                            onChangeText={setComment}
                        />
                        <TouchableOpacity style={styles.commentButton} onPress={handleCommentSubmit}>
                            <Text style={styles.commentButtonText}>Envoyer</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.comments}>
                        <Text style={styles.commentsTitle}>Commentaires :</Text>
                        {comments.map((comment, index) => (
                            <Text key={index} style={styles.commentItem}>{comment}</Text>
                        ))}
                    </View>

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
        fontSize: 16,
        marginBottom: 5,
    },
});
  
export default ResourcesView;