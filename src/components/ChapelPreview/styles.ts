import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        height: 220,
        marginHorizontal: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    distance: {
        fontSize: 18,
        color: '#1386F2',
        borderWidth: 2,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20
    },
    scheduleButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    scheduleButtonText: {
        fontSize: 16,
        marginLeft: 6
    }
});