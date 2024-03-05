import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleLogin = () => {
        // handle login logic here
    }

    return (
        <View style={styles.layout}>
            <Text style={styles.heading}>Modification de mot de passe</Text>
            <TextInput
                style={styles.input}
                placeholder="Adresse mail"
                value={email}
                onChangeText={setEmail}
            />
            <Button
                title="Envoyer un mail de reset"
                onPress={handleLogin}
            />
        </View>
    );
};
  
const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
});

export default ForgotPassword;