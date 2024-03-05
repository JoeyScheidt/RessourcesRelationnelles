import React from 'react';
import styles from '../../styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Text, TouchableOpacity, View} from 'react-native';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Help = () => {
    const faqData = [
        {
            question: 'Comment créer ma ressource',
            answer: 'Il faut se connecter ou créer un compte puis se rendre dans l\'onglet ressources. Ensuite il faut cliquer sur "Mes Ressources" pour pouvoir acceder au bouton de création de ressources'
        },
        {
            question: 'Comment partager une ressource',
            answer: 'Acceder à la ressource et cliquez sur l\'icone de partage'
        },
    ];

    const [expandedIndex, setExpandedIndex] = React.useState(-1);

    const handleToggle = (index: number) => {
      if (index === expandedIndex) {
        setExpandedIndex(-1);
      } else {
        setExpandedIndex(index);
      }
    };

    return (
        <View style={styles.layout}>
            <Text style={styles.heading}>Foire aux questions : réponses clés</Text>

            <View style={styles.accordion}>
                {faqData.map((item, index) => (
                    <View key={index} style={styles.accordionItem}>
                        <TouchableOpacity
                            style={styles.accordionHeader}
                            onPress={() => handleToggle(index)}
                        >
                            <Text style={styles.question}>{item.question}</Text>
                            {expandedIndex === index ? <FontAwesomeIcon icon={faChevronUp as IconProp} /> : <FontAwesomeIcon icon={faChevronDown as IconProp} />}
                        </TouchableOpacity>
                        {expandedIndex === index && <Text style={styles.reponse}>{item.answer}</Text>}
                    </View>
                ))}
            </View>
        </View>
    );
};

// const styles = StyleSheet.create({
//     layout: {
//         flex: 1,
//         alignItems: 'center',
//         padding: 20,
//     },
//     heading: {
//         fontSize: 20,
//         marginBottom: 10,
//     },
//     accordion: {
//         width: '100%',
//     },
//     accordionItem: {
//         marginBottom: 10,
//     },
//     accordionHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         backgroundColor: '#F7F6E7',
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#C1C0B9',
//     },
//     question: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     reponse: {
//         padding: 10,
//     },
// });
  
export default Help;