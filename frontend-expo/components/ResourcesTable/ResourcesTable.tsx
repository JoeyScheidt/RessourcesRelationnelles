import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faSquareCheck, faHourglass, faShareNodes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Table, Row, Rows } from 'react-native-reanimated-table';
import { useState } from 'react';
import ModalConfirmation from '../ModalConfirmation/ModalConfirmation';
import { API_URL } from '../../const';




const ResourcesTable = ({ tableHead, ressources, displayAction, navigation }: { tableHead: string[], ressources: any[], displayAction: boolean, navigation: any }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const onEdit = (item: any) => {
    navigation.navigate('ResourcesEdit', { resource: item });
  };

  const onDelete = (item: any) => {
    // Fermer la boîte de dialogue après confirmation
    setModalVisible(false);


    fetch(`${API_URL}api/ressources/delete/` + item.ressource_id, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        navigation.navigate('Resources');
      })
      .catch(error => {
        // Gestion des erreurs
        console.error('There was an error!', error);
      });
  };

  const generateRows = (data: any) => {
    let rows: any[] = [];
    data.forEach((item: any) => {
      const rowContent = [
        <Text key={`${item.ressource_id}-tit`} >{item.ressource_titre}</Text>,
        <Text key={`${item.ressource_id}-cat`}>{item.typeRessources_libelle}</Text>,
        <Text key={`${item.ressource_id}-desc`}>{item.ressource_description}</Text>,
      ];

      if (displayAction) {
        rowContent.push(
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faStar} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faSquareCheck} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faHourglass} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faShareNodes} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEdit(item)}>
              <FontAwesomeIcon icon={faEdit} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
              <FontAwesomeIcon icon={faTrash} style={styles.icon} />
            </TouchableOpacity>

            <ModalConfirmation modalVisible={modalVisible} setModalVisible={setModalVisible} onDelete={() => onDelete(selectedItem)}></ModalConfirmation>
          </View>
        );
      }

      rows.push(rowContent);
    });
    return rows;
  };

  return (
    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
      <Row data={tableHead} style={{ height: 40, backgroundColor: '#F7F6E7' }} />
      <Rows data={generateRows(ressources)} />
    </Table>
  );
}

const styles = StyleSheet.create({
  cellText: {
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ResourcesTable;
