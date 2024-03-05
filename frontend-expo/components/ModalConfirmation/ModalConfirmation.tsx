import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const ModalConfirmation = ({ modalVisible, setModalVisible, onDelete }: {modalVisible: any, setModalVisible: any, onDelete: any}) => {
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Êtes-vous sûr de vouloir continuer ?</Text>
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                       <Text style={styles.textStyle}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                        onPress={onDelete}
                    >
                        <Text style={styles.textStyle}>Confirmer</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ModalConfirmation;