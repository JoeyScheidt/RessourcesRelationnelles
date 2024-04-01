import React, { useState } from 'react';
import styles from '../../styles/style';
import { View, Text, TextInput, Button} from 'react-native';
import { API_URL } from '../../const';

const ForgotPassword = ({navigation}: any) => {
    const [email, setEmail] = useState('');

    const handleLogin = () => {
        let formDataToSend = new FormData();
        formDataToSend.append("email", email);

        fetch(`${API_URL}/api/utilisateur/forgotPassword`, {
          method: 'POST',
          body: formDataToSend
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(async data => {
          navigation.navigate('Home');
      })
      .catch(error => {
          // Gestion des erreurs
          console.error('There was an error!', error);
      });
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
  
// const styles = StyleSheet.create({
//     layout: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     heading: {
//         fontSize: 20,
//         marginBottom: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 20,
//         width: '100%',
//     },
// });

export default ForgotPassword;