import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    
    //Global
    heading: {
        fontSize: 20,
        marginBottom: 20,
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    // errorMessage: {
    //     color: 'red',
    //     marginBottom: 10,
    // },

    //Header
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#00969D',
        paddingHorizontal: 15,
    },
    logo: {
        flexDirection: 'column',
        height: 100,
        width: 100,
    },
    endHeader: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },
    loginLink: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        padding: 7,
        borderRadius: 4,
        borderColor: '#bee3e3',
        borderWidth: 3,
    },
    loginText: {
        color: '#627579',
        fontWeight: '500',
    },
    iconUser: {
        color: '#627579',
        marginRight: 8,
    },
    searchInput: {
        flexDirection: 'column',
        backgroundColor: '#f3f3f3',
        color: '#627579',
        padding: 7,
        width: '40%',
        borderRadius: 4,
        borderColor: '#bee3e3',
        borderWidth: 3,
    },
    navbar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    navItems: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#bee3e3',
    },
    navLinks: {
        textDecorationLine: 'none',
        fontWeight: '400',
        color: '#1f8181',
    },

    //Help
    helpContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    accordion: {
        marginTop: 20,
        width: '100%',
    },
    accordionItem: {
        marginBottom: 10,
    },
    accordionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#d1ebeb',
        padding: 10,
        borderWidth: 1,
        borderColor: '#bee3e3',
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    reponse: {
        padding: 10,
    },

    //Login
    loginForm: {
        width: '100%',
        padding: 40,
        backgroundColor: '#f7ffff',
        borderWidth: 4,
        borderColor: '#d1ebeb',
        borderRadius: 5,
    },
    loginInput: {
        padding: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    forgotPassword: {
        textAlign: 'left',
        textDecorationLine: 'underline',
        color: '#005458',
        marginBottom: 10,
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    loginBtn: {
        backgroundColor: '#00969D',
        flex: 1,
    },
    createAccount: {
        textAlign: 'left',
        textDecorationLine: 'underline',
        color: '#005458',
        marginBottom: 10,
    },

    //Registration
    formContainer: {
        width: '100%',
        padding: 30,
        backgroundColor: '#f7ffff',
        borderWidth: 4,
        borderColor: '#d1ebeb',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    registerColumn: {
        width: '48%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    registerInput: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%', // Make each input fill the column width
    },
    uploadContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    uploadText: {
        marginBottom: 5,
    },
    uploadButtonText: {
        color: 'blue',
    },
    uploadInfo: {
        marginBottom: 10,
        color: '#888',
    },
    registerButton: {
        backgroundColor: '#00969D',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    registerButtonText: {
        color: 'white',
    },

    //Ressources
    filtres: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    searchBtn: {
        backgroundColor: '#00969D',
        color: 'white',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },

    //RessourcesTable
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
      tableRow: {
        height: 40,
        backgroundColor: '#d1ebeb',
      },
      table: {
        borderWidth: 1,
        borderColor: '#ccc',
      },

    //ResourcesEdit
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      },
      textArea: {
        height: 100,
        textAlignVertical: 'top', // For Android
      },
});

export default style;