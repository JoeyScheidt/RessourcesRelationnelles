import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Home = () => {
    return (
        <ScrollView>
            <View>
                <Text style={styles.heading}>Les dernières des ressources</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
    },
});
  
export default Home;