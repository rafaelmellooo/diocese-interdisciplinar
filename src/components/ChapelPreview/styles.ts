import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        height: 250,
        marginHorizontal: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    distance: {
        fontSize: 14,
        color: '#1386F2',
        borderWidth: 2,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20
    },
    infoText: {
        fontSize: 12,
        textAlign: 'left'
    },
    reminderButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    reminderButtonText: {
        fontSize: 16,
        marginLeft: 6
    }
});