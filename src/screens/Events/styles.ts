import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    card: {
        marginVertical: 10,
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
    },

    cardTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20
    },

    cardTitleText: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1
    }
});