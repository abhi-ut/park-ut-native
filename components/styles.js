import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 15
    },
    center: {
        textAlign: 'center'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        //justifyContent: 'space-between',
        backgroundColor: '#208bdc',
        flexDirection: 'row'
    },
    white: {
        color: '#ffffff'
    },
    homeContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        borderColor: '#ced4da',
        borderWidth: 1,
        marginBottom: 20
    },
    primary: {
        color: '#208bdc'
    },
    success: {
        color: '#28a745'
    },
    failure: {
        color: '#ff0000'
    },
    message: {
        marginVertical: 5
    },
    textNormal: {
        marginBottom: 10
    },
    textBig: {
        fontSize: 17,
        marginBottom: 10
    },
    textHuge: {
        fontSize: 22,
        marginBottom: 10
    }
})

export default styles
