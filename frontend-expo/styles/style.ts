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
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },

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
    accordion: {
        width: '100%',
    },
    accordionItem: {
        marginBottom: 10,
    },
    accordionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F7F6E7',
        padding: 10,
        borderWidth: 1,
        borderColor: '#C1C0B9',
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
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    loginInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    forgotPassword: {
        textAlign: 'left',
        textDecorationLine: 'underline',
        color: '#000091',
        marginBottom: 10,
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
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
        backgroundColor: '#000091',
        flex: 1,
        marginLeft: 10,
    },
    createBtn: {
        backgroundColor: '#6CB9F4',
        flex: 1,
        marginRight: 10,
    },

    //Registration
    formContainer: {
        width: '100%',
    },
    registerInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
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
        backgroundColor: '#000091',
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
    },
    cellText: {
        textAlign: 'center',
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