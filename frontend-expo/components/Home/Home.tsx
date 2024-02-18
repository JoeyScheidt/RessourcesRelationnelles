import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
    return (
        <View>
            <Text style={styles.heading}>Les dernières des ressources</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
    },
});
  
export default Home;