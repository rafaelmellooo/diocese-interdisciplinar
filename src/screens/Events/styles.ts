import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    event: {
        marginVertical: 10,
        padding: 20,
        
        borderWidth: 1,
        borderRadius: 10,

        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.54,
        shadowRadius: 4,
        shadowColor: '#000000',

        elevation: 10,
    },

    eventTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    eventTitleText: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});